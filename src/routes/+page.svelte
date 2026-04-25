<script lang="ts">
  import { onMount } from 'svelte';
  import { pathWithBase, postHref } from '$lib/paths';
  import type { PostIndex } from '$lib/types';

  let posts: PostIndex[] = $state([]);
  let loading = $state(true);

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/sumeshi', message: '@sumeshi' },
    { name: 'X', url: 'https://twitter.com/sum3sh1', message: '@sum3sh1' },
  ];

  const navButtons = [
    { label: '$ whoami', href: '/about' },
    { label: '$ ps aux', href: '/works' },
    { label: '$ ls posts/', href: '/posts' },
  ];

  onMount(async () => {
    try {
      const res = await fetch('https://sumeshi.github.io/api/posts/');
      const data: PostIndex[] = await res.json();
      posts = data.slice(-5).reverse();
    } catch (e) {
      console.error('Failed to fetch posts:', e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Home | sumeshi</title>
</svelte:head>

<div class="max-w-3xl mx-auto space-y-4">
  <!-- User overview -->
  <div class="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
    <div class="flex items-center gap-5">
      <a href={pathWithBase('/about')} class="shrink-0">
        <img
          src={pathWithBase('/img/me.jpg')}
          alt="S.Nakano"
          class="w-20 h-20 rounded-full object-cover border-2 border-gray-700 hover:border-indigo-500 transition-colors"
        />
      </a>
      <div>
        <h1 class="text-white text-xl font-bold">S.Nakano</h1>
        <p class="text-gray-400 text-sm mt-0.5">DFIR Researcher / Software Developer</p>
        <div class="flex flex-wrap gap-2 mt-3">
          {#each socialLinks as link}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded px-2 py-1 transition-colors"
            >
              {link.name} | {link.message}
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation shortcuts -->
  <div class="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
    <div class="flex flex-wrap gap-3">
          {#each navButtons as btn}
        <a
          href={pathWithBase(btn.href)}
          class="font-mono text-sm border border-gray-700 hover:border-indigo-500 text-gray-300 hover:text-white rounded px-4 py-2 min-w-[160px] text-center transition-colors"
        >
          {btn.label}
        </a>
      {/each}
    </div>
  </div>

  <!-- Latest posts -->
  <div class="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
    <h2 class="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Latest Posts</h2>

    {#if loading}
      <p class="text-gray-600 text-sm">Loading...</p>
    {:else if posts.length === 0}
      <p class="text-gray-600 text-sm">No posts found.</p>
    {:else}
      <div class="space-y-3">
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
            {#if post.heading}
              <span class="inline-block mt-2 text-xs text-indigo-400 bg-indigo-600/10 border border-indigo-600/20 rounded px-2 py-0.5">
                {post.heading}
              </span>
            {/if}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>
