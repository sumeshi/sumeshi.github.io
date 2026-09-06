import { fetchPostIndexForBuild, postRouteEntry, uniqueCategoryEntries } from '$lib/post-index-build';
import { orderPostsDescending } from '$lib/posts';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = async () => {
  const posts = await fetchPostIndexForBuild();
  return uniqueCategoryEntries(posts);
};

export const load: PageLoad = async ({ params }) => {
  const posts = await fetchPostIndexForBuild();

  return {
    posts: orderPostsDescending(
      posts.filter((post) => postRouteEntry(post)?.categoryName === params.categoryName),
    ),
  };
};
