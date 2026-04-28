<script lang="ts">
  interface Props {
    lines?: number;
    compact?: boolean;
    tone?: 'subtle' | 'muted';
  }

  let { lines = 3, compact = false, tone = 'subtle' }: Props = $props();

</script>

<div class={`animate-pulse space-y-2 ${compact ? 'py-1' : 'py-2'}`} aria-hidden="true">
  {#each Array.from({ length: lines }) as _, index}
    <div
      class={`rounded-md ${tone === 'muted' ? 'bg-gray-800/80' : 'bg-white/6'} ${compact ? 'h-4' : 'h-5'} ${index === lines - 1 ? 'w-2/3' : 'w-full'}`}
    ></div>
  {/each}
</div>

<p class="sr-only">Loading content</p>
