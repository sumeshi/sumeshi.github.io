import { POSTS_API_BASE } from '$lib/config';
import { siteUrl } from '$lib/site';
import type { ContentBlock, PostContent } from '$lib/types';

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'ul', 'ol', 'li', 'blockquote',
  'strong', 'em', 'del', 'code', 'pre', 'br',
  'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
];

const ALLOWED_ATTR = [
  'href', 'src', 'alt', 'title', 'target', 'rel',
  'width', 'height', 'loading', 'decoding',
];

type DOMPurifyModule = typeof import('dompurify').default;
type HighlightModule = typeof import('highlight.js/lib/common').default;

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  // The upstream API publishes JSON at an `index.html` path for GitHub Pages compatibility.
  return response.json() as Promise<T>;
}

async function loadRendererDependencies(): Promise<{
  DOMPurify: DOMPurifyModule;
  hljs: HighlightModule;
}> {
  const [{ default: DOMPurify }, { default: hljs }] = await Promise.all([
    import('dompurify'),
    import('highlight.js/lib/common'),
  ]);

  return { DOMPurify, hljs };
}

function isPreCodeElement(node: ChildNode): node is HTMLPreElement {
  return node instanceof HTMLPreElement && node.firstElementChild instanceof HTMLElement
    && node.firstElementChild.tagName === 'CODE';
}

function extractLanguage(className: string): string | null {
  const languageClass = className
    .split(/\s+/)
    .find((token) => token.startsWith('language-'));

  return languageClass ? languageClass.replace(/^language-/, '') : null;
}

function serializeNode(node: ChildNode): string {
  if (node instanceof Text) {
    return node.textContent ?? '';
  }

  return (node as Element).outerHTML;
}

function decodePathSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/**
 * Matches a paragraph consisting solely of a link to a post on this site.
 * Accepts both an anchor element and a bare-text URL that the upstream
 * markdown renderer did not linkify.
 * Produces a Zenn-style link card instead of inline prose.
 */
export function extractInternalPostLinkCard(paragraphHtml: string): {
  path: string;
  label?: string;
} | null {
  const trimmed = paragraphHtml.trim();

  const paragraphMatch = trimmed.match(/^<p\b[^>]*>([\s\S]*)<\/p>$/i);

  if (!paragraphMatch) {
    return null;
  }

  const inner = paragraphMatch[1].trim();

  const anchorMatch = inner.match(/^<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>$/i);

  let url: URL;
  let label: string | undefined;

  if (anchorMatch) {
    try {
      url = new URL(anchorMatch[1], siteUrl);
    } catch {
      return null;
    }

    label = anchorMatch[2]
      .replace(/<[^>]+>/g, '')
      .replace(/&(#(?:x[\da-f]+|\d+)|[a-z]+);/gi, (entity, name: string) => {
        if (name.startsWith('#x') || name.startsWith('#X')) {
          return String.fromCodePoint(Number.parseInt(name.slice(2), 16));
        }

        if (name.startsWith('#')) {
          return String.fromCodePoint(Number.parseInt(name.slice(1), 10));
        }

        return ({ amp: '&', apos: "'", gt: '>', lt: '<', nbsp: ' ', quot: '"' })[name.toLowerCase()] ?? entity;
      })
      .trim() || undefined;
  } else {
    const text = inner
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();

    if (!/^https?:\/\/\S+$/i.test(text)) {
      return null;
    }

    try {
      url = new URL(text);
    } catch {
      return null;
    }
  }

  if (url.origin !== siteUrl || !url.pathname.startsWith('/posts/')) {
    return null;
  }

  const segments = url.pathname.replace(/\/+$/, '').split('/').filter(Boolean);

  // ['posts', category, postId]
  if (segments.length !== 3) {
    return null;
  }

  return {
    path: `/${segments.map(decodePathSegment).join('/')}`,
    label,
  };
}

