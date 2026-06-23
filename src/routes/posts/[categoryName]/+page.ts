import { fetchPostIndexForBuild, uniqueCategoryEntries } from '$lib/post-index-build';
import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = async () => {
  const posts = await fetchPostIndexForBuild();
  return uniqueCategoryEntries(posts);
};
