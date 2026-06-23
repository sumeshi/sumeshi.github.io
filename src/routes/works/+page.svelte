<script lang="ts">
  import Badge from '$lib/components/Badge.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import XPostEmbed from '$lib/components/XPostEmbed.svelte';
  import { pageTitle } from '$lib/site';

  type ProjectStatusKey =
    | 'active'
    | 'maintained'
    | 'in-development'
    | 'experimental'
    | 'archived'
    | 'on-hold';

  type Project = {
    status?: ProjectStatusKey;
    title: string;
    hrefs: { label: string; url: string }[];
    summary: string[];
    xEmbedUrls?: string[];
  };

  const statusMeta: Record<ProjectStatusKey, { label: string; className: string }> = {
    active: { label: 'active', className: 'text-emerald-400' },
    maintained: { label: 'maintained', className: 'text-lime-400' },
    'in-development': { label: 'in development', className: 'text-sky-400' },
    experimental: { label: 'experimental', className: 'text-amber-400' },
    archived: { label: 'archived', className: 'text-gray-400' },
    'on-hold': { label: 'on hold', className: 'text-rose-400' }
  };

  const projects: Project[] = [
    {
      status: 'maintained',
      title: 'Windowsログ解析支援ツールの開発',
      hrefs: [
        { label: 'evtx2es', url: 'https://github.com/sumeshi/evtx2es' },
      ],
      summary: [
        'Windows Eventlog を高速にパースし Elasticsearch にインポートするための Python 製ツール。',
        'DFIR 向け Linux ディストリビューション 「Tsurugi Linux [LAB]」「DRIFT Fast XS」 に標準搭載された。',
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/1413718504318984193',
        'https://x.com/sum3sh1/status/1492030729194438657',
        'https://x.com/sum3sh1/status/2044793118466425261'
      ]
    },
    {
      status: 'maintained',
      title: 'Windowsアーティファクト解析支援ツールの開発',
      hrefs: [
        { label: 'mft2es', url: 'https://github.com/sumeshi/mft2es' },
        { label: 'prefetch2es', url: 'https://github.com/sumeshi/prefetch2es' },
        { label: 'reg2es', url: 'https://github.com/sumeshi/reg2es' },
      ],
      summary: [
        'Windows Artifacts を高速にパースし Elasticsearch にインポートするための Python 製ツール。',
        'mft2es, mft2json は、DFIR 向け Linux ディストリビューション 「Tsurugi Linux [LAB]」 に標準搭載された。',
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/1936168521014427945',
        'https://x.com/sum3sh1/status/1936534458930450459',
        'https://x.com/sum3sh1/status/1424542848368529413'
      ]
    },
    {
      status: 'maintained',
      title: 'Windowsディスク解析支援ツールの開発',
      hrefs: [
        { label: 'ntfsdump', url: 'https://github.com/sumeshi/ntfsdump' },
        { label: 'ntfsfind', url: 'https://github.com/sumeshi/ntfsfind' },
      ],
      summary: [
        'Windows Disk Image File から任意のファイルを検索し、直接ダンプするための Python 製ツール。',
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/1728361116659851688'
      ]
    },
    {
      status: 'active',
      title: 'ログ解析支援ツールの開発',
      hrefs: [
        { label: 'Trivium', url: 'https://github.com/sumeshi/trivium' },
        { label: 'Quilter-CSV', url: 'https://github.com/sumeshi/quilter-csv' },
        { label: 'qsv-rs', url: 'https://github.com/sumeshi/qsv-rs' }
      ],
      summary: [
        '数百GBオーダーを想定した、巨大なCSV形式ファイルを高速かつ複雑な条件のもとフィルタ可能な Python/Rust 製ツール。',
        'フィルタされたCSVファイルに対してIOCによるフラグ付けなどが可能な Rust - Tauri 製ツール。',
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/1980679577941995839',
        'https://x.com/sum3sh1/status/1854231023787339958'
      ]
    },
    {
      status: 'active',
      title: '異言語スキャンツールの開発',
      hrefs: [
        { label: 'langscan', url: 'https://github.com/sumeshi/langscan' },
      ],
      summary: [
        'テキスト内に異言語(中露北など)の文字列が存在しないかをスキャンする Rust製 ツール。',
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/2042252079318839683'
      ]
    },
    {
      status: 'maintained',
      title: '日本語特化軽量全文検索エンジンの開発',
      hrefs: [
        { label: 'roughsearch', url: 'https://github.com/sumeshi/roughsearch' },
      ],
      summary: [
        '日英文章を形態素解析し、DuckDB と BM25 を基盤とするミニマルな全文検索機能を備えた Python製 ツール。',
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/2049776493077954865'
      ]
    },
    {
      status: 'in-development',
      title: 'ローカルLLMを活用したファストフォレンジック支援ツール(未公開)',
      hrefs: [
        { label: 'forensia', url: 'https://github.com/sumeshi/' }
      ],
      summary: [
        '個人PCで動く小規模ローカルLLMによるファストフォレンジック支援ツールの開発。',
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/2053306186003611830'
      ]
    },
    {
      status: 'experimental',
      title: 'ローカルLLMを活用したインテリジェンス情報収集・分析ツールの開発(非公開)',
      hrefs: [
        { label: 'Desidia', url: 'https://github.com/sumeshi/' },
      ],
      summary: [
        'ニュースサイト、アンダーグラウンドフォーラムなどから情報を収集し、ローカルLLMによる要約や',
        '自然言語処理による分析とタグ付け、相関分析などを行う。',
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/2046076084350046514'
      ]
    },
    {
      status: 'archived',
      title: '統合フォレンジックツールの開発(一部非公開)',
      hrefs: [
        { label: 'ez4en6', url: 'https://github.com/sumeshi/' },
        { label: 'i2t-f^3', url: 'https://github.com/sumeshi/i2t-f3' }
      ],
      summary: [
        'フォレンジックツール群の組み合わせによる一部分析自動化の試み。',
      ],
    },
    {
      status: 'archived',
      title: 'ツールの言語移植作業など',
      hrefs: [
        { label: 'sleuthkit-mactime.py', url: 'https://github.com/sumeshi/sleuthkit-mactime.py' },
      ],
      summary: [],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/1908263331745661252'
      ]
    },
  ];