function parseGitHubRepoUrl(value: string): string | null {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    return null;
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return null;
  }

  const match = url.pathname.match(/^\/([A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38})\/([A-Za-z0-9._-]+?)\/?$/);

  if (url.hostname !== 'github.com' || !match) {
    return null;
  }

  return `https://github.com/${match[1]}/${match[2]}`;
}

/**
 * Matches a paragraph consisting solely of a link to a GitHub repository.
 * Accepts both an anchor element and a bare-text URL that the upstream
 * markdown renderer did not linkify.
 * Produces a GitHub repo card instead of inline prose.
 */
export function extractGitHubRepoLinkCard(paragraphHtml: string): string | null {
  const trimmed = paragraphHtml.trim();

  const paragraphMatch = trimmed.match(/^<p\b[^>]*>([\s\S]*)<\/p>$/i);

  if (!paragraphMatch) {
    return null;
  }

  const inner = paragraphMatch[1].trim();

  const anchorMatch = inner.match(/^<a\b[^>]*href="([^"]*)"[^>]*>[\s\S]*?<\/a>$/i);

  if (anchorMatch) {
    return parseGitHubRepoUrl(anchorMatch[1]);
  }

  const text = inner
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();

  if (!/^https?:\/\/\S+$/i.test(text)) {
    return null;
  }

  return parseGitHubRepoUrl(text);
}

export async function fetchPostContent(
  categoryName: string,
  postId: string,
  signal?: AbortSignal,
): Promise<PostContent> {
  return fetchJson<PostContent>(
    `${POSTS_API_BASE}/${encodeURIComponent(categoryName)}/${encodeURIComponent(postId)}/index.html`,
    signal,
  );
}

export async function parsePostContent(html: string): Promise<ContentBlock[]> {
  const { DOMPurify, hljs } = await loadRendererDependencies();
  const parser = new DOMParser();
  const documentFragment = parser.parseFromString(html, 'text/html');
  const blocks: ContentBlock[] = [];
  const proseFragments: string[] = [];

  function sanitize(fragment: string): string {
    return DOMPurify.sanitize(fragment, {
      ALLOWED_TAGS,
      ALLOWED_ATTR,
      ALLOW_DATA_ATTR: false,
    });
  }

  for (const image of Array.from(documentFragment.body.querySelectorAll('img'))) {
    if (!image.hasAttribute('loading')) {
      image.setAttribute('loading', 'lazy');
    }

    if (!image.hasAttribute('decoding')) {
      image.setAttribute('decoding', 'async');
    }
  }

  function flushProse(): void {
    const joined = proseFragments.join('').trim();

    proseFragments.length = 0;

    if (!joined) {
      return;
    }

    blocks.push({
      type: 'text',
      content: sanitize(joined),
    });
  }

  for (const node of Array.from(documentFragment.body.childNodes)) {
    if (isPreCodeElement(node)) {
      flushProse();

      const codeElement = node.firstElementChild as HTMLElement;
      const rawCode = codeElement.textContent ?? '';

      if (!rawCode.trim()) {
        continue;
      }

      const language = extractLanguage(codeElement.className);
      const highlighted = language && hljs.getLanguage(language)
        ? hljs.highlight(rawCode, { language }).value
        : hljs.highlightAuto(rawCode).value;

      blocks.push({
        type: 'code',
        content: highlighted,
      });
      continue;
    }

    if (node instanceof HTMLParagraphElement) {
      const repoUrl = extractGitHubRepoLinkCard(node.outerHTML);

      if (repoUrl) {
        flushProse();
        blocks.push({
          type: 'github-repo',
          content: repoUrl,
        });
        continue;
      }

      const linkCard = extractInternalPostLinkCard(node.outerHTML);

      if (linkCard) {
        flushProse();
        blocks.push({
          type: 'link-card',
          content: linkCard.path,
          label: linkCard.label,
        });
        continue;
      }
    }

    proseFragments.push(serializeNode(node));
  }

  flushProse();

  return blocks;
}

export function postSourceUrl(categoryName: string, postId: string): string {
  return `https://github.com/sumeshi/api/blob/master/${encodeURIComponent(categoryName)}/${encodeURIComponent(postId)}.md`;
}
