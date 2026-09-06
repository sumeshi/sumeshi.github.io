<script lang="ts">
  import { postHref } from '$lib/paths';
  import { formatPostListDate, getPostCategory, getPostListTitle } from '$lib/posts';
  import type { PostIndex } from '$lib/types';

  interface Props {
    post: PostIndex;
    showCategory?: boolean;
  }

  let { post, showCategory = true }: Props = $props();
</script>

<a
  href={postHref(post.path)}
  class="group block py-3.5 transition-colors hover:bg-white/[0.015]"
>
  <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
    <div class="min-w-0">
      <span class="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em]">
        {#if showCategory}
          <span class="text-indigo-400">{getPostCategory(post.path)}</span>
          <span class="text-gray-700">/</span>
        {/if}
        <time class="text-gray-500" datetime={post.published_at}>
          {formatPostListDate(post.published_at)}
        </time>
      </span>
      <span class="mt-1.5 block font-sans text-base font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-indigo-300 sm:text-[1.05rem]">
        {getPostListTitle(post)}
      </span>
      {#if post.description}
        <span class="mt-1.5 block line-clamp-2 text-sm leading-relaxed text-gray-500">
          {post.description}
        </span>
      {/if}
    </div>
  </div>
</a>
