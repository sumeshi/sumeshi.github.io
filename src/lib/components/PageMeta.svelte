<script lang="ts">
  import { page } from '$app/stores';
  import {
    canonicalUrlForPath,
    siteAuthor,
    siteFeedUrl,
    siteName,
    siteOgImageUrl,
    siteUrl,
    xHandle,
  } from '$lib/site';

  interface Props {
    title: string;
    description: string;
    ogImage?: string;
    imageAlt?: string;
    ogType?: 'website' | 'article' | 'profile';
    publishedTime?: string;
    modifiedTime?: string;
    language?: 'en' | 'ja';
    languageAlternates?: Array<{ hreflang: string; href: string }>;
  }

  let {
    title,
    description,
    ogImage = siteOgImageUrl,
    imageAlt = `${siteName} social preview image`,
    ogType = 'website',
    publishedTime,
    modifiedTime,
    language = 'ja',
    languageAlternates = [],
  }: Props = $props();

  const canonicalUrl = $derived(canonicalUrlForPath($page.url.pathname));
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="canonical" href={canonicalUrl} />
  <link rel="sitemap" type="application/xml" href={`${siteUrl}/sitemap.xml`} />
  <link rel="alternate" type="application/rss+xml" title={`${siteName} Posts`} href={siteFeedUrl} />
  {#each languageAlternates as alternate (`${alternate.hreflang}-${alternate.href}`)}
    <link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
  {/each}
  <meta name="description" content={description} />
  <meta name="author" content={siteAuthor} />
  <meta name="robots" content="index, follow" />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:type" content={ogType} />
  <meta property="og:locale" content={language === 'en' ? 'en_US' : 'ja_JP'} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1920" />
  <meta property="og:image:height" content="1080" />
  <meta property="og:image:alt" content={imageAlt} />
  {#if ogType === 'article'}
    <meta property="article:author" content={siteAuthor} />
    {#if publishedTime}
      <meta property="article:published_time" content={publishedTime} />
    {/if}
    {#if modifiedTime}
      <meta property="article:modified_time" content={modifiedTime} />
    {/if}
  {/if}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={xHandle} />
  <meta name="twitter:creator" content={xHandle} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:image:alt" content={imageAlt} />
</svelte:head>
