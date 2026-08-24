import { error } from '@sveltejs/kit';
import { building } from '$app/environment';
import { fetchPostIndexForBuild, postRouteEntry, uniquePostEntries } from '$lib/post-index-build';
import { fetchPostContent } from '$lib/post-content';
import type { ContentBlock, PostContent } from '$lib/types';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = async () => {
  const posts = await fetchPostIndexForBuild();
  return uniquePostEntries(posts);
};

export const load: PageLoad = async ({ params }) => {
  const posts = await fetchPostIndexForBuild();
  const post = posts.find((candidate) => {
    const entry = postRouteEntry(candidate);
    return entry?.categoryName === params.categoryName && entry.postId === params.postId;
  });

  if (!post) {
    throw error(404, 'Post not found');
  }

  let postContent: PostContent | null = null;
  let initialContents: ContentBlock[] = [];

  // GitHub Pages cannot SSR at request time. During a production build, embed
  // a sanitized snapshot; the component refreshes it from the API in-browser.
  if (building) {
    postContent = await fetchPostContent(params.categoryName, params.postId);
    const { parsePostContentForBuild } = await import('$lib/post-content-build');
    initialContents = parsePostContentForBuild(postContent.html_text);
  }

  return { post, postContent, initialContents };
};
