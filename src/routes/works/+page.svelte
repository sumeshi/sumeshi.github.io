<script lang="ts">
  import { getSiteLanguage } from '#lib/site-language.ts';
  import PageMeta from '#lib/components/PageMeta.svelte';
  import PageHeader from '#lib/components/PageHeader.svelte';
  import XPostEmbed from '#lib/components/XPostEmbed.svelte';
  import { pageTitle } from '#lib/site.ts';
  import { projects, statusMeta } from '#lib/content/works.ts';

  const language = getSiteLanguage();
  let mountedXPosts = $state<Record<number, boolean>>({});

</script>

<PageMeta
  language={$language}
  title={pageTitle('Works')}
  description={$language === 'ja' ? 'これまでに作成してきた OSS など。' : 'Open-source software and other projects I have built.'}
/>

<div class="site-container space-y-6">
    <PageHeader title="$ ps aux" description={$language === 'ja' ? 'これまでに作成したOSSや活動内容資料など。' : 'Open-source software, projects, related materials.'} meta={`${projects.length} entries`} />

  <section class="divide-y divide-gray-800/60">
    {#each projects as project, index}
      <article class="py-6 first:pt-1 sm:py-7">
        {#if project.status}
          <span
            class={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] ${statusMeta[project.status].className}`}
          >
            {statusMeta[project.status].label}
          </span>
        {/if}

        <div class="mt-2.5 flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
          <h2 class="min-w-0 font-sans text-base font-semibold leading-snug tracking-tight text-white sm:text-[1.05rem]">
            {project.title[$language]}
          </h2>

          {#if project.hrefs.length > 0}
            <div class="ml-auto flex flex-wrap items-baseline justify-end gap-x-3 gap-y-1 text-right">
              {#each project.hrefs as link}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-xs text-indigo-300 underline decoration-indigo-400/30 underline-offset-4 transition-colors hover:text-indigo-200 hover:decoration-indigo-300"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              {/each}
            </div>
          {/if}
        </div>

        {#if project.summary.length > 0}
          <div class="mt-3 space-y-1.5 text-sm leading-relaxed text-gray-400">
            {#each project.summary as line}
              <p>{line[$language]}</p>
            {/each}
          </div>
        {/if}

        {#if project.xEmbedUrls?.length}
          <details
            class="group mt-4"
            ontoggle={(event) => {
              if ((event.currentTarget as HTMLDetailsElement).open) mountedXPosts[index] = true;
            }}
          >
            <summary class="inline-flex cursor-pointer list-none items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-indigo-300 [&::-webkit-details-marker]:hidden">
              <span aria-hidden="true" class="inline-block transition-transform group-open:rotate-90">▸</span>
              <span>Related X posts ({project.xEmbedUrls.length})</span>
            </summary>
            {#if mountedXPosts[index]}
              <div class="mt-4 grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
                {#each project.xEmbedUrls as xEmbedUrl}
                  <div class="min-w-0">
                    <XPostEmbed url={xEmbedUrl} />
                  </div>
                {/each}
              </div>
            {/if}
          </details>
        {/if}
      </article>
    {/each}
  </section>
</div>
