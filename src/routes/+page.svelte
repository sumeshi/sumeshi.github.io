<script lang="ts">
  import PageMeta from '#lib/components/PageMeta.svelte';
  import PopularPosts from '#lib/components/PopularPosts.svelte';
  import RecentPosts from '#lib/components/RecentPosts.svelte';
  import { pathWithBase } from '#lib/paths.ts';
  import { createPostListState } from '#lib/post-list-state.svelte.ts';
  import { fetchPosts } from '#lib/posts.ts';
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
  } from '#lib/site.ts';
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

<div class="site-container flex flex-col gap-12 pb-8 sm:gap-16">
  <section class="flex w-full shrink-0 flex-col items-center py-8 text-center sm:py-12">
    <h1 class="flex w-full justify-center">
      <img
        src={pathWithBase('/img/sipdep.svg')}
        alt="SIPDEP"
        width="1351"
        height="207"
        draggable="false"
        class="h-auto w-full max-w-[560px] shrink-0 object-contain"
      />
    </h1>
  </section>

  {#if data.popularPostPaths.length > 0}
    <PopularPosts posts={postState.state.value} paths={data.popularPostPaths} />
  {:else}
    <RecentPosts posts={recentPosts} loading={postState.state.loading} />
  {/if}
</div>
