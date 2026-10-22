<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    href: string;
    class?: string;
    children: Snippet;
  }

  let { href, class: className = '', children }: Props = $props();
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  class={`group my-5 flex gap-3.5 rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3.5 transition-colors hover:border-indigo-400/40 hover:bg-indigo-950/20 ${className}`}
>
  {@render children()}
</a>
