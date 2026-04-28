<script lang="ts">
  import Badge from '$lib/components/Badge.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import { pageTitle } from '$lib/site';

  type Project = {
    title: string;
    hrefs: { label: string; url: string }[];
    summary: string[];
  };

  const projects: Project[] = [
    {
      title: 'evtx2es / mft2es',
      hrefs: [
        { label: 'evtx2es', url: 'https://github.com/sumeshi/evtx2es' },
        { label: 'mft2es', url: 'https://github.com/sumeshi/mft2es' },
      ],
      summary: [
        'Windows artifacts を Elasticsearch に取り込むための Python ツール群。',
        'DFIR 向け Linux ディストリビューションの Tsurugi Linux LAB に標準搭載された。',
      ],
    },
    {
      title: 'ntfsdump / ntfsfind',
      hrefs: [
        { label: 'ntfsdump', url: 'https://github.com/sumeshi/ntfsdump' },
        { label: 'ntfsfind', url: 'https://github.com/sumeshi/ntfsfind' },
      ],
      summary: ['イメージファイルから Windows artifacts を抽出するフォレンジックツール群。'],
    },
    {
      title: 'Quilter-CSV',
      hrefs: [{ label: 'Quilter-CSV', url: 'https://github.com/sumeshi/quilter-csv' }],
      summary: ['イベントログのような巨大 CSV を高速に絞り込んで分析するためのツール。'],
    },
  ];
</script>

<PageMeta
  title={pageTitle('Works')}
  description="Selected open-source tools and research utilities shaped by DFIR work and day-to-day analysis needs."
/>

<div class="site-container">
  <div class="panel-card panel-surface">
    <h1 class="page-title mb-6">$ ps aux</h1>
    <p class="mb-6 max-w-2xl text-sm leading-6 text-gray-400">
      Selected open-source tools and research utilities that grew out of DFIR work and day-to-day analysis needs.
    </p>

    <div class="space-y-4 text-sm">
      {#each projects as project}
        <article class="subtle-card shadow-sm">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div class="min-w-0">
              <p class="text-xs uppercase tracking-[0.16em] text-gray-500">Project</p>
              <h2 class="mt-1 text-base font-semibold text-white">{project.title}</h2>
            </div>

            <div class="flex flex-wrap gap-2">
              {#each project.hrefs as link}
                <Badge href={link.url} external={true} variant="indigo" size="sm" shape="pill">
                  {link.label}
                </Badge>
              {/each}
            </div>
          </div>

          <ul class="mt-4 space-y-2 text-gray-300">
            {#each project.summary as line}
              <li class="flex gap-2">
                <span class="shrink-0 text-gray-600">–</span>
                <span>{line}</span>
              </li>
            {/each}
          </ul>
        </article>
      {/each}
    </div>

    <div class="mt-8 flex justify-center">
      <a
        href="https://github.com/sumeshi"
        target="_blank"
        rel="noopener noreferrer"
        class="action-button"
      >
        GitHub | @sumeshi
      </a>
    </div>
  </div>
</div>
