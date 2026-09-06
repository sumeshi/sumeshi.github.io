import { fetchPostIndexForBuild, postRouteEntry, postUrlFromEntry } from '$lib/post-index-build';
import { siteDescription, siteFeedUrl, siteName, siteUrl } from '$lib/site';
import type { RequestHandler } from './$types';

export const prerender = true;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function rssDate(value: string): string | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toUTCString();
}

export const GET: RequestHandler = async () => {
  const posts = await fetchPostIndexForBuild();
  const sortedPosts = [...posts].sort((left, right) => {
    const leftTime = new Date(left.published_at).getTime();
    const rightTime = new Date(right.published_at).getTime();
    return (Number.isNaN(rightTime) ? 0 : rightTime) - (Number.isNaN(leftTime) ? 0 : leftTime);
  });
  const items = sortedPosts.flatMap((post) => {
    const entry = postRouteEntry(post);

    if (!entry) {
      return [];
    }

    const url = postUrlFromEntry(entry);
    const publishedAt = rssDate(post.published_at);
    const title = post.heading || post.title;

    return [
      [
        '    <item>',
        `      <title>${escapeXml(title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        post.description ? `      <description>${escapeXml(post.description)}</description>` : '',
        publishedAt ? `      <pubDate>${publishedAt}</pubDate>` : '',
        '    </item>',
      ].filter(Boolean).join('\n'),
    ];
  });
  const latestPublishedAt = sortedPosts
    .map((post) => rssDate(post.published_at))
    .find((date): date is string => date !== null);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(`${siteName} Posts`)}</title>`,
    `    <link>${escapeXml(`${siteUrl}/posts`)}</link>`,
    `    <description>${escapeXml(siteDescription)}</description>`,
    `    <language>ja</language>`,
    `    <atom:link href="${escapeXml(siteFeedUrl)}" rel="self" type="application/rss+xml" />`,
    latestPublishedAt ? `    <lastBuildDate>${latestPublishedAt}</lastBuildDate>` : '',
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].filter(Boolean).join('\n');

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
    },
  });
};
