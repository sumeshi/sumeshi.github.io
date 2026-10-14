<script lang="ts">
  import { getSiteLanguage, type SiteLanguage } from '#lib/site-language.ts';
  import Badge from '#lib/components/Badge.svelte';
  import PageMeta from '#lib/components/PageMeta.svelte';
  import SpeakerDeckEmbed from '#lib/components/SpeakerDeckEmbed.svelte';
  import { pageTitle } from '#lib/site.ts';

  const language = getSiteLanguage();

  type Slide = {
    title: string;
    speakerDeckId: string;
    speakerDeckUrl: string;
  };

  type Talk = {
    title: Record<SiteLanguage, string>;
    event?: Record<SiteLanguage, string>;
    date: string;
    hrefs: { label: string; url: string }[];
    summary: Array<Record<SiteLanguage, string>>;
    /** 先頭をデフォルト表示、2枚目以降は + で展開 */
    slides: Slide[];
  };

  const talks: Talk[] = [
    {
      title: { ja: "【実施予定】ローカルLLMによるデジタルフォレンジック支援ハーネスの設計と実装", en: "[Upcoming] Designing and implementing a local LLM harness for digital forensics" },
      event: { ja: "IDF 「AI」分科会（第23期第3回）", en: "IDF AI Subcommittee (23rd term, 3rd meeting)" },
      date: '2026-11-25',
      hrefs: [
        { label: 'IDF', url: 'https://digitalforensic.jp/2026/09/15/ai23-3/' },
      ],
      summary: [
        { ja: "ローカルLLMの特徴と制約、自律的なAIエージェントを支える概念の紹介。", en: "An introduction to the capabilities and limitations of local LLMs and the concepts behind autonomous AI agents." },
        { ja: "これをデジタルフォレンジックに適用するために求められる要件、設計思想、実装についての解説。", en: "Requirements, design principles, and implementation for applying these concepts to digital forensics." },
      ],
      slides: [],
    },
    {
      title: { ja: "FORENSIA: ローカルLLMフォレンジックハーネス", en: "FORENSIA: Local LLM Forensic Harness" },
      event: { ja: "IDF 若手活動WG 技術交流会LT", en: "IDF Young Professionals Working Group lightning talk" },
      date: '2026-08-07',
      hrefs: [
        { label: 'IDF', url: 'https://digitalforensic.jp/2026/06/16/nextgen-wg-23-1/' },
      ],
      summary: [
        { ja: "ローカルLLMでフォレンジック調査を支援するツール「FORENSIA」の設計思想と実装知見。", en: "Design principles and implementation lessons from FORENSIA, a tool that assists forensic investigations with local LLMs." },
        { ja: "弱いモデルを部品として使うためのハーネス設計（仮説検証ループ・記憶の構造化）について。", en: "Harness design for using weaker models as components, including hypothesis-testing loops and structured memory." },
      ],
      slides: [
        {
          title: 'FORENSIA: ローカルLLMフォレンジックハーネス',
          speakerDeckId: '4c6fd93396a44b799bdc0264ca38e03c',
          speakerDeckUrl: 'https://speakerdeck.com/sumeshi/forensia-rokarullmhuorenzitukuhanesu',
        },
        {
          title: 'FORENSIA: Local LLM Forensic Harness',
          speakerDeckId: '7074cedd400540dfafe8045b45603c6f',
          speakerDeckUrl: 'https://speakerdeck.com/sumeshi/forensia-local-llm-forensic-harness',
        },
      ],
    },
  ];

  function primarySlide(talk: Talk): Slide | undefined {
    return talk.slides[$language === 'en' && talk.slides.length > 1 ? 1 : 0];
  }

  function extraSlides(talk: Talk): Slide[] {
    return talk.slides.filter((slide) => slide !== primarySlide(talk));
  }
</script>

{#snippet slideBlock(slide: Slide)}
  {#if slide.speakerDeckId}
    <SpeakerDeckEmbed id={slide.speakerDeckId} title={slide.title} />
  {:else}
    <div class="rounded-lg border border-dashed border-gray-700/90 bg-gray-950/25 px-4 py-8 text-center">
      <p class="font-mono text-xs uppercase tracking-[0.16em] text-gray-500">embed placeholder</p>
      <p class="mt-1 text-sm text-gray-400">{slide.title}</p>
      <a
        href={slide.speakerDeckUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="mt-2 inline-block text-sm text-indigo-300 transition-colors hover:text-indigo-200"
      >
        Open on Speaker Deck ↗
      </a>
    </div>
  {/if}
{/snippet}

<PageMeta
  language={$language}
  title={pageTitle('Talks')}
  description={$language === 'ja' ? '登壇資料・スライドの一覧。' : 'Talks, lightning talks, and presentation slides.'}
/>

<div class="site-container space-y-6">
  <header class="flex flex-col gap-3 border-b border-gray-800/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h1 class="page-title">$ wall</h1>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
        {$language === 'ja' ? '登壇・LT など。' : 'Talks and lightning talks.'}
      </p>
    </div>
    <p class="font-mono text-xs text-gray-600">{talks.length} entries</p>
  </header>

  <section class="divide-y divide-gray-800/60">
    {#each talks as talk}
      {@const primary = primarySlide(talk)}
      {@const extras = extraSlides(talk)}
      <article class="py-6 first:pt-1 sm:py-7">
        <div class="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500">
          <time datetime={talk.date}>{talk.date}</time>
          {#if talk.event}
            <span class="normal-case tracking-normal text-gray-600">{talk.event[$language]}</span>
          {/if}
        </div>

        <div class="mt-2.5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <h2 class="min-w-0 font-sans text-base font-semibold leading-snug tracking-tight text-white sm:text-[1.05rem]">
            {talk.title[$language]}
          </h2>

          {#if talk.hrefs.length > 0}
            <div class="flex shrink-0 flex-wrap gap-1.5 sm:max-w-[42%] sm:justify-end">
              {#each talk.hrefs as link}
                <Badge href={link.url} external={true} variant="gray" size="xs" shape="rounded" className="font-mono">
                  {link.label}
                </Badge>
              {/each}
            </div>
          {/if}
        </div>

        {#if talk.summary.length > 0}
          <div class="mt-3 max-w-3xl space-y-1.5 text-sm leading-relaxed text-gray-400">
            {#each talk.summary as line}
              <p>{line[$language]}</p>
            {/each}
          </div>
        {/if}

        {#if primary}
          <div class="mt-5">
            {@render slideBlock(primary)}
          </div>
        {/if}

        {#if extras.length > 0}
          <details class="mt-4 rounded-lg border border-gray-800 bg-gray-950/20 transition-colors open:border-gray-700 hover:border-gray-700">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-3.5 py-2.5 text-xs text-gray-300 marker:hidden">
              <span class="font-medium tracking-wide">{$language === 'ja' ? 'English Version' : 'Japanese Version'}</span>
              <span class="rounded-full border border-gray-700 bg-gray-950/70 px-1.5 py-0.5 font-mono text-[10px] text-gray-400 transition-transform details-open:rotate-45">+</span>
            </summary>
            <div class="space-y-6 border-t border-gray-800/80 px-3.5 py-4">
              {#each extras as slide}
                <div class="space-y-2">
                  <p class="font-mono text-[10px] tracking-[0.12em] text-gray-500">{slide.title}</p>
                  {@render slideBlock(slide)}
                </div>
              {/each}
            </div>
          </details>
        {/if}
      </article>
    {/each}
  </section>
</div>
