<script lang="ts">
  import Badge from '$lib/components/Badge.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import { pathWithBase } from '$lib/paths';
  import { pageTitle } from '$lib/site';

  type Lang = 'en' | 'ja';

  let lang: Lang = $state('ja');

  const aboutme = {
    en: [
      'I work as a security engineer in Japan, specializing in incident response. I have particular expertise in digital forensics and malware analysis.',
      "In my spare time, I'm interested in system development, and I occasionally create and release the tools I need.",
      "I'm often active on GitHub and X, so feel free to reach out anytime.",
    ],
    ja: [
      'デジタルフォレンジックとかマルウェア解析とかやってるセキュリティエンジニアです。',
      'ぶっちゃけセキュリティよりはシステム開発とかのが好きなので、そっち方向の知見のほうが多いかも。暇なときにツールつくってGitHubで公開とかしてます。',
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
        'Digital Forensic Researcher',
        'Malware Analyst',
        'Providing threat intelligence information',
        'Lecturer for university courses on incident response',
        'Participation in security contests',
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
        'デジタルフォレンジックリサーチャー',
        'マルウェアアナリスト',
        '脅威インテリジェンス情報の発信',
        'インシデントレスポンスに関する大学授業の講師',
        'セキュリティコンテストへの参加',
      ],
    },
  } satisfies Record<Lang, Record<string, string[]>>;

  const techstack: Record<string, string[]> = {
    'Frontend Dev': ['HTML', 'CSS', 'TypeScript', 'JavaScript', 'Vue', 'Angular'],
    'Backend Dev': ['Python', 'Go', 'TypeScript', 'Ruby', 'PHP'],
    'Software Dev': ['Python', 'C++', 'Rust', 'Java', 'Go', 'C# (.NET)', 'Nim', 'Swift'],
    DBMS: ['PostgreSQL', 'Elasticsearch', 'SQLite', 'MongoDB', 'MySQL'],
    Virtualization: ['Proxmox', 'ESXi', 'Hyper-V', 'KVM', 'Docker', 'Kubernetes'],
    'CI/CM': ['GitLab CI', 'GitHub Actions', 'Ansible'],
  };
</script>

<PageMeta
  title={pageTitle('About')}
  description="Profile and background for S.Nakano, including bilingual overview, history, and technology stack."
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
        class="absolute inset-0 h-full w-full object-cover opacity-20"
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
      <h2 class="section-title mb-4">$ techstack</h2>
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
