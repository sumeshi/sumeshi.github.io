import sanitizeHtml from 'sanitize-html';
import hljs from 'highlight.js/lib/common';
import type { ContentBlock } from '#lib/types.ts';
import {
  parsePostHtml,
  POST_CONTENT_ALLOWED_ATTRIBUTES,
  POST_CONTENT_ALLOWED_TAGS,
} from '#lib/post-html.ts';

/** Render API HTML into serializable blocks while prerendering under Node.js. */
export function parsePostContentForBuild(html: string): ContentBlock[] {
  return parsePostHtml(html, {
    sanitize: (fragment) => sanitizeHtml(fragment, {
      allowedTags: POST_CONTENT_ALLOWED_TAGS,
      allowedAttributes: POST_CONTENT_ALLOWED_ATTRIBUTES,
      allowedSchemes: ['http', 'https', 'mailto'],
      allowProtocolRelative: false,
    }).trim(),
    highlight: (code, language) => language && hljs.getLanguage(language)
      ? hljs.highlight(code, { language }).value
      : hljs.highlightAuto(code).value,
  });
}
