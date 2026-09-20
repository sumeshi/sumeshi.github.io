import sanitizeHtml from 'sanitize-html';
import hljs from 'highlight.js/lib/common';
import { extractInternalPostLinkCard } from '$lib/post-content';
import type { ContentBlock } from '$lib/types';

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'ul', 'ol', 'li', 'blockquote', 'hr',
  'strong', 'em', 'del', 'code', 'pre', 'br',
  'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
];

const ALLOWED_ATTRIBUTES = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
  code: ['class'],
};

const PRE_CODE_PATTERN = /<pre\b[^>]*>\s*<code\b([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/gi;
const TOP_LEVEL_ELEMENT_PATTERN = /<(\w+)\b[^>]*>[\s\S]*?<\/\1>|<hr\s*\/?>/gi;

function decodeCodeEntities(value: string): string {
  const namedEntities: Record<string, string> = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    quot: '"',
  };

  return value.replace(/&(#(?:x[\da-f]+|\d+)|[a-z]+);/gi, (entity, name: string) => {
    if (name.startsWith('#x') || name.startsWith('#X')) {
      return String.fromCodePoint(Number.parseInt(name.slice(2), 16));
    }

    if (name.startsWith('#')) {
      return String.fromCodePoint(Number.parseInt(name.slice(1), 10));
    }

    return namedEntities[name.toLowerCase()] ?? entity;
  });
}

function extractLanguage(attributes: string): string | null {
  const classMatch = attributes.match(/\bclass\s*=\s*["']([^"']*)["']/i);
  const languageClass = classMatch?.[1]
    .split(/\s+/)
    .find((token) => token.startsWith('language-'));

  return languageClass?.replace(/^language-/, '') ?? null;
}

function sanitizeProse(fragment: string): string {
  return sanitizeHtml(fragment, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: false,
    transformTags: {
      img: (_tagName, attributes) => ({
        tagName: 'img',
        attribs: {
          ...attributes,
          loading: attributes.loading ?? 'lazy',
          decoding: attributes.decoding ?? 'async',
        },
      }),
    },
  }).trim();
}

/** Render API HTML into serializable blocks while prerendering under Node.js. */
export function parsePostContentForBuild(html: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let cursor = 0;

  const boundaries: Array<{ start: number; end: number; preCode: boolean }> = [];

  for (const match of html.matchAll(PRE_CODE_PATTERN)) {
    const matchIndex = match.index ?? 0;
    boundaries.push({ start: matchIndex, end: matchIndex + match[0].length, preCode: true });
  }

  // Detect standalone internal-link paragraphs outside of code blocks.
  for (const match of html.matchAll(TOP_LEVEL_ELEMENT_PATTERN)) {
    const matchIndex = match.index ?? 0;
    const end = matchIndex + match[0].length;

    if (boundaries.some((boundary) => matchIndex >= boundary.start && matchIndex < boundary.end)) {
      continue;
    }

    if (!/^p$/i.test(match[1]) || match[0].includes('<pre')) {
      continue;
    }

    const linkCard = extractInternalPostLinkCard(match[0]);

    if (linkCard) {
      boundaries.push({ start: matchIndex, end, preCode: false });
    }
  }

  boundaries.sort((first, second) => first.start - second.start);

  for (const boundary of boundaries) {
    const prose = sanitizeProse(html.slice(cursor, boundary.start));

    if (prose) {
      blocks.push({ type: 'text', content: prose });
    }

    if (boundary.preCode) {
      const segment = html.slice(boundary.start, boundary.end);
      const preCodeMatch = segment.match(PRE_CODE_PATTERN);
      const codeContent = preCodeMatch?.[2];

      if (codeContent) {
        const rawCode = decodeCodeEntities(codeContent).trimEnd();

        if (rawCode.trim()) {
          const language = extractLanguage(preCodeMatch[1]);
          const highlighted = language && hljs.getLanguage(language)
            ? hljs.highlight(rawCode, { language }).value
            : hljs.highlightAuto(rawCode).value;

          blocks.push({ type: 'code', content: highlighted });
        }
      }
    } else {
      const segment = html.slice(boundary.start, boundary.end);
      const linkCard = extractInternalPostLinkCard(segment);

      if (linkCard) {
        blocks.push({
          type: 'link-card',
          content: linkCard.path,
          label: linkCard.label,
        });
      }
    }

    cursor = boundary.end;
  }

  const trailingProse = sanitizeProse(html.slice(cursor));

  if (trailingProse) {
    blocks.push({ type: 'text', content: trailingProse });
  }

  return blocks;
}
