import type { ContentBlock, PostContent } from '$lib/types';

const POSTS_API_BASE = 'https://sumeshi.github.io/api/posts';

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'ul', 'ol', 'li', 'blockquote',
  'strong', 'em', 'code', 'pre', 'br',
  'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
];

const ALLOWED_ATTR = ['href', 'src', 'alt', 'title', 'target', 'rel'];

type DOMPurifyModule = typeof import('dompurify').default;
type HighlightModule = typeof import('highlight.js/lib/common').default;

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

export async function fetchPostContent(
  categoryName: string,
  postId: string,
  signal?: AbortSignal,
): Promise<PostContent> {
  const response = await fetch(
    `${POSTS_API_BASE}/${encodeURIComponent(categoryName)}/${encodeURIComponent(postId)}/index.html`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<PostContent>;
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

    proseFragments.push(serializeNode(node));
  }

  flushProse();

  return blocks;
}

export function postSourceUrl(categoryName: string, postId: string): string {
  return `https://github.com/sumeshi/api/blob/master/${encodeURIComponent(categoryName)}/${encodeURIComponent(postId)}.md`;
}
