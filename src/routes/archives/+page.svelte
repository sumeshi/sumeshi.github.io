<script lang="ts">
  import { getSiteLanguage } from '#lib/site-language.ts';
  import Badge from '#lib/components/Badge.svelte';
  import PageMeta from '#lib/components/PageMeta.svelte';
  import PageHeader from '#lib/components/PageHeader.svelte';
  import { pageTitle } from '#lib/site.ts';
  import { archives } from '#lib/content/archives.ts';

  const language = getSiteLanguage();
  const description = 'Technical resources and publications from SIPDEP.';

</script>

<PageMeta
  language={$language}
  title={pageTitle('Archives')}
  {description}
/>

<div class="site-container space-y-6">
  <PageHeader
    title="$ tar cvfz archives.tar.gz *"
    {description}
  />

  <section aria-label="Posters" class="divide-y divide-gray-800/60">
    {#each archives as archive}
      <article class="py-6 first:pt-1 sm:py-7">
        <p class="font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500">Poster / PDF</p>
        <div class="mt-2.5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <h2 class="min-w-0 font-sans text-base font-semibold leading-relaxed text-white">
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
          href={archive.imageHref}
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
