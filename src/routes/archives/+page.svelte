<script lang="ts">
  import { getSiteLanguage, type SiteLanguage } from '#lib/site-language.ts';
  import Badge from '#lib/components/Badge.svelte';
  import PageMeta from '#lib/components/PageMeta.svelte';
  import { pageTitle } from '#lib/site.ts';

  const language = getSiteLanguage();
  const repositoryUrl = 'https://github.com/sumeshi/sipdep-archives';
  const description: Record<SiteLanguage, string> = {
    ja: 'デジタルフォレンジック・インシデント対応・セキュリティ研究に関するポスターや参考資料。',
    en: 'Posters and reference materials from SIPDEP on digital forensics, incident response, and security research.',
  };

  type Archive = {
    title: Record<SiteLanguage, string>;
    summary: Record<SiteLanguage, string>;
    imageUrl: string;
    imageAlt: Record<SiteLanguage, string>;
    hrefs: { label: string; url: string }[];
  };

  const archives: Archive[] = [
    {
      title: {
        ja: '君たちはどうWindowsイベントログを調査するか',
        en: 'How Do You Investigate Windows Event Logs?',
      },
      summary: {
        ja: 'フォレンジック調査・インシデント対応で参照する Windows イベント ID をまとめたポスター。',
        en: 'A quick reference to Windows Event IDs for forensic investigations and incident response.',
      },
      imageUrl: 'https://github.com/user-attachments/assets/b1484862-32d3-442c-bdc4-950d0be3c482',
      imageAlt: {
        ja: 'Windows イベントログ調査ポスターのプレビュー（英語版）',
        en: 'Preview of the Windows Event Log investigation poster (English version)',
      },
      hrefs: [
        { label: 'Download ja', url: `${repositoryUrl}/blob/main/posters/windows-eventlog-analysis-101-ja.pdf` },
        { label: 'Download en', url: `${repositoryUrl}/blob/main/posters/windows-eventlog-analysis-101-en.pdf` },
      ],
    },
  ];
</script>

<PageMeta
  language={$language}
  title={pageTitle('Archives')}
  description={description[$language]}
/>

<div class="site-container space-y-6">
  <header class="flex flex-col gap-3 border-b border-gray-800/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
    <div class="min-w-0">
      <h1 class="page-title break-words">$ tar cvfz archives.tar.gz *</h1>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
        {description[$language]}
      </p>
    </div>
    <Badge href={repositoryUrl} external={true} variant="gray" size="xs" shape="rounded" className="w-fit shrink-0 font-mono">
      GitHub ↗
    </Badge>
  </header>

  <section aria-label="Posters" class="divide-y divide-gray-800/60">
    {#each archives as archive}
      <article class="py-6 first:pt-1 sm:py-7">
        <p class="font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500">Poster / PDF</p>
        <div class="mt-2.5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <h2 class="min-w-0 font-sans text-base font-semibold leading-snug tracking-tight text-white sm:text-[1.05rem]">
            {archive.title[$language]}
          </h2>
          <div class="flex shrink-0 flex-wrap gap-1.5">
            {#each archive.hrefs as link}
              <Badge href={link.url} external={true} variant="gray" size="xs" shape="rounded" className="font-mono">
                {link.label}
              </Badge>
            {/each}
          </div>
        </div>
        <p class="mt-3 max-w-3xl text-sm leading-relaxed text-gray-400">{archive.summary[$language]}</p>
        <a
          href={archive.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="mt-5 block overflow-hidden rounded-lg border border-gray-800 transition-colors hover:border-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          <img src={archive.imageUrl} alt={archive.imageAlt[$language]} class="h-auto w-full" loading="lazy" decoding="async" />
        </a>
      </article>
    {/each}
  </section>
</div>
