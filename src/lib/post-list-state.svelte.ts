import { createAsyncDataState } from '$lib/load-state.svelte';
import type { PostIndex } from '$lib/types';

type PostListRequest = (signal?: AbortSignal) => Promise<PostIndex[]>;

type PostListOptions = {
  errorMessage: string;
  notFoundMessage?: string;
  getRequest: () => PostListRequest | null;
  onError?: (error: unknown) => void;
};

export function createPostListState(options: PostListOptions) {
  const postState = createAsyncDataState<PostIndex[]>([]);

  $effect(() => {
    const request = options.getRequest();

    if (!request) {
      postState.fail(options.notFoundMessage ?? options.errorMessage, []);
      return;
    }

    const controller = new AbortController();

    void postState.load(request, {
      errorMessage: options.errorMessage,
      onError: options.onError,
    }, controller.signal);

    return () => controller.abort();
  });

  return postState;
}
