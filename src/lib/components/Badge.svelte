<script lang="ts">
  type Variant =
    | 'indigo'
    | 'gray'
    | 'amber'
    | 'cyan'
    | 'green'
    | 'neutral'
    | 'sky'
    | 'teal'
    | 'lime'
    | 'emerald';
  type Size = 'xs' | 'sm';
  type Shape = 'rounded' | 'pill';
  type Layout = 'inline' | 'card';

  interface Props {
    href?: string;
    external?: boolean;
    variant?: Variant;
    size?: Size;
    shape?: Shape;
    layout?: Layout;
    meta?: string;
    trailing?: string;
    className?: string;
    children?: import('svelte').Snippet;
    icon?: import('svelte').Snippet;
  }

  let {
    href,
    external = false,
    variant = 'indigo',
    size = 'xs',
    shape = 'pill',
    layout = 'inline',
    meta,
    trailing,
    className = '',
    children,
    icon,
  }: Props = $props();

  const variantClasses: Record<Variant, string> = {
    indigo: 'border-indigo-400/20 bg-indigo-400/10 text-indigo-200 hover:border-indigo-300 hover:text-white',
    gray: 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500 hover:text-white',
    amber: 'border-amber-400/20 bg-amber-400/10 text-amber-200 hover:border-amber-300 hover:text-white',
    cyan: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200 hover:border-cyan-300 hover:text-white',
    green: 'border-green-400/20 bg-green-400/10 text-green-200 hover:border-green-300 hover:text-white',
    neutral: 'border-neutral-400/20 bg-neutral-400/10 text-neutral-200 hover:border-neutral-300 hover:text-white',
    // service-ish tones (Zenn / Note / Qiita / Speaker Deck)
    sky: 'border-sky-400/25 bg-sky-400/10 text-sky-200 hover:border-sky-300 hover:text-white',
    teal: 'border-teal-400/25 bg-teal-400/10 text-teal-200 hover:border-teal-300 hover:text-white',
    lime: 'border-lime-400/25 bg-lime-400/10 text-lime-200 hover:border-lime-300 hover:text-white',
    emerald: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200 hover:border-emerald-300 hover:text-white',
  };

  const sizeClasses: Record<Size, string> = {
    xs: 'px-2.5 py-1 text-xs',
    sm: 'px-3 py-1 text-xs',
  };

  const shapeClasses: Record<Shape, string> = {
    rounded: 'rounded',
    pill: 'rounded-full',
  };

  const layoutClasses: Record<Layout, string> = {
    inline: 'inline-flex items-center',
    card: 'group flex w-full rounded-lg px-3 py-2.5 text-left',
  };

  const baseClass = $derived(
    `${layoutClasses[layout]} border font-medium transition-colors ${variantClasses[variant]} ${layout === 'inline' ? `${sizeClasses[size]} ${shapeClasses[shape]}` : ''} ${className}`.trim()
  );
</script>

{#snippet cardBody()}
  <span class="flex w-full items-start gap-2.5">
    {#if icon}
      <span class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-black/20 text-current">
        {@render icon()}
      </span>
    {/if}
    <span class="min-w-0 flex-1">
      <span class="flex items-baseline justify-between gap-2">
        <span class="truncate font-sans text-[0.9375rem] font-semibold leading-snug tracking-tight">
          {@render children?.()}
        </span>
        <span class="shrink-0 font-mono text-[10px] leading-none opacity-45 transition-transform group-hover:translate-x-0.5 group-hover:opacity-70">
          {trailing ?? '↗'}
        </span>
      </span>
      {#if meta}
        <span class="mt-1 block font-mono text-[10px] uppercase leading-none tracking-[0.16em] opacity-55">
          {meta}
        </span>
      {/if}
    </span>
  </span>
{/snippet}

{#if href}
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    class={baseClass}
  >
    {#if layout === 'card'}
      {@render cardBody()}
    {:else}
      {@render children?.()}
    {/if}
  </a>
{:else}
  <span class={baseClass}>
    {#if layout === 'card'}
      {@render cardBody()}
    {:else}
      {@render children?.()}
    {/if}
  </span>
{/if}
