<script lang="ts">
  import '../app.css';
  import { pathWithBase } from '$lib/paths';
  import { page } from '$app/stores';

  interface Props {
    children: import('svelte').Snippet;
  }

  let { children }: Props = $props();
  let drawerOpen = $state(false);
  let privacyOpen = $state(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Works', href: '/works' },
    { label: 'Posts', href: '/posts' },
  ];

  function isActive(href: string): boolean {
    const path = $page.url.pathname;
    const resolvedHref = pathWithBase(href);
    return href === '/' ? path === resolvedHref : path.startsWith(resolvedHref);
  }
</script>

<!-- Mobile top bar -->
<div class="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 bg-[#0C111B] border-b border-gray-800">
  <button
    onclick={() => (drawerOpen = !drawerOpen)}
    class="text-gray-400 hover:text-white mr-3 p-1"
    aria-label="Toggle navigation"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
  <a href={pathWithBase('/')} class="text-white font-bold hover:text-indigo-400 transition-colors">sumeshi</a>
</div>

<!-- Mobile backdrop -->
{#if drawerOpen}
  <div
    class="lg:hidden fixed inset-0 z-40 bg-black/50"
    onclick={() => (drawerOpen = false)}
    role="button"
    tabindex="-1"
    onkeydown={(e) => e.key === 'Escape' && (drawerOpen = false)}
  ></div>
{/if}

<!-- Sidebar -->
<nav
  class="fixed top-0 left-0 h-full w-64 bg-[#0C111B] border-r border-gray-800 z-40 flex flex-col
    transition-transform duration-300 ease-in-out
    {drawerOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0"
>
  <div class="p-6 border-b border-gray-800">
    <a href={pathWithBase('/')} class="text-white font-bold text-lg tracking-wide hover:text-indigo-400 transition-colors">
      sumeshi
    </a>
  </div>

  <div class="flex-1 py-4 px-3">
    {#each navItems as item}
      <a
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
      onclick={() => (privacyOpen = true)}
      class="text-xs text-gray-600 hover:text-gray-400 transition-colors"
    >
      Privacy Policy
    </button>
  </div>
</nav>

<!-- Main content -->
<main class="lg:ml-64 min-h-screen bg-[#0C111B] pt-14 lg:pt-0 text-gray-100">
  <div class="p-6">
    {@render children()}
  </div>
</main>

<!-- Privacy Policy dialog -->
{#if privacyOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
    <div class="bg-gray-900 rounded-xl max-w-md w-full p-6 border border-gray-700 shadow-2xl">
      <h2 class="text-white text-lg font-semibold mb-4">Privacy Policy</h2>
      <p class="text-gray-400 text-sm leading-relaxed mb-3">
        This website uses Google Analytics to analyze access logs for the purpose of improving the service.
        Google Analytics uses cookies to collect traffic data anonymously. No personally identifiable information is collected.
      </p>
      <p class="text-gray-400 text-sm leading-relaxed mb-6">
        You can opt out of data collection by disabling cookies in your browser settings.
      </p>
      <button
        onclick={() => (privacyOpen = false)}
        class="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
      >
        Close
      </button>
    </div>
  </div>
{/if}
