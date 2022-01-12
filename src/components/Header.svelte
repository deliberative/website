<script>
  import HomeButton from './buttons/Home.svelte';
  import ToggleDarkMode from './buttons/ToggleDarkMode.svelte';
  import Github from './buttons/Github.svelte';
  import Discord from './buttons/Discord.svelte';
</script>

<header class="text-gray-600 body-font bg-white dark:bg-gray-900">
  <div
    class="container mx-auto flex flex-wrap px-6 lg:px-10 xl:px-14 py-3 flex-col md:flex-row items-center"
  >
    <div class="flex text-center">
      <HomeButton />
      <div class="md:hidden pl-2 pb-4">
        <ToggleDarkMode />
      </div>
    </div>
    <nav
      class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center"
    >
      <Github />
      <Discord />
    </nav>
    <div class="hidden md:block">
      <ToggleDarkMode />
    </div>
  </div>
</header>
