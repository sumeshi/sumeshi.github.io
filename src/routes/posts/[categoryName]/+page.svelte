<script lang="ts">
  import { getSiteLanguage, type SiteLanguage } from '#lib/site-language.ts';
  import { page } from '$app/state';
  import Breadcrumb from '#lib/components/Breadcrumb.svelte';
  import PageHeader from '#lib/components/PageHeader.svelte';
  import PostCollection from '#lib/components/PostCollection.svelte';
  import PageMeta from '#lib/components/PageMeta.svelte';
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
    <PageHeader
      title={categoryLabel}
      description={categoryDescription}
      meta={!postState.state.loading
        ? `${postState.state.value.length} post${postState.state.value.length !== 1 ? 's' : ''}`
        : undefined}
    />

    <PostCollection
      posts={postState.state.value}
      loading={postState.state.loading}
      errorMessage={postState.state.errorMessage}
      emptyMessage="No posts in this category."
      showCategory={false}
    />
  </section>
</div>
