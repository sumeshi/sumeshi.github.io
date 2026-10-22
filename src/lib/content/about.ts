import type { SiteLanguage } from '#lib/site-language.ts';

export const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/sumeshi' },
    { name: 'X', url: 'https://x.com/sum3sh1' },
  ];
export const writingPlatforms = [
    {
      name: 'Zenn',
      url: 'https://zenn.dev/sum3sh1',
      variant: 'sky' as const,
      external: true,
      caption: 'tech articles',
    },
    {
      name: 'Note',
      url: 'https://note.com/sumeshi_kun/',
      variant: 'emerald' as const,
      external: true,
      caption: 'essays',
    },
    {
      name: 'DEV',
      url: 'https://dev.to/sum3sh1',
      variant: 'neutral' as const,
      external: true,
      caption: 'english articles',
    },
    {
      name: 'Qiita',
      url: 'https://qiita.com/sumeshi',
      variant: 'lime' as const,
      external: true,
      caption: 'archived articles',
    },
    {
      name: 'Speaker Deck',
      url: 'https://speakerdeck.com/sumeshi',
      variant: 'teal' as const,
      external: true,
      caption: 'talks',
    },
  ];
export const linksCopy = {
    ja: 'Postsよりちょびっと一般化した記事の置き場。',
    en: 'Articles that go a little beyond the personal notes in Posts.',
  };
export const certifications = [
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
export const aboutme: Record<SiteLanguage, Array<string | string[]>> = {
    en: [
      'I specialize in cybersecurity and work at a security company on incident response, digital forensics, malware analysis, and threat intelligence. I have investigated hundreds of devices and draw on that experience to train security professionals and teach technical courses.',
      'I also develop open-source forensic tools. Some are included in distributions such as Tsurugi Linux, DRIFT Linux, and Security Onion.',
    ],
    ja: [
      ['サイバーセキュリティを専門とし、セキュリティ企業にてインシデント対応、デジタルフォレンジック、マルウェア解析、脅威情報分析などに従事する。累計数百台の機器調査を経験し、その知見を生かしてセキュリティ人材の育成や技術訓練講師としても活動する。'],
      ['フォレンジック関連のOSS開発にも取り組み、開発したソフトウェアは「Tsurugi Linux」「DRIFT Linux」「Security Onion」などのセキュリティ向けディストリビューションに採用されている。']
    ],
  };

export const history = {
    en: {
      "Bachelor's Year 4 to Master's Year 2": [
        'Research on log data analysis and visualization',
        'Research on natural language processing',
        'Research on sentiment analysis using machine learning',
        'Worked as a web engineer at an IT venture company for about three years',
        'Front-end development with Angular and Vue',
        'Back-end development with Django REST framework',
        'Full-text search development using Elasticsearch',
        'PostgreSQL performance improvements, and optimization of data structures and queries',
        'Introduction of GitLab and GitLab CI, and performance improvements',
        'Open-source development for digital forensics',
      ],
      "After the Master's Degree to the Present": [
        'Incident investigation and response',
        'Digital forensics investigations and malware analysis',
        'Company-wide security governance',
        'Collection, analysis, and dissemination of threat intelligence',
        'Industry, academia, and government collaboration',
        'Cybersecurity technical instructor',
        'University lectures on incident response',
        'Cybersecurity talent development',
        'Participation and awards in security competitions',
        'Open-source development for digital forensics',
      ],
    },
    ja: {
      '学部4年生〜修士2年生': [
        'ログデータの分析・可視化に関する研究',
        '自然言語処理に関する研究',
        '機械学習を用いた感情極性分析に関する研究',
        'ITベンチャー企業にて約3年間、Webエンジニアとして勤務',
        'Angular / Vueを用いたフロントエンド開発',
        'Django REST frameworkを用いたバックエンド開発',
        'Elasticsearchを活用した全文検索機能の開発',
        'PostgreSQLのパフォーマンス改善、データ構造・クエリの最適化',
        'GitLab / GitLab CIの導入およびパフォーマンス改善',
        'デジタルフォレンジックに関するOSS開発',
      ],
      '修士号取得後〜現在': [
        'インシデント調査対応',
        'デジタルフォレンジック調査・マルウェア解析',
        '全社セキュリティガバナンスに関する業務',
        '脅威インテリジェンスの収集・分析・情報発信',
        '産学官連携に関する活動',
        'サイバーセキュリティ技術講師',
        '大学におけるインシデントレスポンス講義',
        'サイバーセキュリティ人材育成',
        'セキュリティコンテストへの参加・入賞',
        'デジタルフォレンジックに関するOSS開発',
      ],
    },
  } satisfies Record<SiteLanguage, Record<string, string[]>>;

export const techstack: Record<string, string[]> = {
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

