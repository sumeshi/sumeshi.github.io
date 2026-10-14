import { fetchPostIndexForBuild } from '#lib/post-index-build.ts';
import { orderPostsDescending } from '#lib/posts.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => ({
  posts: orderPostsDescending(await fetchPostIndexForBuild()),
});
