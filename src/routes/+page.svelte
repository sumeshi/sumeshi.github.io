<script lang="ts">
  import LoadingPulse from '$lib/components/LoadingPulse.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import { pathWithBase, postHref } from '$lib/paths';
  import { createPostListState } from '$lib/post-list-state.svelte';
  import { fetchPosts, formatPostListDate, getPostCategory, getPostListTitle } from '$lib/posts';
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

  <section class="mx-auto w-full max-w-4xl">
    <div class="mb-2 flex items-end justify-between gap-4 border-b border-gray-800/80 pb-3">
      <h2 class="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-gray-300">Recent Posts</h2>
      <a href={pathWithBase('/posts')} class="text-xs font-medium uppercase tracking-[0.14em] text-gray-500 transition-colors hover:text-indigo-300">All Posts</a>
    </div>

    {#if postState.state.loading}
      <LoadingPulse lines={5} compact={true} />
    {:else if recentPosts.length > 0}
      <div class="divide-y divide-gray-800/60">
        {#each recentPosts as post}
          <a
            href={postHref(post.path)}
            class="group grid gap-2 py-3 transition-colors hover:bg-white/[0.015] sm:grid-cols-[1fr_auto] sm:items-start"
          >
            <span class="min-w-0">
              <span class="block truncate font-sans text-base font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-indigo-300 sm:text-[1.05rem]">
                {getPostListTitle(post)}
              </span>
              {#if post.description}
                <span class="mt-1.5 block line-clamp-2 text-sm leading-relaxed text-gray-400">{post.description}</span>
              {/if}
            </span>
            <span class="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] sm:pt-1">
              <span class="text-indigo-400">{getPostCategory(post.path)}</span>
              <span class="text-gray-700">/</span>
              <time class="text-gray-600" datetime={post.published_at}>{formatPostListDate(post.published_at)}</time>
            </span>
          </a>
        {/each}
      </div>
    {:else}
      <p class="py-5 text-sm text-gray-600">No posts found.</p>
    {/if}
  </section>
</div>
