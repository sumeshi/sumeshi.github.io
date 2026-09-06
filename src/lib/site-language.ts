export type SiteLanguage = 'en' | 'ja';

export function languageForPathname(pathname: string): SiteLanguage {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

  if (normalizedPath === '/' || normalizedPath === '/about' || normalizedPath.endsWith('-en')) {
    return 'en';
  }

  return 'ja';
}
