<script lang="ts">
  import LogoDeliberative from '../icons/LogoDeliberative.svelte';

  import Github from '../buttons/Github.svelte';
  import LinkedIn from '../buttons/LinkedIn.svelte';
  import Twitter from '../buttons/Twitter.svelte';
  import ToggleDarkMode from '../buttons/ToggleDarkMode.svelte';
  import DropdownMenu from './DropdownMenu.svelte';

  let dropdownMenuVisible = false;

  const onHamburgerClick = (_event: MouseEvent | KeyboardEvent) => {
    dropdownMenuVisible = !dropdownMenuVisible;
  };
</script>

<header aria-label="Site Header">
  <div class="mx-auto max-w-screen-2xl px-2 pt-1 pb-6 sm:px-4 lg:px-6">
    <div class="flex h-16 items-center justify-between flex-wrap">
      <div class="flex-1 md:flex md:items-center md:gap-12">
        <a class="block text-purple-900" href="/">
          <span class="sr-only">Home</span>
          <LogoDeliberative class="h-5" />
        </a>
      </div>

      <div class="md:flex md:items-center md:gap-12">
        <nav aria-label="Site Nav" class="hidden md:block">
          <ul class="flex items-center gap-6 text-sm">
            <li>
              <Github />
            </li>

            <li>
              <LinkedIn />
            </li>

            <li>
              <Twitter />
            </li>

            <ToggleDarkMode />

            <li>
              <a
                class="text-neutral-500 dark:text-neutral-300 transition hover:text-gray-500/75"
                href="/blog"
              >
                Blog
              </a>
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-4">
          <div class="sm:flex sm:gap-4">
            <a
              class="rounded-md bg-purple-900 px-5 py-2.5 text-sm font-medium text-white shadow"
              href="/wallet/generate"
            >
              Wallet
            </a>

            <!-- <div class="hidden sm:flex"> -->
            <!--   <ToggleDarkMode /> -->
            <!-- <a -->
            <!--   class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-purple-900" -->
            <!--   href="/" -->
            <!-- > -->
            <!--   Register -->
            <!-- </a> -->
            <!-- </div> -->
          </div>

          <div class="block md:hidden" on:click={onHamburgerClick} on:keydown={onHamburgerClick}>
            <button
              class="rounded bg-gray-100 dark:bg-neutral-950 p-2 text-neutral-600 transition hover:text-gray-600/75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {#if dropdownMenuVisible}
            <DropdownMenu close={onHamburgerClick} />
          {/if}
        </div>
      </div>
    </div>
  </div>
</header>
