import { fetchPostIndexForBuild, postRouteEntry, postUrlFromEntry, uniqueCategoryEntries } from '$lib/post-index-build';
import { siteUrl } from '$lib/site';
import type { PostIndex } from '$lib/types';
import type { RequestHandler } from './$types';

export const prerender = true;

type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq?: 'daily' | 'weekly' | 'monthly';
  priority?: string;
};

const staticUrls: SitemapUrl[] = [
  { loc: `${siteUrl}/`, changefreq: 'monthly', priority: '1.0' },
  { loc: `${siteUrl}/about`, changefreq: 'monthly', priority: '0.8' },
  { loc: `${siteUrl}/works`, changefreq: 'monthly', priority: '0.8' },
  { loc: `${siteUrl}/posts`, changefreq: 'weekly', priority: '0.9' },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function postSitemapUrls(posts: PostIndex[]): SitemapUrl[] {
  const seen = new Set<string>();
  const urls: SitemapUrl[] = [];

  for (const post of posts) {
    const entry = postRouteEntry(post);

    if (!entry) {
      continue;
    }

    const loc = postUrlFromEntry(entry);

    if (seen.has(loc)) {
      continue;
    }

    seen.add(loc);
    urls.push({
      loc,
      lastmod: post.published_at?.slice(0, 10),
      changefreq: 'monthly',
      priority: '0.7',
    });
  }

  return urls;
}

function renderUrl(url: SitemapUrl): string {
  const fields = [
    `    <loc>${escapeXml(url.loc)}</loc>`,
    url.lastmod ? `    <lastmod>${escapeXml(url.lastmod)}</lastmod>` : '',
    url.changefreq ? `    <changefreq>${url.changefreq}</changefreq>` : '',
    url.priority ? `    <priority>${url.priority}</priority>` : '',
  ].filter(Boolean);

  return `  <url>\n${fields.join('\n')}\n  </url>`;
}

export const GET: RequestHandler = async () => {
  const posts = await fetchPostIndexForBuild();
  const categoryUrls = uniqueCategoryEntries(posts).map((entry): SitemapUrl => ({
    loc: `${siteUrl}/posts/${encodeURIComponent(entry.categoryName)}`,
    changefreq: 'weekly',
    priority: '0.8',
  }));
  const urls = [...staticUrls, ...categoryUrls, ...postSitemapUrls(posts)];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls.map(renderUrl).join('\n'),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
    },
  });
};
