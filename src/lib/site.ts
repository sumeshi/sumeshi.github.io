export const siteUrl = 'https://sumeshi.github.io';
export const siteName = 'SIPDep';
export const siteDescription =
  'デジタルフォレンジック(DFIR), マルウェア解析, OSS開発などに関する活動をまとめた個人ブログ。';

export function pageTitle(section?: string): string {
  return section ? `${section} | ${siteName}` : siteName;
}
