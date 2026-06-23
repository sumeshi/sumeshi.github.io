import { error } from '@sveltejs/kit';
import { fetchPostIndexForBuild, postRouteEntry, uniquePostEntries } from '$lib/post-index-build';
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

  return { post };
};
