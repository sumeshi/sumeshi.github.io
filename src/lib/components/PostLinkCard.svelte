<script lang="ts">
  import { base } from '$app/paths';
  import { postHref } from '$lib/paths';
  import { fetchPosts, getPostCategory, getPostTitle } from '$lib/posts';
  import type { PostIndex } from '$lib/types';

  interface Props {
    /** Internal post path, e.g. `/posts/malware/analysis-101` */
    path: string;
    /** Optional link text used in the markdown source */
    label?: string;
  }

  let { path, label }: Props = $props();

  let postIndexCache: Promise<PostIndex[]> | null = null;

  function loadPostIndex(): Promise<PostIndex[]> {
    postIndexCache ??= fetchPosts();
    return postIndexCache;
  }

  const href = $derived(postHref(path));
  const category = $derived(getPostCategory(path));
  const normalizedPath = $derived(path.trim().replace(/^\/+|\/+$/g, '').replace(/^posts\//, ''));

  let metaState = $state<{
    status: 'loading' | 'loaded' | 'error';
    title: string | null;
    description: string | null;
  }>({
    status: 'loading',
    title: null,
    description: null,
  });

  $effect(() => {
    const controller = new AbortController();
    metaState = { status: 'loading', title: null, description: null };

    loadPostIndex()
      .then((posts) => {
        if (controller.signal.aborted) {
          return;
        }

        const post = posts.find((candidate) => {
          const candidatePath = candidate.path.trim().replace(/^\/+|\/+$/g, '').replace(/^posts\//, '');
          return candidatePath === normalizedPath;
        });

        metaState = post
          ? {
              status: 'loaded',
              title: getPostTitle(post),
              description: post.description || null,
            }
          : { status: 'error', title: null, description: null };
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        console.error(error);
        metaState = { status: 'error', title: null, description: null };
      });

    return () => controller.abort();
  });

  const isUrlLabel = $derived(label ? /^https?:\/\//i.test(label) : false);
  const displayTitle = $derived(
    (!isUrlLabel && label) || metaState.title || path,
  );
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  class="group my-5 flex gap-3.5 rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3.5 transition-colors hover:border-indigo-400/40 hover:bg-indigo-950/20"
>
  <span class="flex shrink-0 items-center border-r border-gray-800 pr-3.5">
    <img
      src={`${base}/img/sipdep-wordmark.svg`}
      alt=""
      aria-hidden="true"
      width="1460"
      height="235"
      draggable="false"
      loading="lazy"
      class="h-3.5 w-auto opacity-70 transition-opacity group-hover:opacity-100"
    />
  </span>
  <span class="flex min-w-0 flex-col gap-1">
    <span class="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-indigo-400">
      {category}
    </span>
    <span class="font-sans text-base font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-indigo-300">
      {displayTitle}
    </span>
    {#if metaState.status === 'loaded' && metaState.description}
      <span class="text-sm leading-snug text-gray-400">
        {metaState.description}
      </span>
    {/if}
    <span class="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] text-gray-500">
      <svg class="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
      <span class="truncate">sumeshi.github.io</span>
    </span>
  </span>
</a>
