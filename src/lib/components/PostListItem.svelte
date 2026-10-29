<script lang="ts">
  import { postHref } from '#lib/paths.ts';
  import { formatPostListDate, getPostCategory, getPostTitle } from '#lib/posts.ts';
  import type { PostIndex } from '#lib/types.ts';

  interface Props {
    post: PostIndex;
    showCategory?: boolean;
    compact?: boolean;
    stacked?: boolean;
  }

  let { post, showCategory = true, compact = false, stacked = false }: Props = $props();
</script>

<a
  href={postHref(post.path)}
  class={`group transition-colors hover:bg-white/[0.015] ${stacked ? 'block py-3.5' : `grid gap-x-6 gap-y-2 sm:grid-cols-[8rem_minmax(0,1fr)] sm:items-baseline ${compact ? 'py-4' : 'py-5'}`}`}
>
  <span class={`flex items-center ${stacked ? 'gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em]' : 'gap-3 text-xs sm:flex-col sm:items-start sm:gap-1.5'}`}>
    <time class={`text-gray-500 tabular-nums ${stacked ? 'order-2' : ''}`} datetime={post.published_at}>{formatPostListDate(post.published_at)}</time>
    {#if showCategory}
      <span class={`text-indigo-400 ${stacked ? '' : 'text-[11px]'}`}>{getPostCategory(post.path)}</span>
      {#if stacked}<span class="text-gray-700">/</span>{/if}
    {/if}
  </span>
  <span class="min-w-0">
    <span class={`block font-sans text-base font-semibold leading-relaxed text-white transition-colors group-hover:text-indigo-300 ${stacked ? 'mt-1.5' : ''}`}>
      {getPostTitle(post)}
    </span>
    {#if post.description}
      <span class={`mt-1.5 block text-sm leading-relaxed text-gray-400 ${compact ? 'line-clamp-1' : 'line-clamp-2'}`}>
        {post.description}
      </span>
    {/if}
  </span>
</a>
