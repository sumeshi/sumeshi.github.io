import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const fallbackPath = join(process.cwd(), 'build', '404.html');
const html = readFileSync(fallbackPath, 'utf8');
const metadata = [
  '<title>Page Not Found | SIPDEP</title>',
  '<meta name="robots" content="noindex, follow" />',
].join('');

if (!html.includes('<meta name="robots" content="noindex, follow"')) {
  writeFileSync(fallbackPath, html.replace('<head>', `<head>${metadata}`));
}

console.log('Finalized build/404.html with noindex metadata.');
