<script lang="ts">
  import { onMount, tick } from 'svelte';

  let { url }: { url: string } = $props();

  type XWindow = Window &
    typeof globalThis & {
      twttr?: {
        ready?: (callback: (twttr: NonNullable<XWindow['twttr']>) => void) => void;
        widgets?: {
          createTweet: (
            tweetId: string,
            element: HTMLElement,
            options?: {
              theme?: 'dark' | 'light';
              dnt?: boolean;
              align?: 'left' | 'center' | 'right';
            }
          ) => Promise<HTMLElement | undefined>;
        };
      };
    };

  const SCRIPT_ID = 'x-widgets-script';
  let embedRoot: HTMLDivElement | undefined;

  let widgetScriptPromise: Promise<void> | null = null;

  function getTweetId(value: string) {
    const match = value.match(/status\/(\d+)/);
    return match?.[1] ?? null;
  }

  function getXWindow() {
    return window as XWindow;
  }

  function ensureWidgetScript() {
    if (getXWindow().twttr?.widgets) {
      return Promise.resolve();
    }

    if (widgetScriptPromise) {
      return widgetScriptPromise;
    }

    widgetScriptPromise = new Promise<void>((resolve, reject) => {
      const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(), { once: true });
        existingScript.addEventListener('error', () => reject(new Error('Failed to load X widgets script')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load X widgets script'));
      document.body.appendChild(script);
    });

    return widgetScriptPromise;
  }

  function waitForWidgets() {
    return new Promise<NonNullable<XWindow['twttr']>>((resolve, reject) => {
      const xWindow = getXWindow();

      if (xWindow.twttr?.widgets) {
        resolve(xWindow.twttr);
        return;
      }

      if (xWindow.twttr?.ready) {
        xWindow.twttr.ready((twttr) => resolve(twttr));
        return;
      }

      reject(new Error('X widgets API is not available'));
    });
  }

  onMount(async () => {
    await tick();

    try {
      const tweetId = getTweetId(url);

      if (!tweetId || !embedRoot) {
        return;
      }

      await ensureWidgetScript();
      const twttr = await waitForWidgets();

      embedRoot.innerHTML = '';
      await twttr.widgets?.createTweet(tweetId, embedRoot, {
        theme: 'dark',
        dnt: true,
        align: 'center',
      });
    } catch (error) {
      console.error(error);
    }
  });
</script>

<div bind:this={embedRoot} class="overflow-hidden">
  <a class="block text-center text-sm text-gray-400 underline decoration-gray-700 underline-offset-4" href={url} target="_blank" rel="noreferrer">
    View post on X
  </a>
</div>
