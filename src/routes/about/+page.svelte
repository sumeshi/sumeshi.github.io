<script lang="ts">
  import Badge from '$lib/components/Badge.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import { pathWithBase } from '$lib/paths';
  import { pageTitle } from '$lib/site';

  type Lang = 'en' | 'ja';

  let lang: Lang = $state('en');

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/sumeshi' },
    { name: 'X', url: 'https://x.com/sum3sh1' },
  ];
  const writingPlatforms = [
    {
      name: 'Zenn',
      url: 'https://zenn.dev/sum3sh1',
      meta: 'tech articles',
      variant: 'sky' as const,
      external: true,
    },
    {
      name: 'Note',
      url: 'https://note.com/sumeshi_kun/',
      meta: 'ideas / essays',
      variant: 'emerald' as const,
      external: true,
    },
    {
      name: 'DEV',
      url: 'https://dev.to/sum3sh1',
      meta: 'tech articles(en)',
      variant: 'neutral' as const,
      external: true,
    },
    {
      name: 'Qiita',
      url: 'https://qiita.com/sumeshi',
      meta: 'tech articles(archived)',
      variant: 'lime' as const,
      external: true,
    },
    {
      name: 'Speaker Deck',
      url: 'https://speakerdeck.com/sumeshi',
      meta: 'talks',
      variant: 'teal' as const,
      external: true,
    },
    {
      name: 'Posts',
      url: pathWithBase('/posts'),
      meta: 'private logs',
      variant: 'indigo' as const,
      external: false,
    },
  ];
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
    },
  ];

  // string = 1段落 / string[] = 同一段落内の複数行（行間はline-heightのみ）
  const aboutme: Record<Lang, Array<string | string[]>> = {
    en: [
      'I specialize in cybersecurity, particularly incident response.',
      [
        'With a background in software engineering, I enjoy applying that experience in my work.',
        'I also build tools I find useful and release them as open source on GitHub.',
      ],
    ],
    ja: [
      'サイバーセキュリティ、とりわけインシデントレスポンスを専門にしています。',
      [
        'システム開発畑から来ているので、そっち方面の知見を活かして楽しく過ごしています。',
        'また、自分がほしいなと思ったツールをOSSとして開発、GitHubで公開しています。',
      ],
    ],
  };

  const history = {
    en: {
      "From Bachelor's Year 4 to Master's Year 2": [
        'Worked as a Web Engineer at an IT venture company for 3 years',
        'Front-end development using Angular and Vue',
        'Back-end development using Django REST framework',
        'Developed full-text search features utilizing Elasticsearch and machine learning',
        'Improved PostgreSQL performance and tuned high-efficiency data structures and queries',
        'Introduced and optimized GitLab and GitLab CI',
        'Developed a log analysis system',
        'Developed forensic tools',
      ],
      "After Completing Master's Degree to Present": [
        'Incident Handler',
        'Digital Forensics Researcher',
        'Malware Analyst',
        'Analysis and dissemination of threat intelligence',
        'Lecturer for university courses on incident response',
        'Participation and high-ranking placements in security competitions',
        'Cybersecurity instructor for government and private organizations',
        'Trained over 1,000 individuals in cybersecurity and incident response',
        'Conducted incident investigations in large-scale environments involving hundreds of systems',
      ],
    },
    ja: {
      '学部4年生から修士2年生まで': [
        'ITベンチャー企業で3年間Webエンジニアとして勤務',
        'Angular, Vueを使ったフロントエンド開発',
        'Django REST frameworkを使ったバックエンド開発',
        'Elasticsearchと機械学習を活用した全文検索機能の開発',
        'PostgreSQLのパフォーマンス改善, 高効率なデータ構造・クエリのチューニング',
        'GitLab, GitLab CIの導入とパフォーマンス改善',
        'ログ分析システムの開発',
        'フォレンジックツールの開発',
      ],
      '修士課程から現在まで': [
        'インシデントハンドラー',
        'デジタルフォレンジック研究者',
        'マルウェアアナリスト',
        '脅威インテリジェンス情報の分析・発信',
        'インシデントレスポンスの大学講師',
        'セキュリティコンテストへの参加・上位入賞',
        '官公庁・民間組織向けサイバーセキュリティ講師',
        'サイバーセキュリティ人材育成 (述べ1,000人超)',
        'インシデント調査対応 (累計数百台規模)',
      ],
    },
  } satisfies Record<Lang, Record<string, string[]>>;

  const techstack: Record<string, string[]> = {
    'Languages': [
      'Python', 'Rust', 'Go', 'C/C++', 'TypeScript', 'JavaScript',  'Ruby', 'PHP', 'Java', 'C# (.NET)', 'Swift', 'Nim'
    ],
    'Frontend': [
      'HTML', 'CSS', 'Svelte', 'Vue', 'Nuxt', 'Angular', 'React', 'Next'
    ],
    'Backend': [
      'Django', 'Flask', 'FastAPI', 'Express', 'Ruby on Rails', 'Laravel', 'Spring Boot'
    ],
    'Databases': [
      'Elasticsearch', 'PostgreSQL', 'DuckDB', 'Redis', 'SQLite', 'MySQL', 'MongoDB'
    ],
    'Cloud Platforms': [
      'AWS', 'Azure', 'Google Cloud', 'Vercel', 'Netlify', 'Heroku'
    ],
    'Containers & Virtualization': [
      'Docker', 'Kubernetes', 'KVM', 'ESXi', 'Proxmox', 'Hyper-V'
    ],
    'CI/CD & Automation': [
      'GitHub Actions', 'GitLab CI', 'Circle CI', 'Jenkins', 'Ansible'
    ],
    'Operating Systems': [
      'Windows', 'Windows Server', 'macOS', 'Ubuntu', 'Debian', 'Arch', 'RHEL', 'FreeBSD'
    ]
  };
