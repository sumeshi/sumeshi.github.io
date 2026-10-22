import { getPostCategory, getPostPath, getPostTitle, fetchPosts } from '#lib/posts.ts';
import type { PostIndex } from '#lib/types.ts';

export interface PostLinkMetadata {
  title: string;
  description: string | null;
  category: string;
}

export interface GitHubRepoMetadata {
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
}

let postIndexPromise: Promise<PostIndex[]> | undefined;
const githubRepoPromises = new Map<string, Promise<GitHubRepoMetadata>>();

function metadataFromPost(path: string, post: PostIndex): PostLinkMetadata {
  const [pathname] = path.split(/[?#]/, 1);
  return {
    title: getPostTitle(post),
    description: post.description || null,
    category: getPostCategory(pathname),
  };
}

export function findPostLinkMetadata(path: string, posts: PostIndex[]): PostLinkMetadata | null {
  const [pathname] = path.split(/[?#]/, 1);
  const expectedPath = getPostPath(pathname);
  const post = posts.find((candidate) => getPostPath(candidate.path) === expectedPath);
  return post ? metadataFromPost(pathname, post) : null;
}

async function getPostIndex(): Promise<PostIndex[]> {
  postIndexPromise ??= fetchPosts().catch((error: unknown) => {
    postIndexPromise = undefined;
    throw error;
  });
  return postIndexPromise;
}

export async function loadPostLinkMetadata(path: string): Promise<PostLinkMetadata | null> {
  return findPostLinkMetadata(path, await getPostIndex());
}

export function loadGitHubRepoMetadata(owner: string, repo: string): Promise<GitHubRepoMetadata> {
  const key = `${owner.toLowerCase()}/${repo.toLowerCase()}`;
  let request = githubRepoPromises.get(key);
  if (!request) {
    request = fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`, {
      headers: { Accept: 'application/vnd.github+json' },
    }).then(async (response) => {
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      return (await response.json()) as GitHubRepoMetadata;
    }).catch((error: unknown) => {
      githubRepoPromises.delete(key);
      throw error;
    });
    githubRepoPromises.set(key, request);
  }
  return request;
}
