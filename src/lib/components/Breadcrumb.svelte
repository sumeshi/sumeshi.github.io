<script lang="ts">
  interface BreadcrumbItem {
    label: string;
    href?: string;
  }

  interface Props {
    items: BreadcrumbItem[];
    wrap?: boolean;
  }

  let { items, wrap = false }: Props = $props();
</script>

<nav class="font-mono text-xs text-gray-500" aria-label="Breadcrumb">
  <div class={`flex min-w-0 items-center gap-y-1 ${wrap ? 'flex-wrap' : ''}`}>
    {#each items as item, index (item.href ?? `${item.label}-${index}`)}
      {#if index > 0}
        <span class="mx-1">/</span>
      {/if}

      {#if item.href}
        <a href={item.href} class="truncate transition-colors hover:text-gray-300">{item.label}</a>
      {:else}
        <span class="truncate text-gray-400">{item.label}</span>
      {/if}
    {/each}
  </div>
</nav>
