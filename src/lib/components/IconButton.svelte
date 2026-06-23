<script lang="ts">
  type Variant = 'default' | 'brand';

  interface Props {
    href: string;
    label: string;
    external?: boolean;
    variant?: Variant;
    className?: string;
    title?: string;
    children?: import('svelte').Snippet;
  }

  let {
    href,
    label,
    external = false,
    variant = 'default',
    className = '',
    title,
    children,
  }: Props = $props();

  const variantClasses: Record<Variant, string> = {
    default:
      'bg-gray-950/70 border-gray-700 text-gray-300 hover:border-indigo-400 hover:text-white',
    brand:
      'bg-transparent border-transparent text-gray-500 hover:text-white',
  };

  const baseClass = $derived(
    `inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors sm:h-10 sm:w-10 ${variantClasses[variant]} ${className}`.trim(),
  );
</script>

<a
  href={href}
  target={external ? '_blank' : undefined}
  rel={external ? 'noopener noreferrer' : undefined}
  aria-label={label}
  title={title ?? label}
  class={baseClass}
>
  {@render children?.()}
</a>
