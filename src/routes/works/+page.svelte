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
      title: 'Windowsログ解析支援ツールの開発',
      hrefs: [
        { label: 'evtx2es', url: 'https://github.com/sumeshi/evtx2es' },
      ],
      summary: [
        'Windows Eventlog を高速にパースし Elasticsearch にインポートするための Python 製ツール。',
        'DFIR 向け Linux ディストリビューション 「Tsurugi Linux [LAB]」「DRIFT Fast XS」 に標準搭載された。',
      ],
    },
    {
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
    },
    {
      title: 'Windowsディスク解析支援ツールの開発',
      hrefs: [
        { label: 'ntfsdump', url: 'https://github.com/sumeshi/ntfsdump' },
        { label: 'ntfsfind', url: 'https://github.com/sumeshi/ntfsfind' },
      ],
      summary: [
        'Windows Disk Image File から任意のファイルを検索し、直接ダンプするための Python 製ツール。',
      ],
    },
    {
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
    },
    {
      title: '異言語スキャンツールの開発',
      hrefs: [
        { label: 'langscan', url: 'https://github.com/sumeshi/langscan' },
      ],
      summary: [
        'テキスト内に異言語(中露北など)の文字列が存在しないかをスキャンする Rust製 ツール。',
      ],
    },
    {
      title: '統合フォレンジックツールの開発(一部非公開)',
      hrefs: [
        { label: 'ez4en6', url: 'https://github.com/sumeshi/' },
        { label: 'i2t-f3', url: 'https://github.com/sumeshi/i2t-f3' }
      ],
      summary: [
        'フォレンジックツール群の組み合わせによる一部分析自動化の試み。',
      ],
    },
    {
      title: 'ローカルLLMを活用したインテリジェンス情報収集・分析ツールの開発(非公開)',
      hrefs: [
        { label: 'Desidia', url: 'https://github.com/sumeshi/' },
      ],
      summary: [
        'ニュースサイト、アンダーグラウンドフォーラムなどから情報を収集し、ローカルLLMによる要約や',
        '自然言語処理による分析とタグ付け、相関分析などを行う。',
      ],
    },
    {
      title: 'ツールの言語移植作業など',
      hrefs: [
        { label: 'sleuthkit-mactime.py', url: 'https://github.com/sumeshi/sleuthkit-mactime.py' },
      ],
      summary: [],
    },
  ];
</script>

<PageMeta
  title={pageTitle('Works')}
  description="これまでに作成したOSSや活動内容資料など。"
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
