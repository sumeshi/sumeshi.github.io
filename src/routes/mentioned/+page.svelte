<script lang="ts">
  import { getSiteLanguage } from '#lib/site-language.ts';
  import PageMeta from '#lib/components/PageMeta.svelte';
  import PageHeader from '#lib/components/PageHeader.svelte';
  import { pathWithBase } from '#lib/paths.ts';
  import { pageTitle } from '#lib/site.ts';
  import { articles } from '#lib/content/mentioned.ts';

  const language = getSiteLanguage();

  const mentionCount = articles.reduce((count, article) => count + article.mentions.length, 0);
</script>

<PageMeta
  language={$language}
  title={pageTitle('Mentioned')}
  description={$language === 'ja' ? 'S.Nakano の記事やプロジェクトについて、外部で紹介・言及いただいた記録。' : 'External mentions of articles and projects by S.Nakano.'}
/>

<div class="site-container space-y-6">
    <PageHeader title="$ locate" description={$language === 'ja' ? '外部で言及された記事・プロジェクトについて。' : 'Articles and projects mentioned by others.'} meta={`${mentionCount} mentions`} />

  <div class="space-y-10 sm:space-y-8">
    {#each articles as article}
      <section aria-label={`${article.titleEn} / ${article.titleJa}`} class="min-w-0 break-words">
        <h2 class="mb-4 leading-6">
          {#if article.sourceEn}
            <a href={pathWithBase(article.sourceEn)} class="block text-base font-semibold text-white transition-colors hover:text-indigo-300 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">{article.titleEn}</a>
          {:else}
            <span class="block text-base font-semibold text-white">{article.titleEn}</span>
          {/if}
          {#if article.sourceJa}
            <a href={pathWithBase(article.sourceJa)} class="mt-1 block w-fit text-xs font-normal leading-5 text-gray-500 transition-colors hover:text-indigo-300 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">{article.titleJa}</a>
          {:else}
            <span class="mt-1 block text-xs font-normal leading-5 text-gray-500">{article.titleJa}</span>
          {/if}
        </h2>
        <ul class="divide-y divide-gray-800/60 border-t border-gray-800/60">
          {#each article.mentions as mention}
            <li class="grid min-w-0 gap-x-5 gap-y-1.5 py-3.5 sm:grid-cols-[6rem_minmax(0,1fr)] sm:items-baseline sm:py-3">
              <time datetime={mention.date} class="whitespace-nowrap font-mono text-xs text-gray-500">{mention.date}</time>
              <div class="min-w-0">
                <a
                  href={mention.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-medium leading-6 text-indigo-300 transition-colors hover:text-indigo-200 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  {mention.media} ↗
                </a>
                {#if mention.description}
                  <p class="mt-1 text-xs leading-5 text-gray-400">{mention.description}</p>
                {/if}
              </div>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </div>
</div>
