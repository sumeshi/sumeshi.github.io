<script lang="ts">
  import Badge from '$lib/components/Badge.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import SpeakerDeckEmbed from '$lib/components/SpeakerDeckEmbed.svelte';
  import { pageTitle } from '$lib/site';

  type Slide = {
    title: string;
    speakerDeckId: string;
    speakerDeckUrl: string;
  };

  type Talk = {
    title: string;
    event?: string;
    date: string;
    hrefs: { label: string; url: string }[];
    summary: string[];
    /** 先頭をデフォルト表示、2枚目以降は + で展開 */
    slides: Slide[];
  };

  const talks: Talk[] = [
    {
      title: 'FORENSIA: ローカルLLMフォレンジックハーネス',
      event: '若手活動WG 技術交流会LT',
      date: '2026-08-07',
      hrefs: [
        { label: 'IDF', url: 'https://digitalforensic.jp/2026/06/16/nextgen-wg-23-1/' },
      ],
      summary: [
        'ローカルLLMでフォレンジック調査を支援するツール「FORENSIA」の設計思想と実装知見。',
        '弱いモデルを部品として使うためのハーネス設計（仮説検証ループ・記憶の構造化）について。',
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
    return talk.slides[0];
  }

  function extraSlides(talk: Talk): Slide[] {
    return talk.slides.slice(1);
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
  title={pageTitle('Talks')}
  description="登壇資料・スライドの一覧。"
/>

<div class="site-container space-y-6">
  <header class="flex flex-col gap-3 border-b border-gray-800/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h1 class="page-title">$ wall</h1>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
        登壇・LT などで使用したスライド。
      </p>
    </div>
    <p class="font-mono text-xs text-gray-600">{talks.length} entries</p>
  </header>

  <section class="divide-y divide-gray-800/70 text-sm">
    {#each talks as talk}
      {@const primary = primarySlide(talk)}
      {@const extras = extraSlides(talk)}
      <article class="py-5 first:pt-0">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div class="min-w-0">
            <div class="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.14em] text-gray-500">
              <time datetime={talk.date}>{talk.date}</time>
              {#if talk.event}
                <span class="text-gray-600">{talk.event}</span>
              {/if}
            </div>
            <h2 class="section-title text-base leading-4">
              {talk.title}
            </h2>
          </div>

          <div class="flex flex-wrap gap-2 sm:justify-end">
            {#each talk.hrefs as link}
              <Badge href={link.url} external={true} variant="indigo" size="sm" shape="pill">
                {link.label}
              </Badge>
            {/each}
          </div>
        </div>

        {#if talk.summary.length > 0}
          <div class="mt-4 text-gray-300">
            {#each talk.summary as line}
              <p class="flex">{line}</p>
            {/each}
          </div>
        {/if}

        {#if primary}
          <div class="mt-5">
            {@render slideBlock(primary)}
          </div>
        {/if}

        {#if extras.length > 0}
          <details class="mt-4 rounded-lg border border-gray-700/90 bg-gray-950/25 transition-colors hover:border-gray-600">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm text-gray-100 marker:hidden">
              <span class="font-medium">English Version</span>
              <span class="rounded-full border border-gray-600/80 bg-gray-950/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-300 transition-transform details-open:rotate-45">+</span>
            </summary>
            <div class="space-y-6 border-t border-gray-800/80 px-4 py-4">
              {#each extras as slide}
                <div class="space-y-2">
                  <p class="font-mono text-[11px] tracking-[0.12em] text-gray-500">{slide.title}</p>
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
