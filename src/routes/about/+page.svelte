<script lang="ts">
  import Badge from '#lib/components/Badge.svelte';
  import IconButton from '#lib/components/IconButton.svelte';
  import PageMeta from '#lib/components/PageMeta.svelte';
  import { getSiteLanguage } from '#lib/site-language.ts';
  import { aboutme, certifications, history, linksCopy, socialLinks, techstack, writingPlatforms } from '#lib/content/about.ts';
  import { pathWithBase } from '#lib/paths.ts';
  import {
    jsonLd,
    pageTitle,
    siteAuthor,
    sitePersonId,
    siteProfileImageUrl,
    siteSameAs,
    siteUrl,
    siteWebsiteId,
  } from '#lib/site.ts';

  const lang = getSiteLanguage();

</script>

<PageMeta
  title={pageTitle('About')}
  description={$lang === 'ja' ? 'S.Nakano のプロフィール。インシデント対応、デジタルフォレンジック、マルウェア解析、OSS開発など。' : 'S.Nakano is a cybersecurity professional specializing in incident response, digital forensics, malware analysis, and open-source software development.'}
  language={$lang}
/>

<svelte:head>
  {@html `<script type="application/ld+json">${jsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/about#profile`,
        "url": `${siteUrl}/about`,
        "name": "About | SIPDEP",
        "inLanguage": $lang,
        "isPartOf": { "@id": siteWebsiteId },
        "mainEntity": { "@id": sitePersonId }
      },
      {
        "@type": "Person",
        "@id": sitePersonId,
        "name": siteAuthor,
        "url": siteUrl,
        "image": siteProfileImageUrl,
        "jobTitle": "DFIR Researcher / Software Developer",
        "sameAs": siteSameAs
      }
    ]
  })}</script>`}
</svelte:head>

<div class="site-container space-y-8">
  <header class="border-b border-gray-800/80 pb-7">
    <h2 class="section-title mb-4">$ whoami</h2>
    <div class="grid gap-6 md:grid-cols-[8rem_1fr] md:items-start md:gap-10">
      <img
        src={pathWithBase('/img/me.jpg')}
        alt="Portrait of S.Nakano"
        width="400"
        height="400"
        draggable="false"
        class="h-24 w-24 shrink-0 self-start rounded-lg border border-gray-700/80 object-cover shadow-lg select-none md:h-32 md:w-32"
      />

      <div class="min-w-0">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div class="min-w-0">
            <h1 class="font-sans text-[2rem] font-black leading-none text-white sm:text-[2.75rem]">
              S.Nakano
            </h1>
            <p class="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              DFIR Researcher / Software Developer
            </p>
          </div>

          <div class="flex items-center gap-2">
            {#each socialLinks as link}
              <IconButton
                href={link.url}
                external={true}
                label={link.name}
              >
                {#if link.name === 'GitHub'}
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.2 11.39.6.11.82-.26.82-.57 0-.28-.01-1.22-.01-2.21-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.08 1.84 2.82 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.56.12-3.25 0 0 1.01-.32 3.3 1.23A11.4 11.4 0 0 1 12 6.8c1.02 0 2.05.14 3.01.41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.69.24 2.95.12 3.25.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.63-5.49 5.94.43.37.82 1.1.82 2.22 0 1.6-.01 2.88-.01 3.28 0 .31.22.69.83.57C20.57 21.79 24 17.31 24 12 24 5.37 18.63 0 12 0Z" />
                  </svg>
                {:else}
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.9 2H22l-6.76 7.73L23.2 22h-6.24l-4.89-7.38L5.62 22H2.5l7.24-8.28L1.6 2h6.4l4.42 6.76L18.9 2Zm-1.1 18h1.73L7.03 3.9H5.18L17.8 20Z" />
                  </svg>
                {/if}
              </IconButton>
            {/each}
          </div>
        </div>

        <div class="mt-5 max-w-3xl space-y-3">
          {#each aboutme[$lang] as paragraph}
            <p class="text-sm leading-relaxed text-gray-400">
              {#if Array.isArray(paragraph)}
                {#each paragraph as line, i}
                  {#if i > 0}<br />{/if}{line}
                {/each}
              {:else}
                {paragraph}
              {/if}
            </p>
          {/each}
        </div>

        <div class="mt-5 flex flex-wrap gap-2">
          {#each certifications as cert}
            <Badge
              href={cert.url}
              external={true}
              variant="amber"
              size="xs"
              shape="rounded"
              className="rounded-lg"
            >
              {cert.name}
            </Badge>
          {/each}
        </div>

      </div>
    </div>
  </header>

  <section class="space-y-3 border-b border-gray-800/80 pb-7">
    <h2 class="section-title">$ ln</h2>
    <p class="text-sm leading-relaxed text-gray-400">{linksCopy[$lang]}</p>
    <div class="grid grid-cols-5 gap-1.5 sm:gap-2">
      {#each writingPlatforms as platform}
        <Badge
          href={platform.url}
          external={platform.external}
          variant={platform.variant}
          layout="card"
          caption={platform.caption}
        >
          {platform.name}
        </Badge>
      {/each}
    </div>
  </section>

  <section class="space-y-3 border-b border-gray-800/80 pb-7">
    <h2 class="section-title">$ history</h2>
    <div class="space-y-6">
      {#each Object.entries(history[$lang]) as [period, items]}
        <div>
          <h3 class="mb-2 text-sm font-semibold tracking-tight text-indigo-400">{period}</h3>
          <ul class="max-w-3xl space-y-1.5">
            {#each items as item}
              <li class="flex gap-2 text-sm leading-relaxed text-gray-400">
                <span class="shrink-0 text-gray-600">-</span>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="section-title">$ ls /usr/local/bin</h2>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-800">
            <th class="w-36 pb-2 pr-6 text-left font-medium text-gray-500">Category</th>
            <th class="pb-2 text-left font-medium text-gray-500">Technologies</th>
          </tr>
        </thead>
        <tbody>
          {#each Object.entries(techstack) as [category, techs]}
            <tr class="border-b border-gray-800/50">
              <td class="py-3 pr-6 align-top text-gray-400">{category}</td>
              <td class="py-3">
                <div class="flex flex-wrap gap-1.5">
                  {#each techs as tech}
                    <Badge variant="gray" size="xs" shape="rounded" className="px-2 py-0.5">
                      {tech}
                    </Badge>
                  {/each}
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</div>
