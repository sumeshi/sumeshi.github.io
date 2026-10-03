import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const buildDirectory = join(process.cwd(), 'build');

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
  });
}

if (!existsSync(buildDirectory)) {
  throw new Error('build directory does not exist');
}

const files = htmlFiles(buildDirectory);
const fallbackPath = join(buildDirectory, '404.html');
const indexableFiles = files.filter((file) => file !== fallbackPath);
const seenTitles = new Map();
const seenCanonicals = new Map();

function isTranslationPair(first, second) {
  const english = first.relativePath.endsWith('-en.html') ? first : second;
  const japanese = english === first ? second : first;

  if (!/^posts\/[^/]+\/[^/]+-en\.html$/.test(english.relativePath)
    || english.relativePath.replace(/-en\.html$/, '.html') !== japanese.relativePath
    || !english.html.includes('<html lang="en">')
    || !japanese.html.includes('<html lang="ja">')) {
    return false;
  }

  return [english, japanese].every(({ html }) => {
    const alternates = new Map(
      [...html.matchAll(/<link\b[^>]*>/g)].flatMap(([tag]) => {
        if (!/\brel="alternate"/.test(tag)) return [];
        const language = tag.match(/\bhreflang="([^"]+)"/)?.[1];
        const href = tag.match(/\bhref="([^"]+)"/)?.[1];
        return language && href ? [[language, href]] : [];
      }),
    );
    return alternates.get('ja') === japanese.canonical
      && alternates.get('en') === english.canonical
      && alternates.get('x-default') === japanese.canonical;
  });
}

for (const file of indexableFiles) {
  const html = readFileSync(file, 'utf8');
  const relativePath = file.slice(buildDirectory.length + 1);
  const requiredPatterns = [
    [/<html lang="(?:en|ja)">/, 'language'],
    [/<title>[^<]+<\/title>/, 'title'],
    [/<meta name="description" content="[^"]+"/, 'description'],
    [/<link rel="canonical" href="https:\/\/sumeshi\.github\.io\//, 'canonical URL'],
    [/<meta name="robots" content="index, follow"/, 'index directive'],
    [/<h1\b/, 'h1'],
  ];

  for (const [pattern, label] of requiredPatterns) {
    if (!pattern.test(html)) {
      throw new Error(`${relativePath} is missing ${label}`);
    }
  }

  const h1Count = (html.match(/<h1\b/g) ?? []).length;
  if (h1Count !== 1) {
    throw new Error(`${relativePath} contains ${h1Count} h1 elements`);
  }

  for (const image of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(image[0])) {
      throw new Error(`${relativePath} contains an image without alt text`);
    }
  }

  for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(script[1]);
    } catch (error) {
      throw new Error(`${relativePath} contains invalid JSON-LD`, { cause: error });
    }
  }

  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];

  const currentPage = { relativePath, html, canonical };
  const previousPages = seenTitles.get(title) ?? [];
  for (const previousPage of previousPages) {
    if (!isTranslationPair(previousPage, currentPage)) {
      throw new Error(`${relativePath} duplicates title from ${previousPage.relativePath}`);
    }
  }
  seenTitles.set(title, [...previousPages, currentPage]);

  const previousCanonicalPath = seenCanonicals.get(canonical);
  if (previousCanonicalPath) {
    throw new Error(`${relativePath} duplicates canonical URL from ${previousCanonicalPath}`);
  }
  seenCanonicals.set(canonical, relativePath);
}

const fallbackHtml = readFileSync(fallbackPath, 'utf8');
if (!fallbackHtml.includes('<meta name="robots" content="noindex, follow"')) {
  throw new Error('build/404.html is missing noindex metadata');
}

const listingFiles = [
  join(buildDirectory, 'index.html'),
  join(buildDirectory, 'posts.html'),
  ...files.filter((file) => /\/posts\/[^/]+\.html$/.test(file)),
];

for (const file of listingFiles) {
  const html = readFileSync(file, 'utf8');
  if (!/<a href="(?:\.\.\/|\.\/|\/)posts\/[^"/]+\/[^"/]+"/.test(html)) {
    throw new Error(`${file.slice(buildDirectory.length + 1)} has no prerendered post links`);
  }
}

const englishPostFiles = files.filter((file) => /\/posts\/[^/]+\/[^/]+-en\.html$/.test(file));

for (const englishFile of englishPostFiles) {
  const japaneseFile = englishFile.replace(/-en\.html$/, '.html');

  if (!existsSync(japaneseFile)) {
    continue;
  }

  for (const file of [englishFile, japaneseFile]) {
    const html = readFileSync(file, 'utf8');
    for (const hreflang of ['ja', 'en', 'x-default']) {
      if (!html.includes(`hreflang="${hreflang}"`)) {
        throw new Error(`${file.slice(buildDirectory.length + 1)} is missing ${hreflang} hreflang`);
      }
    }
  }
}

console.log(
  `Verified SEO metadata across ${indexableFiles.length} indexable HTML files and ${englishPostFiles.length} English post pairs.`,
);
