import { DomUtils, ElementType, parseDocument } from 'htmlparser2';
import { siteUrl } from '#lib/site.ts';
import type { ContentBlock } from '#lib/types.ts';

export const POST_CONTENT_ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'ul', 'ol', 'li', 'blockquote', 'hr',
  'strong', 'em', 'del', 'code', 'pre', 'br',
  'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
];

export const POST_CONTENT_ALLOWED_ATTRIBUTES = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
  code: ['class'],
};

export interface PostHtmlRenderer {
  sanitize: (html: string) => string;
  highlight: (code: string, language: string | null) => string;
}

type ParsedNode = ReturnType<typeof parseDocument>['children'][number];
type ParsedElement = Extract<
  ParsedNode,
  { type: typeof ElementType.Tag | typeof ElementType.Script | typeof ElementType.Style }
>;

function isElement(node: ParsedNode): node is ParsedElement {
  return node.type === ElementType.Tag || node.type === ElementType.Script || node.type === ElementType.Style;
}

function parseChildren(html: string): ParsedNode[] {
  return parseDocument(html).children;
}

function isMeaningfulText(node: ParsedNode): boolean {
  return node.type !== ElementType.Text || DomUtils.textContent(node).trim().length > 0;
}

function decodePathSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function soleParagraph(html: string): { children: ParsedNode[] } | null {
  const children = parseChildren(html).filter(isMeaningfulText);
  if (children.length !== 1 || !isElement(children[0]) || children[0].name !== 'p') return null;
  return { children: children[0].children };
}

function getSoleLink(children: ParsedNode[]): { href: string; label?: string } | null {
  const meaningful = children.filter(isMeaningfulText);
  const link = meaningful[0];
  if (meaningful.length !== 1 || !link || !isElement(link) || link.name !== 'a') return null;
  const href = link.attribs.href;
  if (!href) return null;
  const label = DomUtils.textContent(link).trim() || undefined;
  return { href, label };
}

export function extractInternalPostLinkCard(paragraphHtml: string): { path: string; label?: string } | null {
  const paragraph = soleParagraph(paragraphHtml);
  if (!paragraph) return null;
  const anchor = getSoleLink(paragraph.children);
  let value: string;
  let label: string | undefined;
  if (anchor) {
    value = anchor.href;
    label = anchor.label;
  } else {
    const meaningful = paragraph.children.filter(isMeaningfulText);
    if (meaningful.length !== 1 || meaningful[0].type !== ElementType.Text) return null;
    value = DomUtils.textContent(meaningful[0]).trim();
    if (!/^https?:\/\/\S+$/i.test(value)) return null;
  }

  let url: URL;
  try {
    url = new URL(value, siteUrl);
  } catch {
    return null;
  }
  if (url.origin !== siteUrl || !url.pathname.startsWith('/posts/')) return null;
  const segments = url.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  if (segments.length !== 3) return null;
  return {
    path: `/${segments.map(decodePathSegment).map(encodeURIComponent).join('/')}${url.search}${url.hash}`,
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
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  const match = url.pathname.match(/^\/([A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38})\/([A-Za-z0-9._-]+?)\/?$/);
  if (url.hostname !== 'github.com' || !match) return null;
  return `https://github.com/${match[1]}/${match[2]}`;
}

export function extractGitHubRepoLinkCard(paragraphHtml: string): string | null {
  const paragraph = soleParagraph(paragraphHtml);
  if (!paragraph) return null;
  const anchor = getSoleLink(paragraph.children);
  if (anchor) return parseGitHubRepoUrl(anchor.href);
  const meaningful = paragraph.children.filter(isMeaningfulText);
  if (meaningful.length !== 1 || meaningful[0].type !== ElementType.Text) return null;
  const value = DomUtils.textContent(meaningful[0]).trim();
  if (!/^https?:\/\/\S+$/i.test(value)) return null;
  return parseGitHubRepoUrl(value);
}

function extractLanguage(className: string | undefined): string | null {
  const languageClass = className?.split(/\s+/).find((token) => token.startsWith('language-'));
  return languageClass?.replace(/^language-/, '') ?? null;
}

function prepareProseNode(node: ParsedNode): void {
  if (isElement(node) && node.type === ElementType.Tag) {
    const allowedAttributes: readonly string[] = POST_CONTENT_ALLOWED_ATTRIBUTES[node.name as keyof typeof POST_CONTENT_ALLOWED_ATTRIBUTES] ?? [];
    for (const attribute of Object.keys(node.attribs)) {
      if (!allowedAttributes.includes(attribute)) delete node.attribs[attribute];
    }
    if (node.name === 'img') {
      node.attribs.loading ??= 'lazy';
      node.attribs.decoding ??= 'async';
    }
  }
  if ('children' in node) {
    for (const child of node.children) prepareProseNode(child);
  }
}

/** Split direct post-body children into renderable blocks while retaining nested prose structure. */
export function parsePostHtml(html: string, renderer: PostHtmlRenderer): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const document = parseDocument(html);
  let prose = '';

  const flushProse = () => {
    if (prose) {
      const sanitized = renderer.sanitize(prose);
      if (sanitized) blocks.push({ type: 'text', content: sanitized });
      prose = '';
    }
  };

  for (const node of document.children) {
    if (isElement(node) && node.name === 'pre') {
      let codeElement: ParsedElement | undefined;
      for (const child of node.children) {
        if (isElement(child) && child.name === 'code') {
          codeElement = child;
          break;
        }
      }
      if (codeElement) {
        flushProse();
        const rawCode = DomUtils.textContent(codeElement).trimEnd();
        if (rawCode.trim()) {
          const className = codeElement.attribs.class;
          const language = extractLanguage(className);
          if (language === 'mermaid') blocks.push({ type: 'mermaid', content: rawCode });
          else blocks.push({ type: 'code', content: renderer.highlight(rawCode, language) });
        }
        continue;
      }
    }

    if (isElement(node) && node.name === 'p') {
      const paragraph = DomUtils.getOuterHTML(node);
      const repoUrl = extractGitHubRepoLinkCard(paragraph);
      const linkCard = extractInternalPostLinkCard(paragraph);
      if (repoUrl || linkCard) {
        flushProse();
        if (repoUrl) blocks.push({ type: 'github-repo', content: repoUrl });
        else if (linkCard) blocks.push({ type: 'link-card', content: linkCard.path, label: linkCard.label });
        continue;
      }
    }

    prepareProseNode(node);
    prose += DomUtils.getOuterHTML(node);
  }

  flushProse();
  return blocks;
}
