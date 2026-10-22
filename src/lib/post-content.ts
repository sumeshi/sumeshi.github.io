import { POSTS_API_BASE } from '#lib/config.ts';
import { fetchJson } from '#lib/http.ts';
import type { ContentBlock, PostContent } from '#lib/types.ts';
import {
  parsePostHtml,
  POST_CONTENT_ALLOWED_ATTRIBUTES,
  POST_CONTENT_ALLOWED_TAGS,
} from '#lib/post-html.ts';

export { extractGitHubRepoLinkCard, extractInternalPostLinkCard } from '#lib/post-html.ts';

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
  const allowedAttributes = [...new Set(Object.values(POST_CONTENT_ALLOWED_ATTRIBUTES).flat())];
  return parsePostHtml(html, {
    sanitize: (fragment) => DOMPurify.sanitize(fragment, {
      ALLOWED_TAGS: POST_CONTENT_ALLOWED_TAGS,
      ALLOWED_ATTR: allowedAttributes,
      ALLOW_DATA_ATTR: false,
    }),
    highlight: (code, language) => language && hljs.getLanguage(language)
      ? hljs.highlight(code, { language }).value
      : hljs.highlightAuto(code).value,
  });
}

export function postSourceUrl(categoryName: string, postId: string): string {
  return `https://github.com/sumeshi/api/blob/master/${encodeURIComponent(categoryName)}/${encodeURIComponent(postId)}.md`;
}
