<script lang="ts">
  import { postHref } from '#lib/paths.ts';
  import { formatPostListDate, getPostCategory, getPostTitle } from '#lib/posts.ts';
  import type { PostIndex } from '#lib/types.ts';

  interface Props {
    post: PostIndex;
    showCategory?: boolean;
    compact?: boolean;
    recent?: boolean;
  }

  let { post, showCategory = true, compact = false, recent = false }: Props = $props();
</script>

<a
  href={postHref(post.path)}
  class={`group block transition-colors hover:bg-white/[0.015] ${compact ? 'py-2.5' : 'py-3.5'} ${recent ? 'grid gap-2 sm:grid-cols-[1fr_auto] sm:items-start' : 'flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6'}`}
>
  <span class="min-w-0">
    {#if !recent}
      <span class="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em]">
        {#if showCategory}
          <span class="text-indigo-400">{getPostCategory(post.path)}</span>
          <span class="text-gray-700">/</span>
        {/if}
        <time class="text-gray-500" datetime={post.published_at}>{formatPostListDate(post.published_at)}</time>
      </span>
    {/if}
    <span class={`block font-sans text-base font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-indigo-300 sm:text-[1.05rem] ${recent ? 'truncate' : 'mt-1.5'}`}>
    {getPostTitle(post)}
    </span>
    {#if post.description}
      <span class={`mt-1.5 block text-sm leading-relaxed ${recent ? 'line-clamp-2 text-gray-400' : `text-gray-500 ${compact ? 'line-clamp-1' : 'line-clamp-2'}`}`}>
        {post.description}
      </span>
    {/if}
  </span>
  {#if recent}
    <span class="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] sm:pt-1">
      {#if showCategory}
        <span class="text-indigo-400">{getPostCategory(post.path)}</span>
        <span class="text-gray-700">/</span>
      {/if}
      <time class="text-gray-600" datetime={post.published_at}>{formatPostListDate(post.published_at)}</time>
    </span>
  {/if}
</a>