</script>

<PageMeta
  title={pageTitle('Works')}
  description="これまでに作成したOSSや活動内容資料など。"
/>

<div class="site-container space-y-6">
  <header class="flex flex-col gap-3 border-b border-gray-800/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h1 class="page-title">$ ps aux</h1>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
        これまでに作成したOSSや活動内容資料など。
      </p>
    </div>
    <p class="font-mono text-xs text-gray-600">{projects.length} entries</p>
  </header>

  <section class="divide-y divide-gray-800/70 text-sm">
    {#each projects as project}
      <article class="py-5 first:pt-0">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div class="min-w-0">
            {#if project.status}
              <p class={`mb-1 font-mono text-[11px] lowercase tracking-[0.14em] ${statusMeta[project.status].className}`}>
                [{statusMeta[project.status].label}]
              </p>
            {/if}
            <h2 class="section-title text-base leading-6">
              {project.title}
            </h2>
          </div>

          <div class="flex flex-wrap gap-2 sm:justify-end">
            {#each project.hrefs as link}
              <Badge href={link.url} external={true} variant="indigo" size="sm" shape="pill">
                {link.label}
              </Badge>
            {/each}
          </div>
        </div>

        {#if project.summary.length > 0}
          <ul class="mt-4 space-y-2 text-gray-300">
            {#each project.summary as line}
              <li class="flex gap-2">
                <span class="shrink-0 text-gray-600">-</span>
                <span>{line}</span>
              </li>
            {/each}
          </ul>
        {/if}

        {#if project.xEmbedUrls?.length}
          <details class="mt-5 rounded-lg border border-gray-700/90 bg-gray-950/25 transition-colors hover:border-gray-600">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm text-gray-100 marker:hidden">
              <span class="font-medium">See related X posts</span>
              <span class="rounded-full border border-gray-600/80 bg-gray-950/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-300 transition-transform details-open:rotate-45">+</span>
            </summary>
            <div class="space-y-4 border-t border-gray-800/80 px-4 py-4">
              {#each project.xEmbedUrls as xEmbedUrl}
                <XPostEmbed url={xEmbedUrl} />
              {/each}
            </div>
          </details>
        {/if}
      </article>
    {/each}
  </section>
</div>
