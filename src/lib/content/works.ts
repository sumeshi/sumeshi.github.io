import type { SiteLanguage } from '#lib/site-language.ts';

export type ProjectStatusKey =
    | 'active'
    | 'maintained'
    | 'in-development'
    | 'experimental'
    | 'archived'
    | 'on-hold';

export type Project = {
    status?: ProjectStatusKey;
    title: Record<SiteLanguage, string>;
    hrefs: { label: string; url: string }[];
    summary: Array<Record<SiteLanguage, string>>;
    xEmbedUrls?: string[];
  };

export const statusMeta: Record<ProjectStatusKey, { label: string; className: string }> = {
    active: {
      label: 'active',
      className: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
    },
    maintained: {
      label: 'maintained',
      className: 'border-lime-400/25 bg-lime-400/10 text-lime-300',
    },
    'in-development': {
      label: 'in development',
      className: 'border-sky-400/25 bg-sky-400/10 text-sky-300',
    },
    experimental: {
      label: 'experimental',
      className: 'border-amber-400/25 bg-amber-400/10 text-amber-300',
    },
    archived: {
      label: 'archived',
      className: 'border-gray-600/60 bg-gray-800/60 text-gray-400',
    },
    'on-hold': {
      label: 'on hold',
      className: 'border-rose-400/25 bg-rose-400/10 text-rose-300',
    },
  };

