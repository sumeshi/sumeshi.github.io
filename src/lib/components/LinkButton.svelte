<script lang="ts">
  type Variant = 'default' | 'x' | 'return';

  interface Props {
    href: string;
    external?: boolean;
    variant?: Variant;
    className?: string;
    children?: import('svelte').Snippet;
  }

  let {
    href,
    external = false,
    variant = 'default',
    className = '',
    children,
  }: Props = $props();

  const variantClasses: Record<Variant, string> = {
    default:
      'border border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white',
    x:
      'border border-white/10 bg-black text-white hover:border-white/25 hover:bg-neutral-950',
    return:
      'border border-indigo-400/20 bg-indigo-400/10 text-indigo-100 hover:border-indigo-300/40 hover:bg-indigo-400/15 hover:text-white shadow-[0_0_0_1px_rgba(99,102,241,0.08)]',
  };

  const baseClass = $derived(
    `inline-flex items-center justify-center rounded-md px-5 py-2 text-sm transition-colors ${variantClasses[variant]} ${className}`.trim(),
  );
</script>

<a
  href={href}
  target={external ? '_blank' : undefined}
  rel={external ? 'noopener noreferrer' : undefined}
  class={baseClass}
>
  {@render children?.()}
</a>
