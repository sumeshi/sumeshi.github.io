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
    caption?: string;
    className?: string;
    children?: import('svelte').Snippet;
  }

  let {
    href,
    external = false,
    variant = 'indigo',
    size = 'xs',
    shape = 'pill',
    layout = 'inline',
    caption,
    className = '',
    children,
  }: Props = $props();

  const variantClasses: Record<Variant, string> = {
    indigo: 'border-indigo-400/20 bg-indigo-400/10 text-indigo-200 hover:border-indigo-300 hover:text-white',
    gray: 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500 hover:text-white',
    amber: 'border-amber-400/20 bg-amber-400/10 text-amber-200 hover:border-amber-300 hover:text-white',
    cyan: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200 hover:border-cyan-300 hover:text-white',
    green: 'border-green-400/20 bg-green-400/10 text-green-200 hover:border-green-300 hover:text-white',
    neutral: 'border-neutral-400/20 bg-neutral-400/10 text-neutral-200 hover:border-neutral-300 hover:text-white',
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
    card: 'flex w-full flex-col items-stretch rounded-lg px-1.5 py-2 text-center',
  };

  const baseClass = $derived(
    `${layoutClasses[layout]} border font-medium transition-colors ${variantClasses[variant]} ${layout === 'inline' ? `${sizeClasses[size]} ${shapeClasses[shape]}` : ''} ${className}`.trim()
  );
</script>

{#snippet body()}
  {#if layout === 'card'}
    <span class="font-sans text-[11px] font-semibold leading-tight sm:text-sm">
      {@render children?.()}
    </span>
    {#if caption}
      <span class="my-1 block h-px origin-center scale-y-50 bg-current opacity-40" aria-hidden="true"></span>
      <span class="text-[10px] font-normal uppercase leading-tight tracking-[0.12em] opacity-75">{caption}</span>
    {/if}
  {:else}
    {@render children?.()}
  {/if}
{/snippet}

{#if href}
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    class={baseClass}
  >
    {@render body()}
  </a>
{:else}
  <span class={baseClass}>
    {@render body()}
  </span>
{/if}
