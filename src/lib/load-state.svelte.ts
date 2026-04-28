type LoadRequest<T> = (signal?: AbortSignal) => Promise<T>;

type LoadOptions<T> = {
  errorMessage: string;
  onSuccess?: (value: T) => void | Promise<void>;
  onError?: (error: unknown) => void;
  resetValueOnError?: boolean;
};

export function createAsyncDataState<T>(initialValue: T) {
  const state = $state({
    value: initialValue,
    loading: true,
    errorMessage: '',
  });

  async function load(request: LoadRequest<T>, options: LoadOptions<T>, signal?: AbortSignal): Promise<void> {
    state.loading = true;
    state.errorMessage = '';

    try {
      const value = await request(signal);
      state.value = value;
      await options.onSuccess?.(value);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      state.errorMessage = options.errorMessage;

      if (options.resetValueOnError !== false) {
        state.value = initialValue;
      }

      options.onError?.(error);
    } finally {
      state.loading = false;
    }
  }

  function fail(message: string, value: T = initialValue): void {
    state.value = value;
    state.loading = false;
    state.errorMessage = message;
  }

  function reset(value: T = initialValue): void {
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
