<script lang="ts">
  import { asset } from '$app/paths';
  import { postHref } from '#lib/paths.ts';
  import { getPostCategory } from '#lib/posts.ts';
  import { findPostLinkMetadata, loadPostLinkMetadata, type PostLinkMetadata } from '#lib/link-preview-metadata.ts';
  import type { PostIndex } from '#lib/types.ts';
  import LinkPreview from './LinkPreview.svelte';

  interface Props {
    /** Internal post path, e.g. `/posts/malware/analysis-101` */
    path: string;
    /** Optional link text used in the markdown source */
    label?: string;
    /** Optional index data supplied by the page to avoid fetching it again. */
    posts?: PostIndex[];
  }

  let { path, label, posts }: Props = $props();
  let asyncMetadataState = $state<{
    status: 'idle' | 'loading' | 'loaded' | 'error';
    metadata: PostLinkMetadata | null;
  }>({ status: 'idle', metadata: null });

  const href = $derived.by(() => {
    const suffixIndex = path.search(/[?#]/);
    const pathname = suffixIndex === -1 ? path : path.slice(0, suffixIndex);
    const queryAndHash = suffixIndex === -1 ? '' : path.slice(suffixIndex);
    return `${postHref(pathname)}${queryAndHash}`;
  });
  const normalizedPath = $derived(path.split(/[?#]/, 1)[0]);
  const metadata = $derived(
    posts ? findPostLinkMetadata(normalizedPath, posts)
      : asyncMetadataState.status === 'loaded' ? asyncMetadataState.metadata : null,
  );
  const category = $derived(metadata?.category || getPostCategory(normalizedPath));
  const isUrlLabel = $derived(label ? /^https?:\/\//i.test(label) : false);
  const displayTitle = $derived((!isUrlLabel && label) || metadata?.title || path);

  $effect(() => {
    const requestedPath = path;
    const suppliedPosts = posts;
    let current = true;

    if (suppliedPosts) {
      asyncMetadataState = { status: 'idle', metadata: null };
      return;
    }

    asyncMetadataState = { status: 'loading', metadata: null };
    void loadPostLinkMetadata(requestedPath).then((loadedMetadata) => {
      if (current) asyncMetadataState = { status: 'loaded', metadata: loadedMetadata };
    }).catch((error: unknown) => {
      if (!current) return;
      console.error(error);
      asyncMetadataState = { status: 'error', metadata: null };
    });

    return () => { current = false; };
  });
</script>

<LinkPreview href={href}>
  <span class="flex shrink-0 items-center border-r border-gray-800 pr-3.5">
    <img
      src={asset('img/sipdep-wordmark.svg')}
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
    <span class="font-sans text-base font-semibold leading-relaxed text-white transition-colors group-hover:text-indigo-300">
      {displayTitle}
    </span>
    {#if metadata?.description}
      <span class="text-sm leading-snug text-gray-400">{metadata.description}</span>
    {/if}
    <span class="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] text-gray-500">
      <svg class="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
      <span class="truncate">sumeshi.github.io</span>
    </span>
  </span>
</LinkPreview>
