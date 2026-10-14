<script lang="ts">
  import { getSiteLanguage } from '#lib/site-language.ts';

  const language = getSiteLanguage();

  function toggleLanguage(): void {
    language.set($language === 'ja' ? 'en' : 'ja');
    try {
      localStorage.setItem('site-language', $language);
    } catch {
      // The selection still lasts while navigating when storage is disabled.
    }
  }
</script>

<button
  type="button"
  onclick={toggleLanguage}
  lang={$language === 'ja' ? 'en' : 'ja'}
  aria-label={$language === 'ja' ? 'Read in English' : 'Read in Japanese'}
  class="shrink-0 px-2 py-1 font-mono text-xs text-gray-400 transition-colors hover:text-indigo-300"
>[{$language === 'ja' ? 'EN' : 'JA'}]</button>
