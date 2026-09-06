<script lang="ts">
  import { pathWithBase } from '$lib/paths';
  import { getPostPath } from '$lib/posts';
  import type { PostIndex } from '$lib/types';
  import PostListItem from './PostListItem.svelte';

  interface Props {
    posts: PostIndex[];
    paths: string[];
  }

  let { posts, paths }: Props = $props();

  const popularPosts = $derived(
    paths.flatMap((path) => {
      const post = posts.find((candidate) => getPostPath(candidate.path) === path);
      return post ? [post] : [];
    }),
  );
</script>

{#if popularPosts.length > 0}
  <section class="mx-auto w-full max-w-4xl" aria-labelledby="popular-posts-title">
    <div class="mb-2 flex items-end justify-between gap-4 border-b border-gray-800/80 pb-3">
      <h2 id="popular-posts-title" class="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-gray-300">
        Popular Posts
      </h2>
      <a href={pathWithBase('/posts')} class="text-xs font-medium uppercase tracking-[0.14em] text-gray-500 transition-colors hover:text-indigo-300">All Posts</a>
    </div>

    <div class="divide-y divide-gray-800/60">
      {#each popularPosts as post (post.path)}
        <PostListItem {post} />
      {/each}
    </div>
  </section>
{/if}
