import { POSTS_API_BASE } from '$lib/config';
import { siteUrl } from '$lib/site';
import type { PostIndex } from '$lib/types';

type PostRouteEntry = {
  categoryName: string;
  postId: string;
};

let postIndexPromise: Promise<PostIndex[]> | undefined;

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function decodePathSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export async function fetchPostIndexForBuild(): Promise<PostIndex[]> {
  postIndexPromise ??= fetchJson<PostIndex[]>(`${POSTS_API_BASE}/`);
  return postIndexPromise;
}

export function postRouteEntry(post: PostIndex): PostRouteEntry | null {
  const segments = post.path
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean);
  const offset = segments[0] === 'posts' ? 1 : 0;

  if (segments.length < offset + 2) {
    return null;
  }

  return {
    categoryName: decodePathSegment(segments[offset]),
    postId: decodePathSegment(segments[offset + 1]),
  };
}

export function uniqueCategoryEntries(posts: PostIndex[]): Array<Pick<PostRouteEntry, 'categoryName'>> {
  const seen = new Set<string>();
  const entries: Array<Pick<PostRouteEntry, 'categoryName'>> = [];

  for (const post of posts) {
    const entry = postRouteEntry(post);

    if (!entry || seen.has(entry.categoryName)) {
      continue;
    }

    seen.add(entry.categoryName);
    entries.push({ categoryName: entry.categoryName });
  }

  return entries;
}

export function uniquePostEntries(posts: PostIndex[]): PostRouteEntry[] {
  const seen = new Set<string>();
  const entries: PostRouteEntry[] = [];

  for (const post of posts) {
    const entry = postRouteEntry(post);

    if (!entry) {
      continue;
    }

    const key = `${entry.categoryName}/${entry.postId}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    entries.push(entry);
  }

  return entries;
}

export function postPathFromEntry(entry: PostRouteEntry): string {
  return `/posts/${encodeURIComponent(entry.categoryName)}/${encodeURIComponent(entry.postId)}`;
}

export function postUrlFromEntry(entry: PostRouteEntry): string {
  return `${siteUrl}${postPathFromEntry(entry)}`;
}
