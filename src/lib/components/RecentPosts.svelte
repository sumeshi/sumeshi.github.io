<script lang="ts">
  import { pathWithBase } from '#lib/paths.ts';
  import type { PostIndex } from '#lib/types.ts';
  import LoadingPulse from './LoadingPulse.svelte';
  import PostListItem from './PostListItem.svelte';

  interface Props {
    posts: PostIndex[];
    loading?: boolean;
  }

  let { posts, loading = false }: Props = $props();
</script>

<section class="mx-auto w-full max-w-4xl" aria-labelledby="recent-posts-title">
  <div class="mb-2 flex items-end justify-between gap-4 border-b border-gray-800/80 pb-3">
    <h2 id="recent-posts-title" class="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-gray-300">Recent Posts</h2>
    <a href={pathWithBase('/posts')} class="text-xs font-medium uppercase tracking-[0.14em] text-gray-500 transition-colors hover:text-indigo-300">All Posts</a>
  </div>

  {#if loading}
    <LoadingPulse lines={5} compact={true} />
  {:else if posts.length > 0}
    <div class="divide-y divide-gray-800/60">
      {#each posts as post (post.path)}
        <PostListItem {post} recent />
      {/each}
    </div>
  {:else}
    <p class="py-5 text-sm text-gray-600">No posts found.</p>
  {/if}
</section>
