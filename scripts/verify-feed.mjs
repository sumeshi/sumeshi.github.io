import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const feedPath = join(process.cwd(), 'build', 'feed.xml');

if (!existsSync(feedPath)) {
  throw new Error('build/feed.xml does not exist');
}

const xml = readFileSync(feedPath, 'utf8');
const requiredFragments = [
  '<rss version="2.0"',
  '<channel>',
  '<atom:link ',
  '<item>',
  '<guid isPermaLink="true">',
];

for (const fragment of requiredFragments) {
  if (!xml.includes(fragment)) {
    throw new Error(`build/feed.xml does not contain ${fragment}`);
  }
}

const itemCount = (xml.match(/<item>/g) ?? []).length;
console.log(`Verified feed.xml with ${itemCount} items.`);
