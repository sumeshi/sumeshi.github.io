import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteUrl = 'https://sumeshi.github.io';
const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = join(rootDir, 'build');
const sitemapPath = join(buildDir, 'sitemap.xml');
const robotsPath = join(buildDir, 'robots.txt');
const errors = [];

const fail = (message) => {
  errors.push(message);
};

if (!existsSync(sitemapPath)) {
  fail('build/sitemap.xml does not exist');
}

if (!existsSync(robotsPath)) {
  fail('build/robots.txt does not exist');
}

let xml = '';
if (existsSync(sitemapPath)) {
  xml = readFileSync(sitemapPath, 'utf8');
  if (!xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
    fail('build/sitemap.xml does not contain a sitemap urlset');
  }
}

const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (locations.length === 0) {
  fail('build/sitemap.xml does not contain any loc entries');
}

const seen = new Set();
for (const location of locations) {
  if (seen.has(location)) {
    fail(`duplicate sitemap location: ${location}`);
    continue;
  }
  seen.add(location);

  let url;
  try {
    url = new URL(location);
  } catch {
    fail(`invalid sitemap URL: ${location}`);
    continue;
  }

  if (url.origin !== siteUrl) {
    fail(`sitemap URL uses unexpected origin: ${location}`);
  }

  if (url.protocol !== 'https:') {
    fail(`sitemap URL must use https: ${location}`);
  }

  if (url.search || url.hash) {
    fail(`sitemap URL must not include query strings or fragments: ${location}`);
  }

  const localPage =
    url.pathname === '/' ? 'index.html' : `${url.pathname.replace(/^\//, '')}.html`;
  if (!existsSync(join(buildDir, localPage))) {
    fail(`sitemap URL has no matching build page: ${location} -> build/${localPage}`);
  }
}

if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, 'utf8');
  const sitemapDirective = `Sitemap: ${siteUrl}/sitemap.xml`;
  if (!robots.includes(sitemapDirective)) {
    fail(`build/robots.txt does not include "${sitemapDirective}"`);
  }
}

if (errors.length > 0) {
  console.error('Sitemap verification failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Verified sitemap.xml with ${locations.length} URLs.`);
