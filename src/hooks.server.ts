import type { Handle } from '@sveltejs/kit';
import { languageForPathname } from '$lib/site-language';

export const handle: Handle = async ({ event, resolve }) => {
  const language = languageForPathname(event.url.pathname);

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('<html lang="ja">', `<html lang="${language}">`),
  });
};
