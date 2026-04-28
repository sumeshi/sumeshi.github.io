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
  class="block group rounded-lg border border-gray-800 p-4 transition-colors hover:border-gray-600"
>
  <div class="flex items-start justify-between gap-4">
    <h3 class="line-clamp-1 text-sm font-medium text-gray-200 transition-colors group-hover:text-indigo-400">
      {getPostListTitle(post)}
    </h3>
    <span class="shrink-0 whitespace-nowrap text-xs text-gray-600">
      {formatPostListDate(post.published_at)}
    </span>
  </div>
  {#if post.description}
    <p class="mt-1 line-clamp-2 text-xs text-gray-500">{post.description}</p>
  {/if}
</a>
