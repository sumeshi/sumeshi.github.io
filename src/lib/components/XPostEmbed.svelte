<script module lang="ts">
  type XWidgets = {
    ready?: (callback: (x: XWidgets) => void) => void;
    widgets?: {
      createTweet: (
        tweetId: string,
        element: HTMLElement,
        options?: { theme?: 'dark' | 'light'; dnt?: boolean; align?: 'left' | 'center' | 'right' },
      ) => Promise<HTMLElement | undefined>;
    };
  };

  type XWindow = Window & { twttr?: XWidgets };

  const SCRIPT_ID = 'x-widgets-script';
  let loadScriptPromise: Promise<XWidgets> | undefined;

  function xWindow(): XWindow {
    return window as XWindow;
  }

  function loadWidgets(): Promise<XWidgets> {
    if (xWindow().twttr?.widgets) return Promise.resolve(xWindow().twttr!);
    if (loadScriptPromise) return loadScriptPromise;

    loadScriptPromise = new Promise<XWidgets>((resolve, reject) => {
      let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
      const fail = (error: Error) => {
        window.clearTimeout(timeout);
        script?.remove();
        reject(error);
      };
      const timeout = window.setTimeout(() => {
        fail(new Error('Timed out loading X widgets script'));
      }, 15_000);
      const finish = () => {
        const widgets = xWindow().twttr;
        if (!widgets) {
          fail(new Error('X widgets did not initialize'));
          return;
        }
        if (widgets.widgets) {
          window.clearTimeout(timeout);
          resolve(widgets);
          return;
        }
        if (widgets.ready) {
          widgets.ready((readyWidgets) => {
            window.clearTimeout(timeout);
            resolve(readyWidgets);
          });
        } else fail(new Error('X widgets API is not available'));
      };

      const shouldAppend = !script;
      if (!script) {
        script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
      }

      script.addEventListener('load', finish, { once: true });
      script.addEventListener(
        'error',
        () => fail(new Error('Failed to load X widgets script')),
        { once: true },
      );

      if (shouldAppend) document.head.appendChild(script);

      // The script may already have loaded between the initial check and listener setup.
      if (xWindow().twttr) finish();
    }).catch((error: unknown) => {
      loadScriptPromise = undefined;
      throw error;
    });

    return loadScriptPromise;
  }

  function tweetIdFromUrl(value: string): string | undefined {
    return value.match(/status\/(\d+)/)?.[1];
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  let { url }: { url: string } = $props();
  let embedRoot: HTMLDivElement | undefined;
  let fallbackLink: HTMLAnchorElement | undefined;

  onMount(() => {
    let mounted = true;
    const tweetId = tweetIdFromUrl(url);

    if (!tweetId || !embedRoot) return;

    void loadWidgets()
      .then((x) => {
        if (!mounted || !embedRoot || !x.widgets) return;
        return x.widgets.createTweet(tweetId, embedRoot, { theme: 'dark', dnt: true });
      })
      .then((tweet) => {
        if (mounted && tweet && fallbackLink) fallbackLink.hidden = true;
      })
      .catch((error: unknown) => {
        console.error('Unable to load X post', error);
      });

    return () => {
      mounted = false;
    };
  });
</script>

<div class="overflow-hidden">
  <div bind:this={embedRoot} class="flex justify-center"></div>
  <a
    bind:this={fallbackLink}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    class="block text-center text-sm text-gray-400 underline decoration-gray-700 underline-offset-4 hover:text-indigo-300"
  >
    View post on X ↗
  </a>
</div>
