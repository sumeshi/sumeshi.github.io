type LoadRequest<T> = (signal?: AbortSignal) => Promise<T>;

type LoadOptions<T> = {
  errorMessage: string;
  onSuccess?: (value: T, isCurrent: () => boolean) => void | Promise<void>;
  onError?: (error: unknown) => void;
  resetValueOnError?: boolean;
};

export function createAsyncDataState<T>(initialValue: T) {
  const state = $state({
    value: initialValue,
    loading: true,
    errorMessage: '',
  });
  let requestVersion = 0;

  async function load(request: LoadRequest<T>, options: LoadOptions<T>, signal?: AbortSignal): Promise<void> {
    const version = ++requestVersion;
    const isLatest = () => version === requestVersion;
    const isCurrent = () => isLatest() && !signal?.aborted;
    state.loading = true;
    state.errorMessage = '';

    try {
      const value = await request(signal);
      if (!isCurrent()) return;
      state.value = value;
      await options.onSuccess?.(value, isCurrent);
    } catch (error) {
      if (!isCurrent()) return;
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      state.errorMessage = options.errorMessage;

      if (options.resetValueOnError !== false) {
        state.value = initialValue;
      }

      options.onError?.(error);
    } finally {
      if (isLatest()) state.loading = false;
    }
  }

  function fail(message: string, value: T = initialValue): void {
    requestVersion += 1;
    state.value = value;
    state.loading = false;
    state.errorMessage = message;
  }

  function reset(value: T = initialValue): void {
    requestVersion += 1;
    state.value = value;
    state.loading = true;
    state.errorMessage = '';
  }

  return {
    state,
    load,
    fail,
    reset,
  };
}
