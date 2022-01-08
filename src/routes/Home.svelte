<script>
  import { fade } from 'svelte/transition';

  import DownloadApp from '../components/DownloadApp.svelte';
  import DevicesBackground from '../components/DevicesBackground.svelte';
  import Footer from '../components/Footer.svelte';
</script>

<div
  transition:fade
  class="container pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center"
>
  <!--Left Col-->
  <div
    class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden"
  >
    <h1
      class="my-4 text-3xl md:text-5xl text-purple-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1"
    >
      Blockchain-based deliberative democracy platform.
    </h1>
    <p
      class="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle"
    >
      Liquid voting and tokenomics based dynamic parliamentary democracy for the
      internet age.
    </p>

    <p
      class="text-blue-400 font-bold pb-8 lg:pb-6 text-center md:text-left fade-in"
    >
      Download our app:
    </p>

    <DownloadApp />
  </div>

  <!--Right Col-->
  <div class="w-full xl:w-3/5 py-6 overflow-y-hidden">
    <DevicesBackground />
  </div>

  <Footer />
</div>
