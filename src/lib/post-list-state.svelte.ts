import { createAsyncDataState } from '$lib/load-state.svelte';
import type { PostIndex } from '$lib/types';

type PostListRequest = (signal?: AbortSignal) => Promise<PostIndex[]>;

type PostListOptions = {
  errorMessage: string;
  notFoundMessage?: string;
  initialValue?: PostIndex[];
  getRequest: () => PostListRequest | null;
  onError?: (error: unknown) => void;
};

export function createPostListState(options: PostListOptions) {
  const initialValue = options.initialValue ?? [];
  const postState = createAsyncDataState<PostIndex[]>(initialValue);
  let skipInitialRequest = initialValue.length > 0;

  if (initialValue.length > 0) {
    postState.state.loading = false;
  }

  $effect(() => {
    const request = options.getRequest();

    if (!request) {
      postState.fail(options.notFoundMessage ?? options.errorMessage, []);
      return;
    }

    if (skipInitialRequest) {
      skipInitialRequest = false;
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
