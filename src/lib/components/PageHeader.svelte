<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    title: string;
    description: string;
    meta?: string;
    action?: Snippet;
  };

  let { title, description, meta, action }: Props = $props();
</script>

<header class="flex flex-col gap-3 border-b border-gray-800/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
  <div class="min-w-0">
    <h1 class="page-title break-words">{title}</h1>
    <p class="mt-3 max-w-2xl text-sm leading-6 text-gray-400">{description}</p>
  </div>
  {#if action}
    {@render action()}
  {:else if meta}
    <p class="font-mono text-xs text-gray-600">{meta}</p>
  {/if}
</header>
