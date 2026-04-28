<script lang="ts">
  import { page } from '$app/stores';
  import { siteUrl } from '$lib/site';

  interface Props {
    title: string;
    description: string;
    ogImage?: string;
  }

  let { title, description, ogImage = `${siteUrl}/img/card.png` }: Props = $props();

  const canonicalUrl = $derived($page.url.href);
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="canonical" href={canonicalUrl} />
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={ogImage} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>