export const projects: Project[] = [
    {
      status: 'active',
      title: { ja: "ローカルLLMを活用したファストフォレンジック支援ツール", en: "Fast forensics with local LLMs" },
      hrefs: [
        { label: 'forensia', url: 'https://github.com/sumeshi/forensia' }
      ],
      summary: [
        { ja: "個人PCで動く小規模ローカルLLMによるファストフォレンジック支援ツールの開発。", en: "A fast-forensics tool powered by small local LLMs that run on a personal computer." },
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/2085747700495216855',
        'https://x.com/sum3sh1/status/2078930110611378291',
        'https://x.com/sum3sh1/status/2078930325603078152',
        'https://x.com/sum3sh1/status/2069054729058124256',
        'https://x.com/sum3sh1/status/2069056858770620867',
        'https://x.com/sum3sh1/status/2053306186003611830'
      ]
    },
    {
      status: 'experimental',
      title: { ja: "AI支援型フォレンジック書記ツールの開発", en: "AI-assisted forensic note-taking" },
      hrefs: [
        { label: 'Lepisma', url: 'https://github.com/sumeshi/lepisma' },
      ],
      summary: [
        { ja: "人間主導の調査で得られた情報をもとに、ローカルLLMが関連レコードの検索・検証・要約とタイムライン整理を支援するツール。", en: "A tool that uses local LLMs to help search, verify, and summarize related records and organize timelines from information gathered during human-led investigations." },
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/2095977837853610462',
        'https://x.com/sum3sh1/status/2096093968492793973'
      ]
    },
    {
      status: 'maintained',
      title: { ja: "Windowsログ解析支援ツールの開発", en: "Windows Event Log analysis tools" },
      hrefs: [
        { label: 'evtx2es', url: 'https://github.com/sumeshi/evtx2es' },
      ],
      summary: [
        { ja: "Windows Eventlog を高速にパースし Elasticsearch にインポートするための Python 製ツール。", en: "Python tools for quickly parsing Windows Event Logs and importing them into Elasticsearch." },
        { ja: "evtx2es は Tsurugi Linux [LAB] に、evtx2json は DRIFT Linux に収録された。", en: "evtx2es is included in Tsurugi Linux [LAB], and evtx2json in DRIFT Linux." },
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/1413718504318984193',
        'https://x.com/sum3sh1/status/1492030729194438657',
        'https://x.com/sum3sh1/status/2044793118466425261'
      ]
    },
    {
      status: 'maintained',
      title: { ja: "Windowsアーティファクト解析支援ツールの開発", en: "Windows forensic artifact analysis tools" },
      hrefs: [
        { label: 'mft2es', url: 'https://github.com/sumeshi/mft2es' },
        { label: 'prefetch2es', url: 'https://github.com/sumeshi/prefetch2es' },
        { label: 'reg2es', url: 'https://github.com/sumeshi/reg2es' },
      ],
      summary: [
        { ja: "Windows Artifacts を高速にパースし Elasticsearch にインポートするための Python 製ツール。", en: "Python tools for quickly parsing Windows artifacts and importing them into Elasticsearch." },
        { ja: "mft2es, mft2json は、DFIR 向け Linux ディストリビューション Tsurugi Linux [LAB] に標準搭載された。", en: "mft2es and mft2json are included in the DFIR distribution Tsurugi Linux [LAB]." },
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/1936168521014427945',
        'https://x.com/sum3sh1/status/1936534458930450459',
        'https://x.com/sum3sh1/status/2080014729297416538'
      ]
    },
    {
      status: 'maintained',
      title: { ja: "Windowsディスク解析支援ツールの開発", en: "Windows disk analysis tools" },
      hrefs: [
        { label: 'ntfsdump', url: 'https://github.com/sumeshi/ntfsdump' },
        { label: 'ntfsfind', url: 'https://github.com/sumeshi/ntfsfind' },
      ],
      summary: [
        { ja: "Windows Disk Image File から任意のファイルを検索し、直接ダンプするための Python 製ツール。", en: "Python tools for finding files in Windows disk images and dumping them directly." },
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/1728361116659851688'
      ]
    },
    {
      status: 'maintained',
      title: { ja: "ログ解析支援ツールの開発", en: "Log analysis tools" },
      hrefs: [
        { label: 'Trivium', url: 'https://github.com/sumeshi/trivium' },
        { label: 'Quilter-CSV', url: 'https://github.com/sumeshi/quilter-csv' },
        { label: 'Quilt', url: 'https://github.com/sumeshi/quilt' }
      ],
      summary: [
        { ja: "数百GBオーダーを想定した、巨大なCSV形式ファイルを高速かつ複雑な条件のもとフィルタ可能な Python/Rust 製ツール。", en: "Python and Rust tools for quickly filtering large CSV files, including files of several hundred GB, using complex conditions." },
        { ja: "フィルタされたCSVファイルに対してIOCによるフラグ付けなどが可能な Rust - Tauri 製ツール。", en: "A Rust and Tauri tool for flagging indicators of compromise (IOCs) in filtered CSV files." },
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/2091904742444442101',
        'https://x.com/sum3sh1/status/1980679577941995839',
        'https://x.com/sum3sh1/status/1854231023787339958'
      ]
    },
    {
      status: 'maintained',
      title: { ja: "AIエージェントログ解析支援ライブラリの開発", en: "AI agent log parsing library" },
      hrefs: [
        { label: 'agentlogparser-rs', url: 'https://github.com/sumeshi/agentlogparser-rs' },
      ],
      summary: [
        { ja: "Codex CLI, Claude Codeなどのアーティファクトをパースするライブラリ。", en: "A library for parsing artifacts from Codex CLI, Claude Code, and other AI agents." },
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/2082840308321268100'
      ]
    },
    {
      status: 'maintained',
      title: { ja: "異言語スキャンツールの開発", en: "Foreign-language text scanner" },
      hrefs: [
        { label: 'langscan', url: 'https://github.com/sumeshi/langscan' },
      ],
      summary: [
        { ja: "テキスト内に異言語(中露北など)の文字列が存在しないかをスキャンする Rust製 ツール。", en: "A Rust tool that scans text for strings in other languages, such as Chinese, Russian, and Korean." },
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/2042252079318839683'
      ]
    },
    {
      status: 'maintained',
      title: { ja: "日本語特化軽量全文検索エンジンの開発", en: "Lightweight full-text search for Japanese" },
      hrefs: [
        { label: 'roughsearch', url: 'https://github.com/sumeshi/roughsearch' },
      ],
      summary: [
        { ja: "日英文章を形態素解析し、DuckDB と BM25 を基盤とするミニマルな全文検索機能を備えた Python製 ツール。", en: "A minimal Python full-text search tool using morphological analysis of Japanese and English text, DuckDB, and BM25." },
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/2049776493077954865'
      ]
    },
    {
      status: 'experimental',
      title: { ja: "ローカルLLMを活用したインテリジェンス情報収集・分析ツールの開発 (非公開)", en: "Local LLM intelligence collection and analysis (private)" },
      hrefs: [
        { label: 'Desidia', url: 'https://github.com/sumeshi/' },
      ],
      summary: [
        { ja: "ニュースサイト、アンダーグラウンドフォーラムなどから情報を収集し、ローカルLLMによる要約や", en: "Collects information from news sites, underground forums, and other sources, using local LLMs for summarization." },
        { ja: "自然言語処理による分析とタグ付け、相関分析などを行う。", en: "Uses natural language processing for analysis and tagging, along with correlation analysis." },
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/2046076084350046514'
      ]
    },
    {
      status: 'archived',
      title: { ja: "アニメキャラクター風 Human-memorable-hash", en: "Anime-style human-memorable hashes" },
      hrefs: [
        { label: 'anihash', url: 'https://github.com/sumeshi/anihash' },
      ],
      summary: [
        { ja: "white-hair-sora-kasugano のように、アニメキャラクター風の名前と特徴によってhumanhashと同等の出力空間を確保したハッシュツール。", en: "A hashing tool that combines anime-style names and traits, such as white-hair-sora-kasugano, to provide an output space comparable to humanhash." },
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/2079286117678125535'
      ]
    },
    {
      status: 'archived',
      title: { ja: "日本語PIIフィルター用ファインチューニングモデル", en: "Fine-tuned privacy filter for Japanese PII" },
      hrefs: [
        { label: 'privacy-filter-jp.cpp', url: 'https://github.com/sumeshi/privacy-filter-jp.cpp' },
      ],
      summary: [
        { ja: "OpenAI Privacy Filterをベースに、日本語固有の個人識別情報をフィルターできるようチューニングしたモデル。", en: "A model based on OpenAI Privacy Filter, fine-tuned to filter personally identifiable information specific to Japanese." },
      ],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/2073038952597266498'
      ]
    },
    {
      status: 'archived',
      title: { ja: "ツールの言語移植作業など", en: "Tool ports and related work" },
      hrefs: [
        { label: 'sleuthkit-mactime.py', url: 'https://github.com/sumeshi/sleuthkit-mactime.py' },
        { label: 'irflow-timeline', url: 'https://github.com/sumeshi/irflow-timeline' },
      ],
      summary: [],
      xEmbedUrls: [
        'https://x.com/sum3sh1/status/1908263331745661252'
      ]
    },
    {
      status: 'archived',
      title: { ja: "統合フォレンジックツールの開発 (非公開)", en: "Integrated forensic tools (private)" },
      hrefs: [
        { label: 'ez4en6', url: 'https://github.com/sumeshi/' },
        { label: 'i2t-f^3', url: 'https://github.com/sumeshi/i2t-f3' }
      ],
      summary: [
        { ja: "フォレンジックツール群の組み合わせによる一部分析自動化の試み。", en: "An experiment in automating parts of forensic analysis by combining existing tools." },
        { ja: "FORENSIA へ統合済", en: "Merged into FORENSIA." },
      ],
    },
  ];

