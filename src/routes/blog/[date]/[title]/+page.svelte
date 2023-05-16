<script lang="ts">
  import Blog0 from '../../../../blogposts/2023-05-09/introducing-deliberative-crypto-package.svelte';
  import Blog1 from '../../../../blogposts/2023-05-17/reversing-secret-voting-power.svelte';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<article
  class="prose dark:prose-invert mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24"
>
  <h1>{data.post.title}</h1>

  {#if data.post.path === 'introducing-deliberative-crypto-package'}
    <Blog0 />
  {:else if data.post.path === 'reversing-secret-voting-power'}
    <Blog0 />
  {/if}
</article>
