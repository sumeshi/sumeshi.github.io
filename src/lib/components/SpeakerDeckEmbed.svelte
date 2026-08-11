<script lang="ts">
  interface Props {
    /** Speaker Deck presentation id (hex from embed / files.speakerdeck.com path) */
    id: string;
    title?: string;
    /** aspect ratio width/height, default 16:9 */
    ratio?: number;
    className?: string;
  }

  let {
    id,
    title = 'Speaker Deck presentation',
    ratio = 16 / 9,
    className = '',
  }: Props = $props();

  const src = $derived(`https://speakerdeck.com/player/${id}`);
</script>

<div
  class={`overflow-hidden rounded-lg border border-gray-700/80 bg-gray-950/40 shadow-lg ${className}`.trim()}
  style={`aspect-ratio: ${ratio};`}
>
  <iframe
    class="h-full w-full border-0"
    src={src}
    title={title}
    allow="fullscreen"
    allowfullscreen
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
  ></iframe>
</div>
