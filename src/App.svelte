<script type="ts">
  import { onMount } from 'svelte';
  import type { SvelteComponent } from 'svelte';
  import type { BrowserHistory } from 'history';

  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';

  export let history: BrowserHistory;

  const routeHandler = async (url: string) => {
    switch (url) {
      case '/':
        return (await import('./routes/Home.svelte')).default;
      case '/blog':
        return (await import('./routes/BlogPosts.svelte')).default;
      case '/explorer':
        return (await import('./routes/BlockExplorer.svelte')).default;
      default:
        return (await import('./routes/NotFound.svelte')).default;
    }
  };

  let Router: SvelteComponent;
  onMount(async () => {
    const path = history.location.pathname;
    Router = await routeHandler(path);
  });
</script>

<Header />
<svelte:component this="{Router}" />
<Footer />

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
