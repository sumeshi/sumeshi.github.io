<script lang="ts">
  type Variant = 'indigo' | 'gray' | 'amber' | 'cyan' | 'green' | 'neutral';
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
    card: 'group flex min-h-[64px] w-full flex-col justify-between rounded-lg px-3 py-3 text-left',
  };

  const baseClass = $derived(
    `${layoutClasses[layout]} border font-medium transition-colors ${variantClasses[variant]} ${layout === 'inline' ? `${sizeClasses[size]} ${shapeClasses[shape]}` : ''} ${className}`.trim()
  );
</script>

{#if href}
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    class={baseClass}
  >
    {#if layout === 'card'}
      <span class="flex items-end justify-between gap-3">
        <span class="flex items-center gap-1.5">
          {#if icon}
            <span class="shrink-0">{@render icon()}</span>
          {/if}
          <span class="text-base font-semibold leading-tight">
            {@render children?.()}
          </span>
        </span>
        <span class="text-xs opacity-70 transition-transform group-hover:translate-x-0.5">{trailing ?? '↗'}</span>
      </span>
      <span class="text-[10px] uppercase tracking-[0.14em] opacity-70">{meta}</span>
    {:else}
      {@render children?.()}
    {/if}
  </a>
{:else}
  <span class={baseClass}>
    {#if layout === 'card'}
      <span class="flex items-end justify-between gap-3">
        <span class="flex items-center gap-1.5">
          {#if icon}
            <span class="shrink-0">{@render icon()}</span>
          {/if}
          <span class="text-base font-semibold leading-tight">
            {@render children?.()}
          </span>
        </span>
        <span class="text-xs opacity-70">{trailing ?? '↗'}</span>
      </span>
      <span class="text-[10px] uppercase tracking-[0.14em] opacity-70">{meta}</span>
    {:else}
      {@render children?.()}
    {/if}
  </span>
{/if}
