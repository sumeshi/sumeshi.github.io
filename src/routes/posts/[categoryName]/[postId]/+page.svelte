<script lang="ts">
  import LoadingPulse from '$lib/components/LoadingPulse.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import LinkButton from '$lib/components/LinkButton.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import { page } from '$app/stores';
  import { untrack } from 'svelte';
  import { createAsyncDataState } from '$lib/load-state.svelte';
  import { pathWithBase } from '$lib/paths';
  import { formatPostPublishedAt, getPostTitle } from '$lib/posts';
  import {
    jsonLd,
    pageTitle,
    siteAuthor,
    siteBlogId,
    siteDescription,
    siteName,
    siteOgImageUrl,
    sitePersonId,
    siteUrl,
  } from '$lib/site';
  import { fetchPostContent, parsePostContent, postSourceUrl } from '$lib/post-content';
  import type { PostContent, ContentBlock, PostIndex } from '$lib/types';
  import type { PageData } from './$types';
  import 'highlight.js/styles/tokyo-night-dark.css';

  interface Props {
    data: PageData;
  }

  interface TableOfContentsItem {
    id: string;
    label: string;
    level: 2 | 3;
  }

  let { data }: Props = $props();

  const emptyPost: PostContent = {
    title: '',
    path: '',
    html_text: '',
    published_at: '',
  };

  function getPostDescription(post: PostContent | PostIndex): string {
    if ('description' in post && post.description) {
      return post.description;
    }

    if ('html_text' in post && typeof post.html_text === 'string' && post.html_text) {
      return post.html_text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150);
    }

    return siteDescription;
  }

  const initialPostContent = untrack(() => data.postContent);
  const initialContents = untrack(() => data.initialContents);
  const postState = createAsyncDataState<PostContent>(initialPostContent ?? { ...emptyPost });
  let contents: ContentBlock[] = $state(initialContents);
  let loadedRouteKey: string | null = $state(null);

  if (initialContents.length > 0) {
    postState.state.loading = false;
  }

  const categoryName = $derived($page.params.categoryName);
  const postId = $derived($page.params.postId);
  const loadedPost = $derived(data.post);
  const metaPost = $derived(loadedPost ?? postState.state.value);
  const postTitle = $derived(metaPost.title || metaPost.heading ? getPostTitle(metaPost) : '');
  const breadcrumbTitle = $derived(postId || postTitle || 'Post');
  const postDescription = $derived(getPostDescription(metaPost));
  const postLanguage = $derived(postId?.endsWith('-en') ? 'en' : 'ja');
  const alternateLanguage = $derived(postLanguage === 'en' ? 'ja' : 'en');
  const alternateVersion = $derived(
    data.languageAlternates.find((alternate) => alternate.hreflang === alternateLanguage),
  );
  const alternateVersionLabel = $derived(
    alternateLanguage === 'en' ? 'Read in English' : 'Read in Japanese',
  );

  function withoutMarkdownTitle(blocks: ContentBlock[]): ContentBlock[] {
    let titleRemoved = false;

    return blocks.map((block) => {
      if (titleRemoved || block.type !== 'text' || !/<h1\b/i.test(block.content)) {
        return block;
      }

      titleRemoved = true;
      return {
        ...block,
        content: block.content.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/i, '').trim(),
      };
    }).filter((block) => block.content);
  }

  function slugifyHeading(label: string): string {
    return label
      .normalize('NFKC')
      .toLocaleLowerCase()
      .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
      .replace(/^-+|-+$/g, '');
  }

  function headingLabel(html: string): string {
    const namedEntities: Record<string, string> = {
      amp: '&',
      apos: "'",
      gt: '>',
      lt: '<',
      nbsp: ' ',
      quot: '"',
    };

    return html
      .replace(/<[^>]+>/g, '')
      .replace(/&(#(?:x[\da-f]+|\d+)|[a-z]+);/gi, (entity, name: string) => {
        if (name.startsWith('#x') || name.startsWith('#X')) {
          return String.fromCodePoint(Number.parseInt(name.slice(2), 16));
        }

        if (name.startsWith('#')) {
          return String.fromCodePoint(Number.parseInt(name.slice(1), 10));
        }

        return namedEntities[name.toLowerCase()] ?? entity;
      })
      .trim()
      .replace(/\s+/g, ' ');
  }

  function buildArticle(blocks: ContentBlock[]): {
    contents: ContentBlock[];
    tableOfContents: TableOfContentsItem[];
  } {
    const tableOfContents: TableOfContentsItem[] = [];
    const usedIds = new Set<string>();
    let fallbackIndex = 0;

    const anchoredContents = withoutMarkdownTitle(blocks).map((block) => {
      if (block.type !== 'text') {
        return block;
      }

      const content = block.content.replace(
        /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
        (_match, levelText: string, attributes: string | undefined, innerHtml: string) => {
          const label = headingLabel(innerHtml);
          if (!label) {
            return _match;
          }

          const baseId = slugifyHeading(label) || `section-${++fallbackIndex}`;
          let id = baseId;
          let duplicateIndex = 2;

          while (usedIds.has(id)) {
            id = `${baseId}-${duplicateIndex++}`;
          }

          usedIds.add(id);
          const level = Number(levelText) as 2 | 3;
          tableOfContents.push({
            id,
            label,
            level,
          });

          return `<h${levelText}${attributes ?? ''} id="${id}">${innerHtml}</h${levelText}>`;
        },
      );

      return { ...block, content };
    });

    return { contents: anchoredContents, tableOfContents };
  }

  const article = $derived(buildArticle(contents));
  const articleContents = $derived(article.contents);
  const tableOfContents = $derived(article.tableOfContents);

  const postCanonicalUrl = $derived(
    categoryName && postId
      ? `${siteUrl}/posts/${encodeURIComponent(categoryName)}/${encodeURIComponent(postId)}`
      : siteUrl
  );
  const xShareUrl = $derived(
    postTitle
      ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}%20-%20SIPDEP&url=${encodeURIComponent(postCanonicalUrl)}`
      : '',
  );
  const postStructuredData = $derived(
    postTitle
      ? {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "@id": `${postCanonicalUrl}#article`,
              "headline": postTitle,
              "description": postDescription,
              "url": postCanonicalUrl,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": postCanonicalUrl
              },
              "image": siteOgImageUrl,
              "inLanguage": postLanguage,
              "datePublished": metaPost.published_at || undefined,
              "author": {
                "@type": "Person",
                "@id": sitePersonId,
                "name": siteAuthor,
                "url": siteUrl
              },
              "publisher": {
                "@type": "Person",
                "@id": sitePersonId,
                "name": siteAuthor,
                "url": siteUrl
              },
              "isPartOf": {
                "@type": "Blog",
                "@id": siteBlogId,
                "name": `${siteName} Posts`,
                "url": `${siteUrl}/posts`
              }
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${postCanonicalUrl}#breadcrumb`,
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
                  "name": categoryName,
                  "item": `${siteUrl}/posts/${encodeURIComponent(categoryName ?? '')}`
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": postTitle,
                  "item": postCanonicalUrl
                }
              ]
            }
          ]
        }
      : null
  );

  async function loadPost(category: string, id: string, signal: AbortSignal | undefined = undefined): Promise<void> {
    await postState.load((loadSignal) => fetchPostContent(category, id, loadSignal), {
      errorMessage: 'Failed to load this post.',
      onSuccess: async (data) => {
        contents = await parsePostContent(data.html_text);
      },
      onError: (error) => {
        console.error('Failed to fetch post:', error);
      },
    }, signal);
  }

  $effect(() => {
    if (!categoryName || !postId) {
      contents = [];
      postState.fail('Post not found.', { ...emptyPost });
      return;
    }

    const routeKey = `${categoryName}/${postId}`;
    const previousRouteKey = untrack(() => loadedRouteKey);

    if (previousRouteKey && previousRouteKey !== routeKey) {
      contents = data.initialContents;
      postState.reset(data.postContent ?? { ...emptyPost });

      if (contents.length > 0) {
        postState.state.loading = false;
      }
    }

    loadedRouteKey = routeKey;
    const controller = new AbortController();

    void loadPost(categoryName, postId, controller.signal);

    return () => controller.abort();
  });
