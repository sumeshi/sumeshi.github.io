<script lang="ts">
  import type { PostIndex } from '#lib/types.ts';
  import LoadingPulse from './LoadingPulse.svelte';
  import PostListItem from './PostListItem.svelte';

  interface Props {
    posts: PostIndex[];
    loading?: boolean;
    errorMessage?: string;
    emptyMessage?: string;
    showCategory?: boolean;
  }

  let {
    posts,
    loading = false,
    errorMessage = '',
    emptyMessage = 'No posts found.',
    showCategory = true,
  }: Props = $props();
</script>

{#if loading}
  <LoadingPulse lines={4} />
{:else if errorMessage}
  <p class="text-sm text-red-300">{errorMessage}</p>
{:else if posts.length === 0}
  <p class="text-sm text-gray-600">{emptyMessage}</p>
{:else}
  <div class="divide-y divide-gray-800/60">
    {#each posts as post (post.path)}
      <PostListItem {post} {showCategory} />
    {/each}
  </div>
{/if}
