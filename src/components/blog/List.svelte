<script lang="ts">
  import Card from './Card.svelte';

  import type { IBlogPost } from '../../interfaces/blogListItem.ts';

  export let items: [IBlogPost];
</script>

<section title="blog">
  <div class="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
    <header class="text-center">
      <h2 class="text-xl font-extrabold text-purple-900 dark:text-purple-700 sm:block sm:text-3xl">
        Blog
      </h2>

      <p class="max-w-md mx-auto mt-4 text-gray-500" />
    </header>

    <ul class="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
      {#each items as item, index}
        <li aria-posinset={index + 1}>
          <Card {item} />
        </li>
      {/each}
      <!-- <li> -->
      <!--   <Card /> -->
      <!-- </li> -->
      <!---->
      <!-- <li> -->
      <!--   <Card /> -->
      <!-- </li> -->
      <!---->
      <!-- <li class="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1"> -->
      <!--   <Card /> -->
      <!-- </li> -->
      <!---->
      <!-- <li class="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1"> -->
      <!--   <Card /> -->
      <!-- </li> -->
    </ul>
  </div>
</section>