</script>

<PageMeta
  title={pageTitle(postTitle || postId || 'Post')}
  description={postDescription}
  ogType="article"
  publishedTime={metaPost.published_at}
  language={postLanguage}
  languageAlternates={data.languageAlternates}
/>

<svelte:head>
  {#if postStructuredData}
    {@html `<script type="application/ld+json">${jsonLd(postStructuredData)}</script>`}
  {/if}
</svelte:head>

<div class="site-container post-layout">
  <article>
    <header class="flex flex-col gap-3">
      <Breadcrumb
        items={[
          { label: 'POSTS', href: pathWithBase('/posts') },
          { label: categoryName ?? '', href: pathWithBase(`/posts/${categoryName}`) },
          { label: breadcrumbTitle },
        ]}
        wrap={true}
      />
      <div class="flex flex-wrap items-center justify-end gap-2">
        {#if postTitle}
          <LinkButton
            href={xShareUrl}
            external={true}
            variant="x"
            className="order-2 gap-1.5 px-3 py-1.5 text-xs font-medium"
          >
            <svg class="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Share</span>
          </LinkButton>
        {/if}
        <IconButton
          href={postSourceUrl(categoryName ?? '', postId ?? '')}
          external={true}
          label="View source on GitHub"
          variant="brand"
          className="order-1"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </IconButton>
        {#if alternateVersion}
          <a
            href={alternateVersion.href}
            hreflang={alternateLanguage}
            rel="alternate"
            class="order-4 rounded-md border border-gray-800 bg-gray-950/30 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-gray-500 transition-colors hover:border-gray-600 hover:bg-gray-900/60 hover:text-indigo-300"
          >
            {alternateVersionLabel}
          </a>
        {/if}
      </div>
    </header>

    <div class="py-6">
      {#if postTitle}
        <div class="mb-7 flex flex-col gap-2 border-b border-gray-700 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <h1 class="min-w-0 font-sans text-2xl font-bold leading-tight tracking-tight text-white sm:text-[2rem]">
            {postTitle}
          </h1>
          {#if metaPost.published_at}
            <time
              class="shrink-0 font-mono text-[10px] text-gray-500 sm:pt-2"
              datetime={metaPost.published_at}
            >
              {formatPostPublishedAt(metaPost.published_at)}
            </time>
          {/if}
        </div>
      {/if}

      {#if articleContents.length > 0}
        {#each articleContents as block, index (`${block.type}-${index}`)}
          {#if block.type === 'text'}
            <div class="html-wrapper text-gray-300 text-sm leading-relaxed">
              {@html block.content}
            </div>
          {:else}
            <div class="code-block">
              <pre><code>{@html block.content}</code></pre>
            </div>
          {/if}
        {/each}
      {:else if postState.state.loading}
        <LoadingPulse lines={6} />
      {:else if postState.state.errorMessage}
        <p class="text-red-300 text-sm">{postState.state.errorMessage}</p>
      {:else}
        <p class="text-gray-600 text-sm">No content available.</p>
      {/if}
    </div>

    <footer class="mt-2 flex justify-center border-t border-gray-800/80 pt-5">
      <LinkButton
        href={pathWithBase('/posts')}
        variant="return"
        className="gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]"
      >
        <svg class="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 18l-6-6 6-6" />
        </svg>
        <span>All Posts</span>
      </LinkButton>
    </footer>
  </article>

  {#if articleContents.length > 0 && tableOfContents.length >= 2}
    <aside class="hidden min-w-0 pt-28 2xl:block">
      <nav
        class="sticky top-12 max-h-[calc(100vh-4rem)] overflow-y-auto border-l border-gray-800 pl-4"
        aria-label="Table of Contents"
      >
        <p class="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
          Table of Contents
        </p>
        <ol class="space-y-1">
          {#each tableOfContents as item}
            <li class:pl-3={item.level === 3}>
              <a
                href={`#${item.id}`}
                class="block text-[11px] leading-snug text-gray-600 transition-colors hover:text-indigo-300"
              >
                {item.label}
              </a>
            </li>
          {/each}
        </ol>
      </nav>
    </aside>
  {/if}
</div>
