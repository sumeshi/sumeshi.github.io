export type Mention = {
    date: string;
    media: string;
    url: string;
    description?: string;
  };

export type MentionedArticle = {
    titleEn: string;
    titleJa: string;
    sourceEn?: string;
    sourceJa?: string;
    mentions: Mention[];
  };

export const articles: MentionedArticle[] = [
    {
      titleEn: 'NTFS Spinal Cord Sword',
      titleJa: 'NTFS脊髄剣',
      sourceEn: '/posts/works/ntfsfind-dump-en',
      sourceJa: '/posts/works/ntfsfind-dump',
      mentions: [
        {
          date: '2026-10-12',
          media: 'Forensic Focus / DFIR News, 12 Oct 2026',
          url: 'https://www.forensicfocus.com/news/headlines/dfir-news-12-oct-2026/',
        },
        {
          date: '2026-10-11',
          media: 'This Week in 4n6 / WEEK 41 - 2026',
          url: 'https://thisweekin4n6.com/2026/10/11/week-41-2026/',
        },
      ],
    },
    {
      titleEn: 'a tale of volatile memories.',
      titleJa: 'Windowsは世界に一人。だからWindowsは神様だ。',
      sourceEn: '/posts/knowledges/windows-memory-forensics-101-en',
      sourceJa: '/posts/knowledges/windows-memory-forensics-101',
      mentions: [
        {
          date: '2026-10-05',
          media: 'Forensic Focus / DFIR News, 05 Oct 2026',
          url: 'https://www.forensicfocus.com/news/headlines/dfir-news-05-oct-2026/',
        },
        {
          date: '2026-10-04',
          media: 'This Week in 4n6 / WEEK 40 - 2026',
          url: 'https://thisweekin4n6.com/2026/10/04/week-40-2026/',
        },
      ],
    },
    {
      titleEn: "Don't Make AI Your Forensic Analyst",
      titleJa: 'AIにフォレンジックさせるのをやめよう',
      sourceEn: '/posts/works/dont-make-ai-your-forensic-analyst-en',
      sourceJa: '/posts/works/dont-make-ai-your-forensic-analyst',
      mentions: [
        {
          date: '2026-09-17',
          media: 'CCE Intelligence Hub / CCE Technical Intelligence Briefing - Volume 15',
          url: 'https://intelligence.isfce.com/edition/volume-15-2026-09-17',
        },
        {
          date: '2026-09-06',
          media: 'This Week in 4n6 / WEEK 36 - 2026',
          url: 'https://thisweekin4n6.com/2026/09/06/week-36-2026/',
        },
      ],
    },
    {
      titleEn: 'Do Local LLMs Dream of Forensic Investigators?',
      titleJa: 'ローカルLLMはフォレンジック調査官の夢を見るか？',
      sourceEn: '/posts/works/do-localllms-dream-of-forensic-investigator-en',
      sourceJa: '/posts/works/do-localllms-dream-of-forensic-investigator',
      mentions: [
        {
          date: '2026-08-15',
          media: 'CTO at NCSC - Cyber Defence Analysis / Summary: week ending August 16th',
          url: 'https://ctoatncsc.substack.com/p/cto-at-ncsc-summary-week-ending-august-10c',
        },
      ],
    },
    {
      titleEn: 'How Do You Investigate Windows Event Logs?',
      titleJa: '君たちはどうWindowsイベントログを調査するか',
      sourceEn: '/posts/knowledges/windows-eventlog-analysis-101-en',
      sourceJa: '/posts/knowledges/windows-eventlog-analysis-101',
      mentions: [
        {
          date: '2026-10-12',
          media: 'Forensic Focus / DFIR News, 12 Oct 2026',
          url: 'https://www.forensicfocus.com/news/headlines/dfir-news-12-oct-2026/',
        },
        {
          date: '2026-10-11',
          media: 'This Week in 4n6 / WEEK 41 - 2026',
          url: 'https://thisweekin4n6.com/2026/10/11/week-41-2026/',
        },
        {
          date: '2026-10-03',
          media: 'CTO at NCSC - Cyber Defence Analysis / Summary: week ending October 4th',
          url: 'https://ctoatncsc.substack.com/p/cto-at-ncsc-summary-week-ending-october-8fd',
        },
        {
          date: '2026-09-28',
          media: 'Forensic Focus / DFIR News, 28 Sep 2026',
          url: 'https://www.forensicfocus.com/news/headlines/dfir-news-28-sep-2026/',
        },
        {
          date: '2026-09-06',
          media: 'This Week in 4n6 / WEEK 39 - 2026',
          url: 'https://thisweekin4n6.com/2026/09/27/week-39-2026/',
        },
      ],
    },
    {
      titleEn: '*2es/json',
      titleJa: 'Windows Forensic Artifact Parsers',
      sourceEn: '/works',
      sourceJa: '/works',
      mentions: [
        {
          date: '2026-04-16',
          media: 'DRIFT Linux',
          url: 'https://www.driftlinux.org/',
          description: 'evtx2json is included as a Windows Event Log analysis tool.',
        },
        {
          date: '2022-01-19',
          media: 'Tsurugi Linux [LAB]',
          url: 'https://tsurugi-linux.org/tsurugi_linux.php',
          description: 'evtx2es/json and mft2es/json are included for Windows Event Log and NTFS MFT analysis.',
        },
        {
          date: '2021-10-01',
          media: 'Security Onion',
          url: 'https://docs.securityonion.net/en/3/main/software-bill-of-materials/',
          description: 'evtx2es is integrated into the EVTX import workflow.',
        },
        {
          date: '2020-01-03',
          media: 'ELK Detection Lab',
          url: 'https://github.com/thomaspatzke/elk-detection-lab',
          description: 'evtx2es is used to import the EVTX-ATTACK-SAMPLES dataset.',
        },
      ],
    },
  ];


