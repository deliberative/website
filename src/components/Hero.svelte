<script>
  /* import { fade } from 'svelte/transition'; */

  import DownloadApp from './DownloadApp.svelte';
  import DevicesBackground from './DevicesBackground.svelte';
</script>

<section
  class="text-black dark:text-gray-400 bg-white dark:bg-gray-900 body-font"
>
  <div
    class="container mx-auto flex px-6 lg:px-12 xl:px-16 py-24 sm:flex-col-reverse md:flex-row flex-col items-center justify-between"
  >
    <!--Right Col-->
    <div class="w-full hidden md:block xl:w-2/5 py-6 overflow-y-hidden">
      <DevicesBackground />
    </div>

    <div
      class="flex flex-col w-full xl:w-2/5 lg:ml-10 justify-center lg:items-start overflow-y-hidden"
    >
      <h1
        class="my-4 text-3xl md:text-5xl text-purple-800 dark:text-purple-500 font-bold leading-tight text-center md:text-left slide-in-bottom-h1"
      >
        Imagine digital deliberation with distributed ledgers.
      </h1>
      <p
        class="leading-normal text-base md:text-2xl text-black dark:text-gray-300 mb-8 text-center md:text-left slide-in-bottom-subtitle"
      >
        We provide the infrastructure for collective decision making in the
        browser.
      </p>
      <!--
      <p
        class="text-blue-400 font-bold pb-8 lg:pb-6 text-center md:text-left fade-in"
      >
        Download our wallet:
      </p>

      <DownloadApp />
-->
    </div>
  </div>
</section>
