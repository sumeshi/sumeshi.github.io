import assert from 'node:assert/strict';
import { findPostLinkMetadata, loadGitHubRepoMetadata, loadPostLinkMetadata } from '../src/lib/link-preview-metadata.ts';

const posts = [{
  title: 'Example', heading: 'Example heading', path: '/posts/works/example',
  description: 'Example description', published_at: '2026-01-01T00:00:00Z',
}];
const originalFetch = globalThis.fetch;
let calls = 0;
globalThis.fetch = async () => {
  calls += 1;
  return Response.json(posts);
};

try {
  assert.equal(findPostLinkMetadata('/posts/works/example?from=related#section', posts)?.title, 'Example heading');
  assert.equal(findPostLinkMetadata('/posts/works/missing', posts), null);
  assert.equal(findPostLinkMetadata('/posts/works/example', [{ ...posts[0], heading: 'Updated' }])?.title, 'Updated');
  assert.equal(calls, 0, 'injected post metadata must not make a network request');

  const [first, second] = await Promise.all([
    loadPostLinkMetadata('/posts/works/example'),
    loadPostLinkMetadata('/posts/works/example#section'),
  ]);
  assert.deepEqual(first, second);
  assert.equal(calls, 1, 'concurrent post cards must share the index request');

  calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return Response.json({ full_name: 'owner/repo', description: 'Repository' });
  };
  const [repo, duplicate] = await Promise.all([
    loadGitHubRepoMetadata('owner', 'repo'),
    loadGitHubRepoMetadata('OWNER', 'REPO'),
  ]);
  assert.deepEqual(repo, duplicate);
  assert.equal(calls, 1, 'GitHub names are case insensitive and share a request');

  calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return calls === 1 ? new Response('', { status: 503 }) : Response.json({ full_name: 'owner/retry' });
  };
  await assert.rejects(loadGitHubRepoMetadata('owner', 'retry'));
  assert.equal((await loadGitHubRepoMetadata('owner', 'retry')).full_name, 'owner/retry');
  assert.equal(calls, 2, 'failed requests must not remain cached');
} finally {
  globalThis.fetch = originalFetch;
}

console.log('Verified injected card metadata, shared requests, URL suffixes, and retry after failure.');
