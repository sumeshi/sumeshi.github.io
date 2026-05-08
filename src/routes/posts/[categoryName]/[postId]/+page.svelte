<script lang="ts">
  import LoadingPulse from '$lib/components/LoadingPulse.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import LinkButton from '$lib/components/LinkButton.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import { page } from '$app/stores';
  import { createAsyncDataState } from '$lib/load-state.svelte';
  import { pathWithBase } from '$lib/paths';
  import { formatPostPublishedAt, getPostTitle } from '$lib/posts';
  import { pageTitle, siteDescription } from '$lib/site';
  import { fetchPostContent, parsePostContent, postSourceUrl } from '$lib/post-content';
  import type { PostContent, ContentBlock } from '$lib/types';
  import 'highlight.js/styles/tokyo-night-dark.css';

  const emptyPost: PostContent = {
    title: '',
    path: '',
    html_text: '',
    published_at: '',
  };

  const postState = createAsyncDataState<PostContent>({ ...emptyPost });
  let contents: ContentBlock[] = $state([]);

  const categoryName = $derived($page.params.categoryName);
  const postId = $derived($page.params.postId);
  const postTitle = $derived(postState.state.value.title || postState.state.value.heading ? getPostTitle(postState.state.value) : '');
  const breadcrumbTitle = $derived(postTitle || postId || 'Post');
  const postDescription = $derived(
    postState.state.value.html_text
      ? postState.state.value.html_text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150)
      : siteDescription
  );

  const xShareUrl = $derived(
    postTitle
      ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}%20-%20SIPDEP&url=${encodeURIComponent($page.url.href)}`
      : '',
  );

  async function loadPost(category: string, id: string, signal?: AbortSignal): Promise<void> {
    await postState.load((loadSignal) => fetchPostContent(category, id, loadSignal), {
      errorMessage: 'Failed to load this post.',
      onSuccess: async (data) => {
        contents = await parsePostContent(data.html_text);
      },
      onError: (error) => {
        contents = [];
        console.error('Failed to fetch post:', error);
      },
    }, signal);
  }

  $effect(() => {
    if (!categoryName || !postId) {
      contents = [];
      postState.fail('Post not found.', { ...emptyPost });
      return;
    }

    const controller = new AbortController();

    void loadPost(categoryName, postId, controller.signal);

    return () => controller.abort();
  });
</script>

<PageMeta
  title={pageTitle(postTitle || postId || 'Post')}
  description={postDescription}
/>

<div class="site-container">
  <div class="panel-shell panel-surface">
    <!-- Title bar -->
    <div class="flex flex-col gap-3 border-b border-gray-800 px-6 py-4 sm:flex-row sm:items-start sm:justify-between">
      <Breadcrumb
        items={[
          { label: 'POSTS', href: pathWithBase('/posts') },
          { label: categoryName ?? '', href: pathWithBase(`/posts/${categoryName}`) },
          { label: breadcrumbTitle },
        ]}
        wrap={true}
      />
      <div class="flex items-center gap-2 self-start sm:shrink-0">
        {#if postTitle}
          <LinkButton
            href={xShareUrl}
            external={true}
            variant="x"
            className="order-1 gap-1.5 px-3 py-1.5 text-xs font-medium sm:order-3"
          >
            <svg class="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Share</span>
          </LinkButton>
        {/if}
        <IconButton
          href={postSourceUrl(categoryName ?? '', postId ?? '')}
          external={true}
          label="View source on GitHub"
          variant="brand"
          className="order-2 sm:order-2"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </IconButton>
        {#if postState.state.value.published_at}
          <span class="order-3 hidden text-xs text-gray-500 sm:inline sm:order-1">{formatPostPublishedAt(postState.state.value.published_at)}</span>
        {/if}
      </div>
    </div>

    <!-- Post content -->
    <div class="p-6">
      {#if postState.state.loading}
        <LoadingPulse lines={6} />
      {:else if postState.state.errorMessage}
        <p class="text-red-300 text-sm">{postState.state.errorMessage}</p>
      {:else if contents.length === 0}
        <p class="text-gray-600 text-sm">No content available.</p>
      {:else}
        {#each contents as block, index (`${block.type}-${index}`)}
          {#if block.type === 'text'}
            <div class="html-wrapper text-gray-300 text-sm leading-relaxed">
              {@html block.content}
            </div>
          {:else}
            <div class="code-block">
              <pre><code>{@html block.content}</code></pre>
            </div>
          {/if}
        {/each}
      {/if}
    </div>

    <!-- Footer -->
    <div class="flex justify-center border-t border-gray-800 px-6 py-5">
      <LinkButton
        href={pathWithBase('/posts')}
        variant="return"
        className="gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]"
      >
        <svg class="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 18l-6-6 6-6" />
        </svg>
        <span>All Posts</span>
      </LinkButton>
    </div>
  </div>
</div>
