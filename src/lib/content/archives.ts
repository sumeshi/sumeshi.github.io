import type { SiteLanguage } from '#lib/site-language.ts';

const repositoryUrl = 'https://github.com/sumeshi/sipdep-archives';

export type Archive = {
    title: Record<SiteLanguage, string>;
    summary: Record<SiteLanguage, string>;
    imageUrl: string;
    imageHref: string;
    imageAlt: Record<SiteLanguage, string>;
    hrefs: { label: string; url: string }[];
  };

export const archives: Archive[] = [
    {
      title: {
        ja: '君たちはどうWindowsイベントログを調査するか',
        en: 'How Do You Investigate Windows Event Logs?',
      },
      summary: {
        ja: 'Windowsイベントログ調査で参照する、イベントIDをまとめたポスター。',
        en: 'A reference poster of event IDs for Windows event log investigations.',
      },
      imageUrl: 'https://github.com/user-attachments/assets/b1484862-32d3-442c-bdc4-950d0be3c482',
      imageHref: `${repositoryUrl}/blob/main/posters/windows-eventlog-analysis-101-en.pdf`,
      imageAlt: {
        ja: 'Windows イベントログ調査ポスターのプレビュー（英語版）',
        en: 'Preview of the Windows Event Log investigation poster (English version)',
      },
      hrefs: [
        { label: '日本語版 PDF', url: `${repositoryUrl}/blob/main/posters/windows-eventlog-analysis-101-ja.pdf` },
        { label: 'English PDF', url: `${repositoryUrl}/blob/main/posters/windows-eventlog-analysis-101-en.pdf` },
      ],
    },
  ];

