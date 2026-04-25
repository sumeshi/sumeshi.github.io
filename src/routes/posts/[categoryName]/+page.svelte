<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { pathWithBase, postHref } from '$lib/paths';
  import type { PostIndex } from '$lib/types';

  let posts: PostIndex[] = $state([]);
  let loading = $state(true);

  const categoryName = $derived($page.params.categoryName);

  onMount(async () => {
    try {
      const res = await fetch(`https://sumeshi.github.io/api/posts/${categoryName}`);
      const data: PostIndex[] = await res.json();
      posts = data.reverse();
    } catch (e) {
      console.error('Failed to fetch category posts:', e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{categoryName} | Posts | sumeshi</title>
</svelte:head>

<div class="max-w-3xl mx-auto space-y-4">
  <!-- Breadcrumb -->
  <nav class="text-xs text-gray-500 font-mono">
    <a href={pathWithBase('/posts')} class="hover:text-gray-300 transition-colors">POSTS</a>
    <span class="mx-1">/</span>
    <span class="text-gray-300">{categoryName}</span>
  </nav>

  <div class="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
    <div class="flex items-baseline justify-between mb-5">
      <h1 class="font-mono font-bold text-white">{categoryName}</h1>
      {#if !loading}
        <span class="text-gray-500 text-sm">{posts.length} post{posts.length !== 1 ? 's' : ''}</span>
      {/if}
    </div>

    {#if loading}
      <p class="text-gray-600 text-sm">Loading...</p>
    {:else if posts.length === 0}
      <p class="text-gray-600 text-sm">No posts in this category.</p>
    {:else}
      <div class="space-y-2">
        {#each posts as post}
          <a
            href={postHref(post.path)}
            class="block group border border-gray-800 hover:border-gray-600 rounded-lg p-4 transition-colors"
          >
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-gray-200 font-medium text-sm group-hover:text-indigo-400 transition-colors line-clamp-1">
                {post.title}
              </h3>
              <span class="text-gray-600 text-xs whitespace-nowrap shrink-0">
                {post.published_at?.substring(0, 10) ?? ''}
              </span>
            </div>
            {#if post.description}
              <p class="text-gray-500 text-xs mt-1 line-clamp-2">{post.description}</p>
            {/if}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>
