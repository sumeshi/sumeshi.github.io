<script lang="ts">
  import '../app.css';
  import { pathWithBase } from '$lib/paths';
  import { page } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import { onMount, tick } from 'svelte';

  interface Props {
    children: import('svelte').Snippet;
  }

  let { children }: Props = $props();
  let drawerOpen = $state(false);
  let privacyOpen = $state(false);
  let navToggleButton = $state<HTMLButtonElement | undefined>(undefined);
  let privacyTriggerButton = $state<HTMLButtonElement | undefined>(undefined);
  let privacyCloseButton = $state<HTMLButtonElement | undefined>(undefined);
  let previousDrawerOpen = false;
  let previousPrivacyOpen = false;
  let lastTrackedPagePath = '';
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Works', href: '/works' },
    { label: 'Posts', href: '/posts' },
  ];

  function trackPageView(url: URL): void {
    const pagePath = `${url.pathname}${url.search}`;

    if (lastTrackedPagePath === pagePath) {
      return;
    }

    const browserWindow = window as Window & {
      gtag?: (...args: unknown[]) => void;
    };

    browserWindow.gtag?.('event', 'page_view', {
      page_title: document.title,
      page_location: url.href,
      page_path: pagePath
    });
    lastTrackedPagePath = pagePath;
  }

  function isActive(href: string): boolean {
    const path = $page.url.pathname;
    const resolvedHref = pathWithBase(href);
    return href === '/' ? path === resolvedHref : path.startsWith(resolvedHref);
  }

  afterNavigate(() => {
    drawerOpen = false;
    privacyOpen = false;
    trackPageView(new URL(window.location.href));
  });

  onMount(() => {
    trackPageView(new URL(window.location.href));
  });

  function openPrivacyPolicy(): void {
    drawerOpen = false;
    privacyOpen = true;
  }

  function closePrivacyPolicy(): void {
    privacyOpen = false;
  }

  function handleGlobalKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape') {
      return;
    }

    if (privacyOpen) {
      closePrivacyPolicy();
      return;
    }

    if (drawerOpen) {
      drawerOpen = false;
    }
  }

  $effect(() => {
    if (drawerOpen && !previousDrawerOpen) {
      tick().then(() => document.getElementById('primary-nav-link-0')?.focus());
    } else if (!drawerOpen && previousDrawerOpen) {
      tick().then(() => navToggleButton?.focus());
    }

    previousDrawerOpen = drawerOpen;
  });

  $effect(() => {
    if (privacyOpen && !previousPrivacyOpen) {
      tick().then(() => privacyCloseButton?.focus());
    } else if (!privacyOpen && previousPrivacyOpen) {
      tick().then(() => privacyTriggerButton?.focus());
    }

    previousPrivacyOpen = privacyOpen;
  });
</script>

<svelte:window onkeydown={handleGlobalKeydown} />

<!-- Mobile top bar -->
<div class="site-topbar lg:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4">
  <button
    bind:this={navToggleButton}
    type="button"
    onclick={() => (drawerOpen = !drawerOpen)}
    class="text-gray-400 hover:text-white mr-3 p-1"
    aria-controls="primary-sidebar"
    aria-expanded={drawerOpen}
    aria-label={drawerOpen ? 'Close navigation' : 'Open navigation'}
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
  <a href={pathWithBase('/')} class="text-white font-bold hover:text-indigo-400 transition-colors">SIPDEP</a>
</div>

<!-- Mobile backdrop -->
{#if drawerOpen}
  <button
    type="button"
    class="site-overlay lg:hidden fixed inset-0 z-40"
    onclick={() => (drawerOpen = false)}
    aria-label="Close navigation menu"
  ></button>
{/if}

<!-- Sidebar -->
<nav
  id="primary-sidebar"
  aria-label="Primary"
  class="site-sidebar fixed top-0 left-0 h-full w-64 z-40 flex flex-col
    transition-transform duration-300 ease-in-out
    {drawerOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0"
>
  <div class="p-6 mt-2 border-b border-gray-800">
    <a href={pathWithBase('/')} class="block hover:text-indigo-400 transition-colors">
      <span class="block text-lg font-bold tracking-wide text-white">SIPDEP</span>
      <span class="mt-1 block text-[11px] uppercase tracking-[0.16em] text-gray-500">
        Sumeshi Information Preservation Department
      </span>
    </a>
  </div>

  <div class="flex-1 py-4 px-3">
    {#each navItems as item, index}
      <a
        id={`primary-nav-link-${index}`}
        href={pathWithBase(item.href)}
        onclick={() => (drawerOpen = false)}
        class="flex items-center px-4 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors
          {isActive(item.href)
            ? 'bg-indigo-600/20 text-indigo-400'
            : 'text-gray-400 hover:text-white hover:bg-white/5'}"
      >
        {item.label}
      </a>
    {/each}
  </div>

  <div class="p-4 border-t border-gray-800">
    <button
      bind:this={privacyTriggerButton}
      type="button"
      onclick={openPrivacyPolicy}
      class="text-xs text-gray-600 hover:text-gray-400 transition-colors"
      aria-haspopup="dialog"
      aria-expanded={privacyOpen}
      aria-controls="privacy-policy-dialog"
    >
      Privacy Policy
    </button>
  </div>
</nav>

<!-- Main content -->
<main class="site-main lg:ml-64 pt-14 lg:pt-0">
  <div class="p-6">
    {@render children()}
  </div>
</main>

<!-- Privacy Policy dialog -->
{#if privacyOpen}
  <div class="site-dialog-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
    <button
      type="button"
      class="absolute inset-0"
      onclick={closePrivacyPolicy}
      aria-label="Close privacy policy dialog"
    ></button>
    <div
      id="privacy-policy-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
      class="site-dialog relative max-w-md w-full p-6"
    >
      <h2 id="privacy-policy-title" class="text-white text-lg font-semibold mb-4">Privacy Policy</h2>
      <p class="text-gray-400 text-sm leading-relaxed mb-3">
        This website uses Google Analytics to collect traffic information for site improvement.
        Google Analytics may use cookies or similar technologies to measure page views and usage patterns.
      </p>
      <p class="text-gray-400 text-sm leading-relaxed mb-6">
        By continuing to use this site, you acknowledge that site usage analytics may be recorded.
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <button
          bind:this={privacyCloseButton}
          type="button"
          onclick={closePrivacyPolicy}
          class="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
{/if}
