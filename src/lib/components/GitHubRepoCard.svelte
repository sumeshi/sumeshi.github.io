<script lang="ts">
  interface Props {
    /** GitHub repository URL, e.g. `https://github.com/sumeshi/evtx2es` */
    url: string;
  }

  let { url }: Props = $props();

  interface GitHubRepo {
    full_name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    fork: boolean;
  }

  const repoPath = $derived(url.replace(/^https?:\/\/github\.com\//, '').replace(/\/+$/, ''));
  const [owner, repoName] = $derived.by(() => {
    const segments = repoPath.split('/');
    return [segments[0] ?? '', segments[1] ?? ''];
  });

  let repoState = $state<{
    status: 'loading' | 'loaded' | 'error';
    repo: GitHubRepo | null;
  }>({
    status: 'loading',
    repo: null,
  });

  $effect(() => {
    const controller = new AbortController();
    repoState = { status: 'loading', repo: null };

    fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repoName)}`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        repoState = { status: 'loaded', repo: (await response.json()) as GitHubRepo };
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        console.error(error);
        repoState = { status: 'error', repo: null };
      });

    return () => controller.abort();
  });

  function formatCount(count: number): string {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }

    return String(count);
  }
</script>

<a
  href={url}
  target="_blank"
  rel="noreferrer"
  class="group my-5 flex gap-3.5 rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3.5 transition-colors hover:border-indigo-400/40 hover:bg-indigo-950/20"
>
  <span class="flex shrink-0 items-center border-r border-gray-800 pr-3.5">
    <svg class="h-8 w-8 text-gray-300 transition-colors group-hover:text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  </span>
  <span class="flex min-w-0 flex-col gap-1">
    <span class="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-indigo-400">
      GitHub{repoState.repo?.fork ? ' · Fork' : ''}
    </span>
    <span class="truncate font-mono text-base font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-indigo-300">
      {repoPath}
    </span>
    {#if repoState.status === 'loaded' && repoState.repo?.description}
      <span class="text-sm leading-snug text-gray-400">
        {repoState.repo.description}
      </span>
    {/if}
    <span class="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-gray-500">
      {#if repoState.status === 'loaded' && repoState.repo}
        {#if repoState.repo.language}
          <span class="flex items-center gap-1.5">
            <span class="h-2.5 w-2.5 rounded-full bg-indigo-400"></span>
            {repoState.repo.language}
          </span>
        {/if}
        <span class="flex items-center gap-1">
          <svg class="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
          {formatCount(repoState.repo.stargazers_count)}
        </span>
        <span class="flex items-center gap-1">
          <svg class="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
          </svg>
          {formatCount(repoState.repo.forks_count)}
        </span>
      {:else if repoState.status === 'loading'}
        <span class="animate-pulse">loading…</span>
      {/if}
      <span class="flex items-center gap-1.5">
        <svg class="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
        <span class="truncate">github.com/{repoPath}</span>
      </span>
    </span>
  </span>
</a>
