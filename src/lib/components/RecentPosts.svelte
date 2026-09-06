<script lang="ts">
  import { pathWithBase, postHref } from '$lib/paths';
  import { formatPostListDate, getPostCategory, getPostListTitle } from '$lib/posts';
  import type { PostIndex } from '$lib/types';
  import LoadingPulse from './LoadingPulse.svelte';

  interface Props {
    posts: PostIndex[];
    loading?: boolean;
  }

  let { posts, loading = false }: Props = $props();
</script>

<section class="mx-auto w-full max-w-4xl" aria-labelledby="recent-posts-title">
  <div class="mb-2 flex items-end justify-between gap-4 border-b border-gray-800/80 pb-3">
    <h2 id="recent-posts-title" class="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-gray-300">
      Recent Posts
    </h2>
    <a href={pathWithBase('/posts')} class="text-xs font-medium uppercase tracking-[0.14em] text-gray-500 transition-colors hover:text-indigo-300">All Posts</a>
  </div>

  {#if loading}
    <LoadingPulse lines={5} compact={true} />
  {:else if posts.length > 0}
    <div class="divide-y divide-gray-800/60">
      {#each posts as post}
        <a href={postHref(post.path)} class="group grid gap-2 py-3 transition-colors hover:bg-white/[0.015] sm:grid-cols-[1fr_auto] sm:items-start">
          <span class="min-w-0">
            <span class="block truncate font-sans text-base font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-indigo-300 sm:text-[1.05rem]">
              {getPostListTitle(post)}
            </span>
            {#if post.description}
              <span class="mt-1.5 block line-clamp-2 text-sm leading-relaxed text-gray-400">{post.description}</span>
            {/if}
          </span>
          <span class="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] sm:pt-1">
            <span class="text-indigo-400">{getPostCategory(post.path)}</span>
            <span class="text-gray-700">/</span>
            <time class="text-gray-600" datetime={post.published_at}>{formatPostListDate(post.published_at)}</time>
          </span>
        </a>
      {/each}
    </div>
  {:else}
    <p class="py-5 text-sm text-gray-600">No posts found.</p>
  {/if}
</section>
