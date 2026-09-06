export const siteUrl = 'https://sumeshi.github.io';
export const siteName = 'SIPDEP';
export const siteAuthor = 'S.Nakano';
export const siteHomeTitle = `${siteName} | Digital Forensics / Software Development`;
export const siteWebsiteId = `${siteUrl}/#website`;
export const sitePersonId = `${siteUrl}/#person`;
export const siteBlogId = `${siteUrl}/posts#blog`;
export const siteFeedUrl = `${siteUrl}/feed.xml`;
export const siteOgImageUrl = `${siteUrl}/img/og-card.png`;
export const siteProfileImageUrl = `${siteUrl}/img/me.jpg`;
export const siteDescription =
  'デジタルフォレンジック(DFIR), マルウェア解析, OSS開発などに関する活動をまとめた個人ブログ。';
export const siteHomeDescription =
  'SIPDEP is a personal site about digital forensics, incident response, malware analysis, and open-source software development.';
export const xHandle = '@sum3sh1';
export const siteSameAs = [
  'https://github.com/sumeshi',
  'https://x.com/sum3sh1',
  'https://zenn.dev/sum3sh1',
  'https://note.com/sumeshi_kun/',
  'https://dev.to/sum3sh1',
  'https://qiita.com/sumeshi',
  'https://speakerdeck.com/sumeshi',
];

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