</script>

<PageMeta
  title={pageTitle('About')}
  description="プロフィールと背景、テックスタックなど。"
/>

<div class="site-container space-y-8">
  <header class="border-b border-gray-800/80 pb-7">
    <div class="mb-5 flex justify-end">
      <div class="flex overflow-hidden rounded-lg border border-gray-700">
        {#each ['en', 'ja'] as option (option)}
          <button
            type="button"
            onclick={() => (lang = option as Lang)}
            class="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors
              {lang === option ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}"
            aria-pressed={lang === option}
          >
            {option}
          </button>
        {/each}
      </div>
    </div>

    <h2 class="section-title mb-4">$ whoami</h2>
    <div class="grid gap-6 md:grid-cols-[8rem_1fr] md:items-start md:gap-10">
      <img
        src={pathWithBase('/img/me.jpg')}
        alt="Portrait of S.Nakano"
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
          {#each aboutme[lang] as paragraph}
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
    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {#each writingPlatforms as platform}
        {#snippet platformIcon()}
          {#if platform.name === 'Zenn'}
            <!-- Zenn-ish mark -->
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.5 4.5h6.2L7.4 12l3.3 7.5H4.5L1.2 12 4.5 4.5Zm8.8 0H21l-5.2 7.5L21 19.5h-7.7L8.1 12l5.2-7.5Z" />
            </svg>
          {:else if platform.name === 'Note'}
            <!-- folded page, no text lines -->
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V9L14 3.5Z" />
              <path d="M14 3.5V9h5.5" />
            </svg>
          {:else if platform.name === 'DEV'}
            <!-- code brackets -->
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M8.5 7.5 4.5 12l4 4.5" />
              <path d="M15.5 7.5 19.5 12l-4 4.5" />
            </svg>
          {:else if platform.name === 'Qiita'}
            <!-- bookmark, no text lines -->
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 3.5h10a1.2 1.2 0 0 1 1.2 1.2V20l-6.2-3.6L5.8 20V4.7A1.2 1.2 0 0 1 7 3.5Z" />
            </svg>
          {:else if platform.name === 'Speaker Deck'}
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="3.5" y="5.5" width="17" height="5" rx="1.2" />
              <rect x="3.5" y="13.5" width="12" height="5" rx="1.2" opacity="0.45" />
            </svg>
          {:else}
            <!-- three lines -->
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="5" y="6.5" width="14" height="1.8" rx="0.9" />
              <rect x="5" y="11.1" width="14" height="1.8" rx="0.9" />
              <rect x="5" y="15.7" width="14" height="1.8" rx="0.9" />
            </svg>
          {/if}
        {/snippet}
        <Badge
          href={platform.url}
          external={platform.external}
          variant={platform.variant}
          layout="card"
          meta={platform.meta}
          shape="rounded"
          trailing={platform.external ? undefined : '->'}
          icon={platformIcon}
        >
          {platform.name}
        </Badge>
      {/each}
    </div>
  </section>

  <section class="space-y-3 border-b border-gray-800/80 pb-7">
    <h2 class="section-title">$ history</h2>
    <div class="space-y-6">
      {#each Object.entries(history[lang]) as [period, items]}
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
