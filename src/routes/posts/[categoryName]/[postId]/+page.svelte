<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { pathWithBase } from '$lib/paths';
  import type { PostContent, ContentBlock } from '$lib/types';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/tokyo-night-dark.css';

  let post: PostContent = $state({
    title: '',
    path: '',
    html_text: '',
    published_at: '',
  });
  let contents: ContentBlock[] = $state([]);
  let loading = $state(true);

  const categoryName = $derived($page.params.categoryName);
  const postId = $derived($page.params.postId);

  function sanitize(html: string): string {
    // Allow only safe tags for post content
    const allowed = [
      'h1','h2','h3','h4','h5','h6',
      'p','ul','ol','li','blockquote',
      'strong','em','code','pre','br',
      'a','img','table','thead','tbody','tr','th','td',
    ];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    // Remove script and style tags
    doc.querySelectorAll('script, style, iframe, object, embed').forEach((el) => el.remove());
    return doc.body.innerHTML;
  }

  function parseContents(html: string): ContentBlock[] {
    const parts = html.split(/(<pre><code[^>]*>|<\/code><\/pre>)/);
    const blocks: ContentBlock[] = [];
    let insideCode = false;

    for (const part of parts) {
      if (/<pre><code[^>]*>/.test(part)) {
        insideCode = true;
      } else if (/<\/code><\/pre>/.test(part)) {
        insideCode = false;
      } else if (insideCode) {
        blocks.push({ type: 'code', content: hljs.highlightAuto(sanitize(part)).value });
      } else {
        blocks.push({ type: 'text', content: sanitize(part) });
      }
    }
    return blocks;
  }

  onMount(async () => {
    try {
      const url = `https://sumeshi.github.io/api/posts/${categoryName}/${postId}/index.html`;
      const res = await fetch(url);
      const data: PostContent = await res.json();
      post = data;
      contents = parseContents(data.html_text);
    } catch (e) {
      console.error('Failed to fetch post:', e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{post.title || postId} | sumeshi</title>
</svelte:head>

<div class="max-w-5xl mx-auto">
  <div class="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
    <!-- Title bar -->
    <div class="px-6 py-4 border-b border-gray-800 flex items-center justify-between gap-4">
      <nav class="font-mono text-xs text-gray-500 min-w-0">
        <a href={pathWithBase('/posts')} class="hover:text-gray-300 transition-colors">POSTS</a>
        <span class="mx-1">/</span>
        <a href={pathWithBase(`/posts/${categoryName}`)} class="hover:text-gray-300 transition-colors">{categoryName}</a>
        <span class="mx-1">/</span>
        <span class="text-gray-400 truncate">{postId}</span>
      </nav>
      <div class="flex items-center gap-3 shrink-0">
        {#if post.published_at}
          <span class="text-gray-500 text-xs">{post.published_at.replace('T', ' ').substring(0, 16)}</span>
        {/if}
        <a
          href="https://github.com/sumeshi/api/blob/master/{categoryName}/{postId}.md"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-500 hover:text-white transition-colors"
          aria-label="View source on GitHub"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Post content -->
    <div class="p-6">
      {#if loading}
        <p class="text-gray-600 text-sm">Loading...</p>
      {:else}
        {#each contents as block}
          {#if block.type === 'text'}
            <div class="html-wrapper text-gray-300 text-sm leading-relaxed">
              {@html block.content}
            </div>
          {:else}
            <div class="mt-3 mb-3 rounded-lg overflow-hidden" style="background:#1a1b26;">
              <pre class="p-4 overflow-x-auto text-sm leading-relaxed" style="white-space: pre-wrap;"><code>{@html block.content}</code></pre>
            </div>
          {/if}
        {/each}
      {/if}
    </div>

    <!-- Footer -->
    <div class="px-6 py-4 border-t border-gray-800 flex justify-center">
      <button
        onclick={() => goto(pathWithBase('/posts'))}
        class="text-sm border border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white rounded px-6 py-2 transition-colors"
      >
        back
      </button>
    </div>
  </div>
</div>
