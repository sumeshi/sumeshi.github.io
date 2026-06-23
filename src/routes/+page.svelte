<script lang="ts">
  import LoadingPulse from '$lib/components/LoadingPulse.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import { pathWithBase, postHref } from '$lib/paths';
  import { createPostListState } from '$lib/post-list-state.svelte';
  import { fetchPosts, formatPostListDate, getPostListTitle } from '$lib/posts';
  import { jsonLd, siteName, siteDescription } from '$lib/site';

  const postState = createPostListState({
    errorMessage: '',
    getRequest: () => fetchPosts,
  });
  const recentPosts = $derived(postState.state.value.slice(0, 5));
</script>

<PageMeta title={siteName} description={siteDescription} />

<svelte:head>
  {@html `<script type="application/ld+json">${jsonLd({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "S.Nakano",
    "url": "https://sumeshi.github.io",
    "jobTitle": "DFIR Researcher / Software Developer",
    "sameAs": [
      "https://github.com/sumeshi",
      "https://x.com/sum3sh1",
      "https://zenn.dev/sum3sh1",
      "https://note.com/sumeshi_kun/",
      "https://dev.to/sum3sh1",
      "https://qiita.com/sumeshi",
      "https://speakerdeck.com/sumeshi"
    ]
  })}</script>`}
</svelte:head>

<div class="mx-auto flex w-full max-w-6xl flex-col justify-center gap-7 py-2 md:gap-9 lg:h-[calc(100vh-6rem)] lg:overflow-hidden lg:py-0">
  <section class="flex min-h-0 flex-col items-center justify-center text-center">
    <img
      src={pathWithBase('/img/sipdep.svg')}
      alt="SIPDEP"
      class="max-h-[32vh] w-full max-w-[960px] object-contain sm:max-h-[38vh] lg:max-h-[42vh]"
    />
  </section>

  <section class="mx-auto w-full max-w-4xl">
    <div class="mb-2 flex items-end justify-between gap-4 border-b border-gray-800/80 pb-3">
      <h1 class="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-gray-300">Recent Posts</h1>
      <a href={pathWithBase('/posts')} class="text-xs font-medium uppercase tracking-[0.14em] text-gray-500 transition-colors hover:text-indigo-300">All Posts</a>
    </div>

    {#if postState.state.loading}
      <LoadingPulse lines={5} compact={true} />
    {:else if recentPosts.length > 0}
      <div class="divide-y divide-gray-800/70">
        {#each recentPosts as post}
          <a
            href={postHref(post.path)}
            class="group grid gap-2 py-3 transition-colors hover:bg-white/[0.015] sm:grid-cols-[1fr_auto] sm:items-start"
          >
            <span class="min-w-0">
              <span class="block truncate text-sm font-medium text-gray-200 transition-colors group-hover:text-indigo-300">
                {getPostListTitle(post)}
              </span>
              {#if post.description}
                <span class="mt-1 block line-clamp-2 text-xs leading-5 text-gray-500">{post.description}</span>
              {/if}
            </span>
            <span class="font-mono text-xs text-gray-600 sm:pt-0.5">
              {formatPostListDate(post.published_at)}
            </span>
          </a>
        {/each}
      </div>
    {:else}
      <p class="py-5 text-sm text-gray-600">No posts found.</p>
    {/if}
  </section>
</div>
