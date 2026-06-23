export const siteUrl = 'https://sumeshi.github.io';
export const siteName = 'SIPDEP';
export const siteAuthor = 'S.Nakano';
export const siteDescription =
  'デジタルフォレンジック(DFIR), マルウェア解析, OSS開発などに関する活動をまとめた個人ブログ。';
export const xHandle = '@sum3sh1';

export function pageTitle(section?: string): string {
  return section ? `${section} | ${siteName}` : siteName;
}

export function canonicalUrlForPath(pathname: string): string {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  return `${siteUrl}${normalizedPath}`;
}

export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
