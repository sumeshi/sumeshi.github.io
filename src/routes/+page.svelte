<script lang="ts">
  import PageMeta from '$lib/components/PageMeta.svelte';
  import PopularPosts from '$lib/components/PopularPosts.svelte';
  import RecentPosts from '$lib/components/RecentPosts.svelte';
  import { pathWithBase } from '$lib/paths';
  import { createPostListState } from '$lib/post-list-state.svelte';
  import { fetchPosts } from '$lib/posts';
  import { untrack } from 'svelte';
  import {
    jsonLd,
    siteHomeDescription,
    siteHomeTitle,
    siteName,
    sitePersonId,
    siteProfileImageUrl,
    siteSameAs,
    siteUrl,
    siteWebsiteId,
  } from '$lib/site';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  const postState = createPostListState({
    errorMessage: '',
    initialValue: untrack(() => data.posts),
    getRequest: () => fetchPosts,
  });
  const recentPosts = $derived(postState.state.value.slice(0, 5));
</script>

<PageMeta title={siteHomeTitle} description={siteHomeDescription} language="en" />

<svelte:head>
  {@html `<script type="application/ld+json">${jsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": siteWebsiteId,
        "url": siteUrl,
        "name": siteName,
        "description": siteHomeDescription,
        "inLanguage": "en",
        "author": { "@id": sitePersonId },
        "publisher": { "@id": sitePersonId }
      },
      {
        "@type": "Person",
        "@id": sitePersonId,
        "name": "S.Nakano",
        "url": siteUrl,
        "image": siteProfileImageUrl,
        "jobTitle": "DFIR Researcher / Software Developer",
        "sameAs": siteSameAs
      }
    ]
  })}</script>`}
</svelte:head>

<div class="mx-auto flex w-full max-w-6xl flex-col justify-center gap-7 py-2 md:gap-9 lg:h-[calc(100vh-6rem)] lg:overflow-hidden lg:py-0">
  <section class="flex min-h-0 py-12 flex-col items-center justify-center text-center">
    <h1 class="sr-only">SIPDEP</h1>
    <img
      src={pathWithBase('/img/sipdep.svg')}
      alt=""
      aria-hidden="true"
      width="1460"
      height="392"
      draggable="false"
      class="max-h-[32vh] w-full max-w-[960px] object-contain sm:max-h-[38vh] lg:max-h-[42vh]"
    />
  </section>

  {#if data.popularPostPaths.length > 0}
    <PopularPosts posts={postState.state.value} paths={data.popularPostPaths} />
  {:else}
    <RecentPosts posts={recentPosts} loading={postState.state.loading} />
  {/if}
</div>
