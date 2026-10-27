import type { Handle } from '@sveltejs/kit/hooks';
import { languageForPathname } from '#lib/site-language.ts';

export const handle: Handle = async ({ event, resolve }) => {
  const language = languageForPathname(event.url.pathname);

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('<html lang="en">', `<html lang="${language}">`),
  });
};
