export type SiteLanguage = 'en' | 'ja';

export function languageForPathname(pathname: string): SiteLanguage {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

  if (normalizedPath === '/' || normalizedPath.endsWith('-en')) {
    return 'en';
  }

  return 'ja';
}
