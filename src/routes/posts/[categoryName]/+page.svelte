<script lang="ts">
  import { page } from '$app/stores';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import LoadingPulse from '$lib/components/LoadingPulse.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import PostListItem from '$lib/components/PostListItem.svelte';
  import { createAsyncDataState } from '$lib/load-state.svelte';
  import { pathWithBase } from '$lib/paths';
  import { fetchCategoryPosts } from '$lib/posts';
  import { pageTitle } from '$lib/site';
  import type { PostIndex } from '$lib/types';

  const postState = createAsyncDataState<PostIndex[]>([]);

  const categoryName = $derived($page.params.categoryName);
  const categoryLabel = $derived(categoryName ?? 'unknown');

  async function loadCategoryPosts(category: string, signal?: AbortSignal): Promise<void> {
    await postState.load((loadSignal) => fetchCategoryPosts(category, loadSignal), {
      errorMessage: 'Failed to load posts for this category.',
      onError: (error) => {
        console.error('Failed to fetch category posts:', error);
      },
    }, signal);
  }

  $effect(() => {
    if (!categoryName) {
      postState.fail('Category not found.', []);
      return;
    }

    const controller = new AbortController();

    void loadCategoryPosts(categoryName, controller.signal);

    return () => controller.abort();
  });
</script>

<PageMeta
  title={pageTitle(`${categoryLabel} | Posts`)}
  description={`${categoryLabel} カテゴリの投稿一覧`}
/>

<div class="site-container space-y-4">
  <Breadcrumb items={[{ label: 'POSTS', href: pathWithBase('/posts') }, { label: categoryLabel }]} />

  <div class="panel-card panel-surface">
    <div class="flex items-baseline justify-between mb-5">
      <h1 class="page-title">{categoryLabel}</h1>
      {#if !postState.state.loading}
        <span class="text-gray-500 text-sm">{postState.state.value.length} post{postState.state.value.length !== 1 ? 's' : ''}</span>
      {/if}
    </div>

    {#if postState.state.loading}
      <LoadingPulse lines={4} />
    {:else if postState.state.errorMessage}
      <p class="text-red-300 text-sm">{postState.state.errorMessage}</p>
    {:else if postState.state.value.length === 0}
      <p class="text-gray-600 text-sm">No posts in this category.</p>
    {:else}
      <div class="space-y-2">
        {#each postState.state.value as post}
          <PostListItem {post} />
        {/each}
      </div>
    {/if}
  </div>
</div>
