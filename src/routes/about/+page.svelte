<script lang="ts">
  import { pathWithBase } from '$lib/paths';

  type Lang = 'en' | 'ja';
  let lang: Lang = $state('en');

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
  };

  const techstack: Record<string, string[]> = {
    'Frontend Dev': ['HTML', 'CSS', 'TypeScript', 'JavaScript', 'Vue', 'Angular'],
    'Backend Dev': ['Python', 'Go', 'TypeScript', 'Ruby', 'PHP'],
    'Software Dev': ['Python', 'C++', 'Rust', 'Java', 'Go', 'C# (.NET)', 'Nim', 'Swift'],
    DBMS: ['PostgreSQL', 'Elasticsearch', 'SQLite', 'MongoDB', 'MySQL'],
    Virtualization: ['Proxmox', 'ESXi', 'Hyper-V', 'KVM', 'Docker', 'Kubernetes'],
    'CI/CM': ['GitLab CI', 'GitHub Actions', 'Ansible'],
  };
</script>

<svelte:head>
  <title>About | sumeshi</title>
</svelte:head>

<div class="max-w-3xl mx-auto space-y-4">
  <div class="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
    <!-- Language toggle -->
    <div class="flex justify-end p-4 border-b border-gray-800">
      <div class="flex rounded-lg overflow-hidden border border-gray-700">
        {#each ['en', 'ja'] as l (l)}
          <button
            onclick={() => (lang = l as Lang)}
            class="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors
              {lang === l ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}"
          >
            {l}
          </button>
        {/each}
      </div>
    </div>

    <!-- Hero / quote -->
    <div
      class="relative h-48 flex flex-col items-center justify-center text-center px-6"
      style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);"
    >
      <img
        src={pathWithBase('/img/blurdog.jpg')}
        alt=""
        class="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div class="relative z-10">
        <p class="text-white font-semibold text-sm md:text-base italic">
          "Do one thing every day that scares you."
        </p>
        <p class="text-gray-400 text-xs mt-2">— Mary Schmich, Chicago Tribune, 1 June 1997</p>
      </div>
    </div>

    <!-- $ whoami -->
    <section class="p-6 border-b border-gray-800">
      <h2 class="font-mono font-bold text-white mb-4">$ whoami</h2>
      <div class="space-y-3">
        {#each aboutme[lang] as paragraph}
          <p class="text-gray-300 text-sm leading-relaxed">{paragraph}</p>
        {/each}
      </div>
    </section>

    <!-- $ history -->
    <section class="p-6 border-b border-gray-800">
      <h2 class="font-mono font-bold text-white mb-4">$ history</h2>
      {#each Object.entries(history[lang]) as [period, items]}
        <div class="mb-5">
          <h3 class="text-indigo-400 text-sm font-semibold mb-2">{period}</h3>
          <ul class="space-y-1.5">
            {#each items as item}
              <li class="text-gray-300 text-sm flex gap-2">
                <span class="text-gray-600 shrink-0">–</span>
                {item}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </section>

    <!-- $ ls /usr/local/bin -->
    <section class="p-6">
      <h2 class="font-mono font-bold text-white mb-4">$ ls /usr/local/bin</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800">
              <th class="text-left text-gray-500 font-medium pb-2 pr-6 w-36">Category</th>
              <th class="text-left text-gray-500 font-medium pb-2">Technologies</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.entries(techstack) as [category, techs]}
              <tr class="border-b border-gray-800/50">
                <td class="py-3 pr-6 text-gray-400 align-top">{category}</td>
                <td class="py-3">
                  <div class="flex flex-wrap gap-1.5">
                    {#each techs as tech}
                      <span class="text-xs text-gray-300 bg-gray-800 border border-gray-700 rounded px-2 py-0.5">
                        {tech}
                      </span>
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
