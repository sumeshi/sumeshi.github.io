<script lang="ts">
  import Badge from '$lib/components/Badge.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import { pathWithBase } from '$lib/paths';
  import { siteName, siteDescription } from '$lib/site';

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/sumeshi' },
    { name: 'X', url: 'https://x.com/sum3sh1' },
  ];
  const writingPlatforms = [
    {
      name: 'Zenn',
      url: 'https://zenn.dev/sum3sh1',
      meta: 'Tech',
      tone: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200 hover:border-cyan-300 hover:text-white',
      external: true,
    },
    {
      name: 'Note',
      url: 'https://note.com/sumeshi_kun/',
      meta: 'Ideas',
      tone: 'border-neutral-400/20 bg-neutral-400/10 text-neutral-200 hover:border-neutral-300 hover:text-white',
      external: true,
    },
    {
      name: 'DEV',
      url: 'https://dev.to/sum3sh1',
      meta: 'English tech',
      tone: 'border-neutral-400/20 bg-neutral-400/10 text-neutral-200 hover:border-neutral-300 hover:text-white',
      external: true,
    },
    {
      name: 'Qiita',
      url: 'https://qiita.com/sumeshi',
      meta: 'Tech archives',
      tone: 'border-green-400/20 bg-green-400/10 text-green-200 hover:border-green-300 hover:text-white',
      external: true,
    },
    {
      name: 'Speaker Deck',
      url: 'https://speakerdeck.com/sumeshi',
      meta: 'Slides',
      tone: 'border-orange-400/20 bg-orange-400/10 text-orange-200 hover:border-orange-300 hover:text-white',
      external: true,
    },
    {
      name: 'Posts',
      url: pathWithBase('/posts'),
      meta: 'Private notes',
      tone: 'border-indigo-400/20 bg-indigo-400/10 text-indigo-200 hover:border-indigo-300 hover:text-white',
      external: false,
    },
  ];

  const badges = ['Incident Response', 'Digital Forensics', 'Malware Analysis'];
  const certifications = [
    {
      name: 'GREM',
      url: 'https://www.giac.org/certifications/reverse-engineering-malware-grem',
    },
    {
      name: 'GCFA',
      url: 'https://www.giac.org/certifications/certified-forensic-analyst-gcfa',
    },
    {
      name: 'CDFP-B',
      url: 'https://digitalforensic.jp/home/act/cdfp/',
    }
  ];
</script>

<PageMeta title={siteName} description={siteDescription} />

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "S.Nakano",
    "url": "https://sumeshi.github.io",
    "jobTitle": "DFIR Researcher / Software Developer",
    "sameAs": [
      "https://github.com/sumeshi",
      "https://x.com/sum3sh1",
      "https://zenn.dev/sum3sh1",
      "https://note.com/sumeshi_kun/",
      "https://dev.to/sum3sh1",
      "https://qiita.com/sumeshi",
      "https://speakerdeck.com/sumeshi"
    ]
  })}</script>`}
</svelte:head>

<div class="site-container">
  <section class="panel-card panel-surface">
    <div class="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
      <a href={pathWithBase('/about')} class="shrink-0 self-start sm:self-start">
        <img
          src={pathWithBase('/img/me.jpg')}
          alt="Portrait of S.Nakano"
          class="h-20 w-20 rounded-2xl object-cover border border-gray-700/80 shadow-lg transition-transform duration-300 hover:scale-[1.02] sm:h-28 sm:w-28"
        />
      </a>

      <div class="min-w-0 flex-1">
        <h1 class="mt-3 font-sans text-[1.5rem] font-black tracking-[-0.05em] text-white sm:mt-4 sm:text-[2.5rem] md:text-[3rem]">
          S.Nakano
        </h1>
        <p class="mt-1.5 text-[12px] uppercase tracking-[0.18em] text-gray-500 sm:mt-2 sm:text-sm">
          DFIR Researcher / Software Developer
        </p>

        <p class="mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:mt-5 sm:leading-7 md:text-[15px]">
          サイバーセキュリティ分野における調査研究およびインシデント対応業務に従事。<br>
          デジタルフォレンジックおよびマルウェア解析を専門とし、調査で得た知見をもとに技術トレーニングの実施やOSS開発を行っている。
        </p>

        <div class="mt-3 flex flex-wrap gap-2">
          {#each badges as badge}
            <Badge variant="indigo" size="xs" shape="pill" className="text-[10px] uppercase tracking-[0.14em]">
              {badge}
            </Badge>
          {/each}
        </div>

        <div class="border-t border-gray-800/80 pt-4 sm:mt-6">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div class="min-w-0">
              <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">Certifications</p>
              <div class="mt-2 flex flex-wrap gap-2">
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
                ...
              </div>
            </div>

            <div class="flex items-center gap-2 self-start sm:self-auto">
              {#each socialLinks as link}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  title={link.name}
                  class="icon-button"
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
                </a>
              {/each}
            </div>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-2 border-t border-gray-800/80 pt-4 sm:grid-cols-3">
          {#each writingPlatforms as platform}
            <a
              href={platform.url}
              target={platform.external ? '_blank' : undefined}
              rel={platform.external ? 'noopener noreferrer' : undefined}
              class={`group flex min-h-[64px] flex-col justify-between rounded-xl border px-3 py-3 text-left transition-colors ${platform.tone}`}
            >
              <span class="text-[10px] uppercase tracking-[0.14em] opacity-70">{platform.meta}</span>
              <div class="flex items-end justify-between gap-3">
                <span class="text-sm font-semibold leading-tight">{platform.name}</span>
                <span class="text-xs opacity-70 transition-transform group-hover:translate-x-0.5">↗</span>
              </div>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </section>
</div>
