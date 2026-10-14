<script lang="ts">
  import { getSiteLanguage, type SiteLanguage } from '#lib/site-language.ts';
  import { page } from '$app/state';
  import Breadcrumb from '#lib/components/Breadcrumb.svelte';
  import LoadingPulse from '#lib/components/LoadingPulse.svelte';
  import PageMeta from '#lib/components/PageMeta.svelte';
  import PostListItem from '#lib/components/PostListItem.svelte';
  import { pathWithBase } from '#lib/paths.ts';
  import { createPostListState } from '#lib/post-list-state.svelte.ts';
  import { fetchCategoryPosts } from '#lib/posts.ts';
  import { untrack } from 'svelte';
  import { jsonLd, pageTitle, siteBlogId, siteName, siteUrl } from '#lib/site.ts';
  import type { PageData } from './$types';

  const language = getSiteLanguage();

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  const categoryDescriptions: Record<string, Record<SiteLanguage, string>> = {
    ideas: { ja: "今後の計画、進行中のプロジェクト、検討中のアイデアについてのメモ。", en: "Notes on future plans, ongoing projects, and ideas currently being explored." },
    knowledges: { ja: "デジタルフォレンジック、セキュリティ、コンピューティングの実践と研究から得た知見や考察。", en: "Original findings, practical insights, and personal perspectives developed through hands-on work and research in digital forensics, cybersecurity, and computing." },
    tools: { ja: "セキュリティ研究やソフトウェア開発で使うツールの使い方や実践的なメモ。", en: "Usage notes and practical guides for third-party tools used in security research and software development." },
    works: { ja: "自作ソフトウェア、技術的な実験、OSSやフォレンジック関連プロジェクトの設計について。", en: "Articles on software I build, technical experiments, and the design ideas behind my open-source and digital forensics projects." },
  };
  const categoryName = $derived(page.params.categoryName);
  const categoryLabel = $derived(categoryName ?? 'unknown');
  const categoryDescription = $derived(
    categoryDescriptions[categoryLabel]?.[$language] ?? ($language === 'ja' ? `${categoryLabel} の投稿一覧。` : `Posts filed under ${categoryLabel}.`),
  );
  const categoryUrl = $derived(`${siteUrl}/posts/${encodeURIComponent(categoryLabel)}`);
  const postState = createPostListState({
    errorMessage: 'Failed to load posts for this category.',
    notFoundMessage: 'Category not found.',
    initialValue: untrack(() => data.posts),
    getRequest: () => categoryName ? ((signal: AbortSignal | undefined = undefined) => fetchCategoryPosts(categoryName, signal)) : null,
    onError: (error) => {
      console.error('Failed to fetch category posts:', error);
    },
  });
</script>

<PageMeta
  language={$language}
  title={pageTitle(`${categoryLabel} | Posts`)}
  description={categoryDescription}
/>

<svelte:head>
  {@html `<script type="application/ld+json">${jsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": categoryUrl,
        "name": `${categoryLabel} | Posts | ${siteName}`,
        "description": categoryDescription,
        "inLanguage": $language,
        "url": categoryUrl,
        "isPartOf": { "@id": siteBlogId }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${categoryUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${siteUrl}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Posts",
            "item": `${siteUrl}/posts`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": categoryLabel,
            "item": categoryUrl
          }
        ]
      }
    ]
  })}</script>`}
</svelte:head>

<div class="site-container space-y-5">
  <Breadcrumb items={[{ label: 'POSTS', href: pathWithBase('/posts') }, { label: categoryLabel }]} />

  <section>
    <div class="mb-2 flex items-baseline justify-between border-b border-gray-800/80 pb-4">
      <h1 class="page-title">{categoryLabel}</h1>
      {#if !postState.state.loading}
        <span class="text-gray-500 text-sm">{postState.state.value.length} post{postState.state.value.length !== 1 ? 's' : ''}</span>
      {/if}
    </div>
    <p class="mb-5 max-w-3xl text-sm leading-6 text-gray-400">{categoryDescription}</p>

    {#if postState.state.loading}
      <LoadingPulse lines={4} />
    {:else if postState.state.errorMessage}
      <p class="text-red-300 text-sm">{postState.state.errorMessage}</p>
    {:else if postState.state.value.length === 0}
      <p class="text-gray-600 text-sm">No posts in this category.</p>
    {:else}
      <div class="divide-y divide-gray-800/60">
        {#each postState.state.value as post}
          <PostListItem {post} showCategory={false} />
        {/each}
      </div>
    {/if}
  </section>
</div>
