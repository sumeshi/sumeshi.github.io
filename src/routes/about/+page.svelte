<script lang="ts">
  import Badge from '$lib/components/Badge.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import { pathWithBase } from '$lib/paths';
  import { pageTitle } from '$lib/site';

  type Lang = 'en' | 'ja';

  let lang: Lang = $state('en');

  const aboutme = {
    en: [
      'I specialize in cybersecurity, particularly incident response.',
      'With a background in software engineering, I enjoy applying that experience in my work. I also build tools I find useful and release them as open source on GitHub.',
    ],
    ja: [
      'サイバーセキュリティ、とりわけインシデントレスポンスを専門にしています。',
      'システム開発畑から来ているので、そっち方面の知見を活かして楽しく過ごしています。また、自分がほしいなと思ったツールをOSSとして開発、GitHubで公開しています。',
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

<div class="site-container space-y-4">
  <div class="panel-shell panel-surface">
    <div class="flex justify-end border-b border-gray-800 p-4">
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

    <div class="relative flex h-48 flex-col items-center justify-center px-6 text-center">
      <img
        src={pathWithBase('/img/blurdog.jpg')}
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,27,75,0.88),rgba(12,17,27,0.96))]"></div>
      <div class="relative z-10">
        <p class="text-white text-sm font-semibold italic md:text-base">
          "Do one thing every day that scares you."
        </p>
        <p class="mt-2 text-xs text-gray-400">Mary Schmich, Chicago Tribune, June 1, 1997</p>
      </div>
    </div>

    <section class="panel-section">
      <h2 class="section-title mb-4">$ whoami</h2>
      <div class="space-y-3">
        {#each aboutme[lang] as paragraph}
          <p class="text-sm leading-relaxed text-gray-300">{paragraph}</p>
        {/each}
      </div>
    </section>

    <section class="panel-section">
      <h2 class="section-title mb-4">$ history</h2>
      {#each Object.entries(history[lang]) as [period, items]}
        <div class="mb-5">
          <h3 class="mb-2 text-sm font-semibold text-indigo-400">{period}</h3>
          <ul class="space-y-1.5">
            {#each items as item}
              <li class="flex gap-2 text-sm text-gray-300">
                <span class="shrink-0 text-gray-600">–</span>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </section>

    <section class="panel-section">
      <h2 class="section-title mb-4">$ ls /usr/local/bin</h2>
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
</div>
