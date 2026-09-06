import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SITE_ORIGIN = 'https://sumeshi.github.io';
const POSTS_API_URL = `${SITE_ORIGIN}/api/posts/`;
const OUTPUT_PATH = join(process.cwd(), 'src', 'lib', 'generated', 'popular-posts.json');
const PERIOD_DAYS = 90;
const MAX_POPULAR_POSTS = 5;
const REQUEST_TIMEOUT_MS = 20_000;

function canonicalPostPath(value) {
  if (typeof value !== 'string') {
    return null;
  }

  let pathname;

  try {
    const url = new URL(value, SITE_ORIGIN);
    if (url.origin !== SITE_ORIGIN) {
      return null;
    }
    pathname = url.pathname;
  } catch {
    return null;
  }

  const segments = pathname
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean);
  const offset = segments[0] === 'posts' ? 1 : 0;

  if (segments.length !== offset + 2) {
    return null;
  }

  try {
    const [category, postId] = segments.slice(offset).map((segment) =>
      encodeURIComponent(decodeURIComponent(segment)),
    );
    return `/posts/${category}/${postId}`;
  } catch {
    return null;
  }
}

function writePopularPostData(paths) {
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(
    OUTPUT_PATH,
    `${JSON.stringify({ periodDays: PERIOD_DAYS, paths }, null, 2)}\n`,
    { mode: 0o644 },
  );
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

async function generatePopularPosts() {
  const propertyId = process.env.GA4_PROPERTY_ID?.trim();
  const accessToken = process.env.GA4_ACCESS_TOKEN?.trim();

  if (!propertyId || !accessToken) {
    writePopularPostData([]);
    console.log('GA4 configuration is unavailable; generated an empty popular-post list.');
    return;
  }

  if (!/^\d+$/.test(propertyId)) {
    throw new Error('GA4_PROPERTY_ID must contain digits only');
  }

  const [report, postIndex] = await Promise.all([
    fetchJson(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: `${PERIOD_DAYS - 1}daysAgo`, endDate: 'today' }],
          dimensions: [{ name: 'pagePath' }],
          metrics: [{ name: 'screenPageViews' }],
          dimensionFilter: {
            filter: {
              fieldName: 'pagePath',
              stringFilter: { matchType: 'BEGINS_WITH', value: '/posts/' },
            },
          },
          orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
          // Fetch the full small path set, then merge URL variants before ranking.
          // Ranking only the first few GA rows can undercount one article when
          // both trailing-slash and non-trailing-slash paths exist.
          limit: '10000',
        }),
      },
    ),
    fetchJson(POSTS_API_URL),
  ]);

  if (!Array.isArray(postIndex)) {
    throw new Error('Post index response is not an array');
  }

  const publishedPaths = new Set(
    postIndex.map((post) => canonicalPostPath(post?.path)).filter(Boolean),
  );
  const viewsByPath = new Map();

  for (const row of report?.rows ?? []) {
    const path = canonicalPostPath(row?.dimensionValues?.[0]?.value);
    const views = Number.parseInt(row?.metricValues?.[0]?.value ?? '', 10);

    if (!path || !publishedPaths.has(path) || !Number.isSafeInteger(views) || views < 0) {
      continue;
    }

    viewsByPath.set(path, (viewsByPath.get(path) ?? 0) + views);
  }

  const paths = [...viewsByPath.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, MAX_POPULAR_POSTS)
    .map(([path]) => path);

  writePopularPostData(paths);
  console.log(`Generated ${paths.length} popular post paths from the last ${PERIOD_DAYS} days.`);
}

try {
  await generatePopularPosts();
} catch (error) {
  writePopularPostData([]);
  console.warn(`Popular-post generation failed safely: ${error instanceof Error ? error.message : 'unknown error'}`);
}
