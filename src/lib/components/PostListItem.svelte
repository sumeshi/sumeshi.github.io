<script lang="ts">
  import { postHref } from '$lib/paths';
  import { formatPostListDate, getPostListTitle } from '$lib/posts';
  import type { PostIndex } from '$lib/types';

  interface Props {
    post: PostIndex;
  }

  let { post }: Props = $props();
</script>

<a
  href={postHref(post.path)}
  class="group grid gap-2 border-b border-gray-800/70 py-4 transition-colors hover:bg-white/[0.015] sm:grid-cols-[1fr_auto] sm:items-start"
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
