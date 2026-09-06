import { fetchPostIndexForBuild } from '$lib/post-index-build';
import { orderPostsDescending } from '$lib/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => ({
  posts: orderPostsDescending(await fetchPostIndexForBuild()),
});
