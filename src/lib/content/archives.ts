import type { SiteLanguage } from '#lib/site-language.ts';

export const repositoryUrl = 'https://github.com/sumeshi/sipdep-archives';

export type Archive = {
    title: Record<SiteLanguage, string>;
    summary: Record<SiteLanguage, string>;
    imageUrl: string;
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
        ja: 'フォレンジック調査・インシデント対応で参照する Windows イベント ID をまとめたポスター。',
        en: 'A quick reference to Windows Event IDs for forensic investigations and incident response.',
      },
      imageUrl: 'https://github.com/user-attachments/assets/b1484862-32d3-442c-bdc4-950d0be3c482',
      imageAlt: {
        ja: 'Windows イベントログ調査ポスターのプレビュー（英語版）',
        en: 'Preview of the Windows Event Log investigation poster (English version)',
      },
      hrefs: [
        { label: 'Download ja', url: `${repositoryUrl}/blob/main/posters/windows-eventlog-analysis-101-ja.pdf` },
        { label: 'Download en', url: `${repositoryUrl}/blob/main/posters/windows-eventlog-analysis-101-en.pdf` },
      ],
    },
  ];

