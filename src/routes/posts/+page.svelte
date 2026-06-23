<script lang="ts">
  import LoadingPulse from '$lib/components/LoadingPulse.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import PostListItem from '$lib/components/PostListItem.svelte';
  import { createPostListState } from '$lib/post-list-state.svelte';
  import { fetchPosts } from '$lib/posts';
  import { jsonLd, pageTitle, siteDescription, siteName, siteUrl } from '$lib/site';
  
  const postState = createPostListState({
    errorMessage: 'Failed to load posts.',
    getRequest: () => fetchPosts,
    onError: (error) => {
      console.error('Failed to fetch posts:', error);
    },
  });
</script>

<PageMeta
  title={pageTitle('Posts')}
  description="個人メモや備忘録の一覧"
/>

<svelte:head>
  {@html `<script type="application/ld+json">${jsonLd({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": `${siteName} Posts`,
    "description": siteDescription,
    "url": `${siteUrl}/posts`
  })}</script>`}
</svelte:head>

<div class="site-container">
  <section>
    <div class="mb-2 flex flex-col gap-3 border-b border-gray-800/80 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="page-title">All Posts</h1>
        <p class="mt-3 text-sm text-gray-400">
          ZennとかNoteに書くほどでもないこととか。ここで得た知識を悪用しないようにね。
        </p>
      </div>
      {#if !postState.state.loading}
        <p class="font-mono text-xs text-gray-600">{postState.state.value.length} entries</p>
      {/if}
    </div>

    <div>
      {#if postState.state.loading}
        <LoadingPulse lines={4} />
      {:else if postState.state.errorMessage}
        <p class="text-red-300 text-sm">{postState.state.errorMessage}</p>
      {:else if postState.state.value.length === 0}
        <p class="text-gray-600 text-sm">No posts found.</p>
      {:else}
        <div>
          {#each postState.state.value as post}
            <PostListItem {post} />
          {/each}
        </div>
      {/if}
    </div>
  </section>
</div>
