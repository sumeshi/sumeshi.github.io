import sanitizeHtml from 'sanitize-html';
import hljs from 'highlight.js/lib/common';
import type { ContentBlock } from '$lib/types';

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'ul', 'ol', 'li', 'blockquote', 'hr',
  'strong', 'em', 'code', 'pre', 'br',
  'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
];

const ALLOWED_ATTRIBUTES = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'title'],
  code: ['class'],
};

const PRE_CODE_PATTERN = /<pre\b[^>]*>\s*<code\b([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/gi;

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
  }).trim();
}

/** Render API HTML into serializable blocks while prerendering under Node.js. */
export function parsePostContentForBuild(html: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let cursor = 0;

  for (const match of html.matchAll(PRE_CODE_PATTERN)) {
    const matchIndex = match.index ?? 0;
    const prose = sanitizeProse(html.slice(cursor, matchIndex));

    if (prose) {
      blocks.push({ type: 'text', content: prose });
    }

    const rawCode = decodeCodeEntities(match[2]).trimEnd();

    if (rawCode.trim()) {
      const language = extractLanguage(match[1]);
      const highlighted = language && hljs.getLanguage(language)
        ? hljs.highlight(rawCode, { language }).value
        : hljs.highlightAuto(rawCode).value;

      blocks.push({ type: 'code', content: highlighted });
    }

    cursor = matchIndex + match[0].length;
  }

  const trailingProse = sanitizeProse(html.slice(cursor));

  if (trailingProse) {
    blocks.push({ type: 'text', content: trailingProse });
  }

  return blocks;
}
