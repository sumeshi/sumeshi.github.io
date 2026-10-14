import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';

export type SiteLanguage = 'en' | 'ja';

export const siteLanguageKey = Symbol('site-language');

export function getSiteLanguage(): Writable<SiteLanguage> {
  return getContext(siteLanguageKey);
}

export function languageForPathname(pathname: string): SiteLanguage {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

  if (normalizedPath === '/' || normalizedPath.endsWith('-en')) {
    return 'en';
  }

  return 'ja';
}
