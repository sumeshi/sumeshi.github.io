<script lang="ts">
  let { source }: { source: string } = $props();
  let svg = $state('');
  let failed = $state(false);

  $effect(() => {
    const diagramSource = source;
    let cancelled = false;
    svg = '';
    failed = false;

    async function render() {
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'strict',
          htmlLabels: false,
          suppressErrorRendering: true,
        });
        const result = await mermaid.render(`mermaid-${crypto.randomUUID()}`, diagramSource);

        if (!cancelled) svg = result.svg;
      } catch (error) {
        if (!cancelled) {
          failed = true;
          console.error('Failed to render Mermaid diagram:', error);
        }
      }
    }

    void render();
    return () => { cancelled = true; };
  });
</script>

<div class="my-6 max-w-full overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/40 p-4">
  {#if svg}
    {@html svg}
  {:else}
    {#if failed}
      <p class="mb-2 text-sm text-gray-400">Diagram could not be rendered.</p>
    {/if}
    <pre class="text-sm text-gray-300"><code>{source}</code></pre>
  {/if}
</div>
