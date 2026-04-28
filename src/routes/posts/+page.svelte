<script lang="ts">
  import LoadingPulse from '$lib/components/LoadingPulse.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import PostListItem from '$lib/components/PostListItem.svelte';
  import { createAsyncDataState } from '$lib/load-state.svelte';
  import { fetchPosts } from '$lib/posts';
  import { pageTitle } from '$lib/site';
  import type { PostIndex } from '$lib/types';

  const postState = createAsyncDataState<PostIndex[]>([]);

  async function loadPosts(signal?: AbortSignal): Promise<void> {
    await postState.load(fetchPosts, {
      errorMessage: 'Failed to load posts.',
      onError: (error) => {
        console.error('Failed to fetch posts:', error);
      },
    }, signal);
  }

  $effect(() => {
    const controller = new AbortController();

    void loadPosts(controller.signal);

    return () => controller.abort();
  });
</script>

<PageMeta
  title={pageTitle('Posts')}
  description="個人メモや備忘録の一覧"
/>

<div class="site-container space-y-4">
  <!-- Info card -->
  <div class="panel-card panel-surface">
    <h1 class="page-title mb-3">All Posts</h1>
    <p class="text-gray-400 text-sm mb-1">
      ZennとかNoteに書くほどでもないこととか。ここで得た知識を悪用しないようにね。
    </p>

    <div class="mt-5">
      {#if postState.state.loading}
        <LoadingPulse lines={4} />
      {:else if postState.state.errorMessage}
        <p class="text-red-300 text-sm">{postState.state.errorMessage}</p>
      {:else if postState.state.value.length === 0}
        <p class="text-gray-600 text-sm">No posts found.</p>
      {:else}
        <div class="space-y-2">
          {#each postState.state.value as post}
            <PostListItem {post} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
