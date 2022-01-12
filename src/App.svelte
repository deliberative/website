<script>
  import Router from 'svelte-spa-router';
  import { wrap } from 'svelte-spa-router/wrap';

  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Loading from './components/Loading.svelte';

  import Home from './routes/Home.svelte';
  import NotFound from './routes/NotFound.svelte';

  const routes = {
    // Exact path
    '/': Home,

    '/blog': wrap({
      asyncComponent: () => import('./routes/BlogPosts.svelte'),
      loadingComponent: Loading,
    }),

    '/explorer': wrap({
      asyncComponent: () => import('./routes/BlockExplorer.svelte'),
      loadingComponent: Loading,
    }),

    /* '/about': wrap({ */
    /*   asyncComponent: () => import('./routes/About.svelte'), */
    /* }), */
    /*  */
    /* '/landing': wrap({ */
    /*   asyncComponent: () => import('./routes/Landing.svelte'), */
    /* }), */

    // Using named parameters, with last being optional
    /* '/author/:first/:last?': Author, */

    // Wildcard parameter
    /* '/book/*': Book, */

    '*': NotFound,
  };
</script>

<Header />

<Router routes="{routes}" restoreScrollState="{true}" />

<Footer />

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
