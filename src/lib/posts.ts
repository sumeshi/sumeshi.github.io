import type { PostIndex } from '$lib/types';

const POSTS_API_BASE = 'https://sumeshi.github.io/api/posts';

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getPostListTitle(post: PostIndex): string {
  // Some legacy entries expose a friendlier `heading` than the canonical `title`.
  return post.heading || post.title || 'Untitled';
}

export function formatPostListDate(value?: string): string {
  return value?.slice(0, 10) ?? '';
}

export function formatPostPublishedAt(value?: string): string {
  if (!value) {
    return '';
  }

  return value.replace('T', ' ').slice(0, 16);
}

export function formatPostDateTime(value?: string): string {
  return value ? value.replace('T', ' ').slice(0, 16) : '';
}

export function orderPostsDescending(posts: PostIndex[]): PostIndex[] {
  return [...posts].reverse();
}

export async function fetchPosts(signal?: AbortSignal): Promise<PostIndex[]> {
  const posts = await fetchJson<PostIndex[]>(`${POSTS_API_BASE}/`, signal);
  return orderPostsDescending(posts);
}

export async function fetchCategoryPosts(categoryName: string, signal?: AbortSignal): Promise<PostIndex[]> {
  const posts = await fetchJson<PostIndex[]>(`${POSTS_API_BASE}/${encodeURIComponent(categoryName)}`, signal);
  return orderPostsDescending(posts);
}
