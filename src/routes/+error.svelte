<script lang="ts">
  import { page } from '$app/stores';
  import { pageTitle } from '$lib/site';
</script>

<svelte:head>
  <title>{pageTitle($page.status === 404 ? 'Page Not Found' : 'Error')}</title>
  <meta name="robots" content="noindex, follow" />
</svelte:head>

<div class="site-container py-12 text-center">
  <h1 class="page-title">{$page.status === 404 ? 'Page Not Found' : 'Something went wrong'}</h1>
  <p class="mt-4 text-sm text-gray-400">{$page.error?.message ?? 'The requested page could not be displayed.'}</p>
  <a href="/" class="mt-6 inline-block text-sm font-medium text-indigo-400 hover:text-indigo-300">
    Return Home
  </a>
</div>
