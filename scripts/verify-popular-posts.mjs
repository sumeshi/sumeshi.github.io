import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dataPath = join(process.cwd(), 'src', 'lib', 'generated', 'popular-posts.json');
const data = JSON.parse(readFileSync(dataPath, 'utf8'));

if (data?.periodDays !== 90 || !Array.isArray(data?.paths)) {
  throw new Error('popular-posts.json has an invalid shape');
}

if (data.paths.length > 5 || new Set(data.paths).size !== data.paths.length) {
  throw new Error('popular-posts.json must contain no more than five unique paths');
}

for (const path of data.paths) {
  if (typeof path !== 'string' || !/^\/posts\/[^/?#]+\/[^/?#]+$/.test(path)) {
    throw new Error(`popular-posts.json contains an invalid path: ${String(path)}`);
  }

  const generatedPostPath = join(process.cwd(), 'build', `${path.slice(1)}.html`);
  if (!existsSync(generatedPostPath)) {
    throw new Error(`popular-posts.json references a post that was not generated: ${path}`);
  }
}

console.log(`Verified popular-posts.json with ${data.paths.length} paths.`);
