<script lang="ts">
  import { onMount } from 'svelte';
  import { postHref } from '$lib/paths';
  import type { PostIndex } from '$lib/types';

  let posts: PostIndex[] = $state([]);
  let loading = $state(true);

  const platforms = [
    { name: 'dev.to', url: 'https://dev.to/sum3sh1', message: '@sum3sh1' },
    { name: 'zenn.dev', url: 'https://zenn.dev/sum3sh1', message: '@sum3sh1' },
    { name: 'Qiita', url: 'https://qiita.com/sumeshi', message: '@sumeshi' },
    { name: 'note', url: 'https://note.com/sumeshi_kun/', message: '@sumeshi_kun' },
  ];

  onMount(async () => {
    try {
      const res = await fetch('https://sumeshi.github.io/api/posts/');
      const data: PostIndex[] = await res.json();
      posts = data.reverse();
    } catch (e) {
      console.error('Failed to fetch posts:', e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Posts | sumeshi</title>
</svelte:head>

<div class="max-w-3xl mx-auto space-y-4">
  <!-- Info card -->
  <div class="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
    <h1 class="font-mono font-bold text-white text-lg mb-3">Posts</h1>
    <p class="text-gray-400 text-sm mb-1">
      セキュリティとか興味のあることとか色々。ここで得た知識を悪用しないように。
    </p>
    <p class="text-gray-400 text-sm mb-5">まとまった内容はdevとかzennに書きます。</p>

    <div class="flex flex-wrap gap-2">
      {#each platforms as platform}
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white rounded px-3 py-1.5 transition-colors"
        >
          {platform.name} | {platform.message}
        </a>
      {/each}
    </div>
  </div>

  <!-- All posts -->
  <div class="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
    <h2 class="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">All Posts</h2>

    {#if loading}
      <p class="text-gray-600 text-sm">Loading...</p>
    {:else if posts.length === 0}
      <p class="text-gray-600 text-sm">No posts found.</p>
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
