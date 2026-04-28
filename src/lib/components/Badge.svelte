<script lang="ts">
  type Variant = 'indigo' | 'gray' | 'amber' | 'cyan' | 'green' | 'neutral';
  type Size = 'xs' | 'sm';
  type Shape = 'rounded' | 'pill';

  interface Props {
    href?: string;
    external?: boolean;
    variant?: Variant;
    size?: Size;
    shape?: Shape;
    className?: string;
    children?: import('svelte').Snippet;
  }

  let {
    href,
    external = false,
    variant = 'indigo',
    size = 'xs',
    shape = 'pill',
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
  };

  const sizeClasses: Record<Size, string> = {
    xs: 'px-2.5 py-1 text-xs',
    sm: 'px-3 py-1 text-xs',
  };

  const shapeClasses: Record<Shape, string> = {
    rounded: 'rounded',
    pill: 'rounded-full',
  };

  const baseClass = $derived(
    `inline-flex items-center border font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${shapeClasses[shape]} ${className}`.trim()
  );
</script>

{#if href}
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    class={baseClass}
  >
    {@render children?.()}
  </a>
{:else}
  <span class={baseClass}>
    {@render children?.()}
  </span>
{/if}
