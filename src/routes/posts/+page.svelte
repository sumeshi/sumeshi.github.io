<script lang="ts">
  import LoadingPulse from '$lib/components/LoadingPulse.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import PostListItem from '$lib/components/PostListItem.svelte';
  import { pathWithBase } from '$lib/paths';
  import { createPostListState } from '$lib/post-list-state.svelte';
  import { fetchPosts } from '$lib/posts';
  import { untrack } from 'svelte';
  import {
    jsonLd,
    pageTitle,
    siteBlogId,
    siteDescription,
    siteName,
    sitePersonId,
    siteUrl,
    siteWebsiteId,
  } from '$lib/site';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  const postState = createPostListState({
    errorMessage: 'Failed to load posts.',
    initialValue: untrack(() => data.posts),
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
    "@graph": [
      {
        "@type": "Blog",
        "@id": siteBlogId,
        "name": `${siteName} Posts`,
        "description": siteDescription,
        "url": `${siteUrl}/posts`,
        "inLanguage": "ja",
        "author": { "@id": sitePersonId },
        "publisher": { "@id": sitePersonId },
        "isPartOf": { "@id": siteWebsiteId }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/posts#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${siteUrl}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Posts",
            "item": `${siteUrl}/posts`
          }
        ]
      }
    ]
  })}</script>`}
</svelte:head>

<div class="site-container space-y-6">
  <header class="flex flex-col gap-3 border-b border-gray-800/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h1 class="page-title">$ ls /var/log</h1>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
        記事にするほどでもない備忘録とか、整理中の知識とか。ここで得た知識を悪用しないようにね。
      </p>
    </div>
    <div class="flex items-center gap-3 self-start sm:self-end">
      {#if !postState.state.loading}
        <p class="font-mono text-xs text-gray-600">{postState.state.value.length} entries</p>
      {/if}
      <a
        href={pathWithBase('/feed.xml')}
        rel="alternate"
        type="application/rss+xml"
        class="inline-flex items-center gap-1 rounded border border-amber-400/60 px-1.5 py-0.5 font-mono text-[11px] text-amber-300 transition-colors hover:border-amber-300 hover:text-amber-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-3 w-3" fill="currentColor" aria-hidden="true">
          <circle cx="6.18" cy="17.82" r="2.18" />
          <path d="M4 4.44v2.83a12.73 12.73 0 0 1 12.73 12.73h2.83A15.56 15.56 0 0 0 4 4.44zm0 5.66v2.83a7.07 7.07 0 0 1 7.07 7.07h2.83A9.9 9.9 0 0 0 4 10.1z" />
        </svg>
        rss
      </a>
    </div>
  </header>

  <section>
    {#if postState.state.loading}
      <LoadingPulse lines={4} />
    {:else if postState.state.errorMessage}
      <p class="text-sm text-red-300">{postState.state.errorMessage}</p>
    {:else if postState.state.value.length === 0}
      <p class="text-sm text-gray-600">No posts found.</p>
    {:else}
      <div class="divide-y divide-gray-800/60">
        {#each postState.state.value as post}
          <PostListItem {post} />
        {/each}
      </div>
    {/if}
  </section>
</div>
