<script lang="ts">
  import { getSiteLanguage } from '#lib/site-language.ts';
  import PageMeta from '#lib/components/PageMeta.svelte';
  import PageHeader from '#lib/components/PageHeader.svelte';
  import SpeakerDeckEmbed from '#lib/components/SpeakerDeckEmbed.svelte';
  import { pageTitle } from '#lib/site.ts';
  import { talks, type Slide, type Talk } from '#lib/content/talks.ts';

  const language = getSiteLanguage();
  const detailsLabel = $derived($language === 'ja' ? '詳細を見る' : 'View details');

  function primarySlide(talk: Talk): Slide | undefined {
    return talk.slides[$language === 'en' && talk.slides.length > 1 ? 1 : 0];
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
    <PageHeader title="$ wall" description={$language === 'ja' ? '登壇・LT など。' : 'Talks and lightning talks.'} meta={`${talks.length} entries`} />

  <section class="divide-y divide-gray-800/60">
    {#each talks as talk}
      {@const primary = primarySlide(talk)}
      <article class="py-6 first:pt-1 sm:py-7">
        <div class="flex items-baseline justify-between gap-3 text-xs">
          <time datetime={talk.date} class="font-mono text-gray-500">{talk.date}</time>
          <a
            href={talk.detailsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${detailsLabel} · ${talk.title[$language]}`}
            class="whitespace-nowrap rounded-sm text-indigo-300 underline decoration-indigo-400/30 underline-offset-4 transition-colors hover:text-indigo-200 hover:decoration-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            {detailsLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <h2 class="mt-2.5 font-sans text-base font-semibold leading-relaxed text-white">
          {talk.title[$language]}
        </h2>

        {#if talk.summary.length > 0}
          <div class="mt-2 max-w-3xl space-y-0.5 text-sm leading-5 text-gray-400">
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
      </article>
    {/each}
  </section>
</div>
