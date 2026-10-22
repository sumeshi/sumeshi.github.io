import type { ContentBlock, PostContent, PostIndex } from '#lib/types.ts';
import { siteDescription } from '#lib/site.ts';

export interface TableOfContentsItem {
  id: string;
  label: string;
  level: 2 | 3;
}

export function getPostDescription(post: PostContent | PostIndex): string {
  if ('description' in post && post.description) return post.description;
  if ('html_text' in post && typeof post.html_text === 'string' && post.html_text) {
    return post.html_text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150);
  }
  return siteDescription;
}

function withoutMarkdownTitle(blocks: ContentBlock[]): ContentBlock[] {
  let titleRemoved = false;
  return blocks.map((block) => {
    if (titleRemoved || block.type !== 'text' || !/<h1\b/i.test(block.content)) return block;
    titleRemoved = true;
    return { ...block, content: block.content.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/i, '').trim() };
  }).filter((block) => block.content);
}

function slugifyHeading(label: string): string {
  return label.normalize('NFKC').toLocaleLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, '-').replace(/^-+|-+$/g, '');
}

function headingLabel(html: string): string {
  const namedEntities: Record<string, string> = { amp: '&', apos: "'", gt: '>', lt: '<', nbsp: ' ', quot: '"' };
  return html.replace(/<[^>]+>/g, '').replace(/&(#(?:x[\da-f]+|\d+)|[a-z]+);/gi, (entity, name: string) => {
    if (name.startsWith('#x') || name.startsWith('#X')) return String.fromCodePoint(Number.parseInt(name.slice(2), 16));
    if (name.startsWith('#')) return String.fromCodePoint(Number.parseInt(name.slice(1), 10));
    return namedEntities[name.toLowerCase()] ?? entity;
  }).trim().replace(/\s+/g, ' ');
}

export function buildArticle(blocks: ContentBlock[]): { contents: ContentBlock[]; tableOfContents: TableOfContentsItem[] } {
  const tableOfContents: TableOfContentsItem[] = [];
  const usedIds = new Set<string>();
  let fallbackIndex = 0;

  const contents = withoutMarkdownTitle(blocks).map((block) => {
    if (block.type !== 'text') return block;
    const content = block.content.replace(/<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi, (_match, levelText: string, attributes: string | undefined, innerHtml: string) => {
      const label = headingLabel(innerHtml);
      if (!label) return _match;
      const baseId = slugifyHeading(label) || `section-${++fallbackIndex}`;
      let id = baseId;
      let duplicateIndex = 2;
      while (usedIds.has(id)) id = `${baseId}-${duplicateIndex++}`;
      usedIds.add(id);
      const level = Number(levelText) as 2 | 3;
      tableOfContents.push({ id, label, level });
      return `<h${levelText}${attributes ?? ''} id="${id}">${innerHtml}</h${levelText}>`;
    });
    return { ...block, content };
  });
  return { contents, tableOfContents };
}

export interface PostStructuredDataOptions {
  canonicalUrl: string;
  categoryName: string;
  description: string;
  language: string;
  post: PostContent | PostIndex;
  title: string;
  site: {
    author: string;
    blogId: string;
    name: string;
    ogImageUrl: string;
    personId: string;
    url: string;
  };
}

export function buildPostStructuredData(options: PostStructuredDataOptions): Record<string, unknown> {
  const { canonicalUrl, categoryName, description, language, post, title, site } = options;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        headline: title,
        description,
        url: canonicalUrl,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        image: site.ogImageUrl,
        inLanguage: language,
        datePublished: post.published_at || undefined,
        author: { '@type': 'Person', '@id': site.personId, name: site.author, url: site.url },
        publisher: { '@type': 'Person', '@id': site.personId, name: site.author, url: site.url },
        isPartOf: { '@type': 'Blog', '@id': site.blogId, name: `${site.name} Posts`, url: `${site.url}/posts` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Posts', item: `${site.url}/posts` },
          { '@type': 'ListItem', position: 3, name: categoryName, item: `${site.url}/posts/${encodeURIComponent(categoryName)}` },
          { '@type': 'ListItem', position: 4, name: title, item: canonicalUrl },
        ],
      },
    ],
  };
}
