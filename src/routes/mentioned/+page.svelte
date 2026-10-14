<script lang="ts">
  import PageMeta from '#lib/components/PageMeta.svelte';
  import { pathWithBase } from '#lib/paths.ts';
  import { pageTitle } from '#lib/site.ts';

  type Mention = {
    date: string;
    media: string;
    url: string;
    description?: string;
  };

  type MentionedArticle = {
    titleEn: string;
    titleJa: string;
    sourceEn?: string;
    sourceJa?: string;
    mentions: Mention[];
  };

  const articles: MentionedArticle[] = [
    {
      titleEn: 'NTFS Spinal Cord Sword',
      titleJa: 'NTFS脊髄剣',
      sourceEn: '/posts/works/ntfsfind-dump-en',
      sourceJa: '/posts/works/ntfsfind-dump',
      mentions: [
        {
          date: '2026-10-12',
          media: 'Forensic Focus / DFIR News, 12 Oct 2026',
          url: 'https://www.forensicfocus.com/news/headlines/dfir-news-12-oct-2026/',
        },
        {
          date: '2026-10-11',
          media: 'This Week in 4n6 / WEEK 41 - 2026',
          url: 'https://thisweekin4n6.com/2026/10/11/week-41-2026/',
        },
      ],
    },
    {
      titleEn: 'a tale of volatile memories.',
      titleJa: 'Windowsは世界に一人。だからWindowsは神様だ。',
      sourceEn: '/posts/knowledges/windows-memory-forensics-101-en',
      sourceJa: '/posts/knowledges/windows-memory-forensics-101',
      mentions: [
        {
          date: '2026-10-05',
          media: 'Forensic Focus / DFIR News, 05 Oct 2026',
          url: 'https://www.forensicfocus.com/news/headlines/dfir-news-05-oct-2026/',
        },
        {
          date: '2026-10-04',
          media: 'This Week in 4n6 / WEEK 40 - 2026',
          url: 'https://thisweekin4n6.com/2026/10/04/week-40-2026/',
        },
      ],
    },
    {
      titleEn: "Don't Make AI Your Forensic Analyst",
      titleJa: 'AIにフォレンジックさせるのをやめよう',
      sourceEn: '/posts/works/dont-make-ai-your-forensic-analyst-en',
      sourceJa: '/posts/works/dont-make-ai-your-forensic-analyst',
      mentions: [
        {
          date: '2026-09-17',
          media: 'CCE Intelligence Hub / CCE Technical Intelligence Briefing - Volume 15',
          url: 'https://intelligence.isfce.com/edition/volume-15-2026-09-17',
        },
        {
          date: '2026-09-06',
          media: 'This Week in 4n6 / WEEK 36 - 2026',
          url: 'https://thisweekin4n6.com/2026/09/06/week-36-2026/',
        },
      ],
    },
    {
      titleEn: 'Do Local LLMs Dream of Forensic Investigators?',
      titleJa: 'ローカルLLMはフォレンジック調査官の夢を見るか？',
      sourceEn: '/posts/works/do-localllms-dream-of-forensic-investigator-en',
      sourceJa: '/posts/works/do-localllms-dream-of-forensic-investigator',
      mentions: [
        {
          date: '2026-08-15',
          media: 'CTO at NCSC - Cyber Defence Analysis / Summary: week ending August 16th',
          url: 'https://ctoatncsc.substack.com/p/cto-at-ncsc-summary-week-ending-august-10c',
        },
      ],
    },
    {
      titleEn: 'How Do You Investigate Windows Event Logs?',
      titleJa: '君たちはどうWindowsイベントログを調査するか',
      sourceEn: '/posts/knowledges/windows-eventlog-analysis-101-en',
      sourceJa: '/posts/knowledges/windows-eventlog-analysis-101',
      mentions: [
        {
          date: '2026-10-12',
          media: 'Forensic Focus / DFIR News, 12 Oct 2026',
          url: 'https://www.forensicfocus.com/news/headlines/dfir-news-12-oct-2026/',
        },
        {
          date: '2026-10-11',
          media: 'This Week in 4n6 / WEEK 41 - 2026',
          url: 'https://thisweekin4n6.com/2026/10/11/week-41-2026/',
        },
        {
          date: '2026-10-03',
          media: 'CTO at NCSC - Cyber Defence Analysis / Summary: week ending October 4th',
          url: 'https://ctoatncsc.substack.com/p/cto-at-ncsc-summary-week-ending-october-8fd',
        },
        {
          date: '2026-09-28',
          media: 'Forensic Focus / DFIR News, 28 Sep 2026',
          url: 'https://www.forensicfocus.com/news/headlines/dfir-news-28-sep-2026/',
        },
        {
          date: '2026-09-06',
          media: 'This Week in 4n6 / WEEK 39 - 2026',
          url: 'https://thisweekin4n6.com/2026/09/27/week-39-2026/',
        },
      ],
    },
    {
      titleEn: '*2es/json',
      titleJa: 'Windows Forensic Artifact Parsers',
      sourceEn: '/works',
      sourceJa: '/works',
      mentions: [
        {
          date: '2026-04-16',
          media: 'DRIFT Linux',
          url: 'https://www.driftlinux.org/',
          description: 'evtx2json is included as a Windows Event Log analysis tool.',
        },
        {
          date: '2022-01-19',
          media: 'Tsurugi Linux [LAB]',
          url: 'https://tsurugi-linux.org/tsurugi_linux.php',
          description: 'evtx2es/json and mft2es/json are included for Windows Event Log and NTFS MFT analysis.',
        },
        {
          date: '2021-10-01',
          media: 'Security Onion',
          url: 'https://docs.securityonion.net/en/3/main/software-bill-of-materials/',
          description: 'evtx2es is integrated into the EVTX import workflow.',
        },
        {
          date: '2020-01-03',
          media: 'ELK Detection Lab',
          url: 'https://github.com/thomaspatzke/elk-detection-lab',
          description: 'evtx2es is used to import the EVTX-ATTACK-SAMPLES dataset.',
        },
      ],
    },
  ];

  const mentionCount = articles.reduce((count, article) => count + article.mentions.length, 0);
</script>

<PageMeta
  title={pageTitle('Mentioned')}
  description="S.Nakano の記事やプロジェクトについて、外部で紹介・言及いただいた記録。"
/>

<div class="site-container space-y-6">
  <header class="flex flex-col gap-3 border-b border-gray-800/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h1 class="page-title">$ locate</h1>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
        外部で言及された記事・プロジェクトについて。
      </p>
    </div>
    <p class="font-mono text-xs text-gray-600">{mentionCount} mentions</p>
  </header>

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
