<script>
  import Router from 'svelte-spa-router';
  import { wrap } from 'svelte-spa-router/wrap';

  import Header from './components/Header.svelte';

  import Home from './routes/Home.svelte';
  import NotFound from './routes/NotFound.svelte';

  const routes = {
    // Exact path
    '/': Home,

    '/about': wrap({
      asyncComponent: () => import('./routes/About.svelte'),
    }),

    '/landing': wrap({
      asyncComponent: () => import('./routes/Landing.svelte'),
    }),

    // Using named parameters, with last being optional
    /* '/author/:first/:last?': Author, */

    // Wildcard parameter
    /* '/book/*': Book, */

    // Catch-all
    // This is optional, but if present it must be the last
    '*': NotFound,
  };
</script>

<Header />

<Router routes="{routes}" restoreScrollState="{true}" />

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
