<script lang="ts">
  import DeleteWallets from './DeleteWallets.svelte';

  export let close: (_event: MouseEvent | KeyboardEvent) => void;
</script>

<div class="relative">
  <div
    class="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
    role="menu"
  >
    <div class="p-2">
      <strong class="block p-2 text-xs font-medium uppercase text-gray-400"> Blog </strong>

      <a
        href="/blog"
        data-tippy-content="@blog"
        class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-neutral-500 hover:bg-gray-50 hover:text-gray-700"
        role="menuitem"
        on:click={close}
      >
        <svg
          class="fill-current w-5 h-5"
          fill="currentColor"
          aria-hidden="true"
          viewBox="0 0 64 64"
          xml:space="preserve"
        >
          <g>
            <path
              fill="#231F20"
              d="M60,0H4C1.789,0,0,1.789,0,4v56c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V4C64,1.789,62.211,0,60,0z
		 M53,54H11c-0.553,0-1-0.447-1-1s0.447-1,1-1h42c0.553,0,1,0.447,1,1S53.553,54,53,54z M53,48H11c-0.553,0-1-0.447-1-1s0.447-1,1-1
		h42c0.553,0,1,0.447,1,1S53.553,48,53,48z M11,28h18c0.553,0,1,0.447,1,1s-0.447,1-1,1H11c-0.553,0-1-0.447-1-1S10.447,28,11,28z
		 M10,23c0-0.553,0.447-1,1-1h18c0.553,0,1,0.447,1,1s-0.447,1-1,1H11C10.447,24,10,23.553,10,23z M11,34h18c0.553,0,1,0.447,1,1
		s-0.447,1-1,1H11c-0.553,0-1-0.447-1-1S10.447,34,11,34z M11,40h18c0.553,0,1,0.447,1,1s-0.447,1-1,1H11c-0.553,0-1-0.447-1-1
		S10.447,40,11,40z M54,41c0,0.553-0.447,1-1,1H35c-0.553,0-1-0.447-1-1V23c0-0.553,0.447-1,1-1h18c0.553,0,1,0.447,1,1V41z M62,12
		H2V4c0-1.104,0.896-2,2-2h56c1.104,0,2,0.896,2,2V12z"
            />
            <path
              fill="#231F20"
              d="M7,4C5.343,4,4,5.343,4,7s1.343,3,3,3s3-1.343,3-3S8.657,4,7,4z M7,8C6.447,8,6,7.553,6,7s0.447-1,1-1
		s1,0.447,1,1S7.553,8,7,8z"
            />
            <path
              fill="#231F20"
              d="M33,4H15c-1.657,0-3,1.343-3,3s1.343,3,3,3h18c1.657,0,3-1.343,3-3S34.657,4,33,4z M33,8H15
		c-0.553,0-1-0.447-1-1s0.447-1,1-1h18c0.553,0,1,0.447,1,1S33.553,8,33,8z"
            />
          </g>
        </svg>
        Blog
      </a>
    </div>

    <div class="p-2">
      <strong class="block p-2 text-xs font-medium uppercase text-gray-400"> Social </strong>

      <a
        href="https://github.com/deliberative"
        data-tippy-content="@github_handle"
        rel="noopener noreferrer"
        target="_blank"
        class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-neutral-500 hover:bg-gray-50 hover:text-gray-700"
        role="menuitem"
        on:click={close}
      >
        <svg
          class="fill-current w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clip-rule="evenodd"
          />
        </svg>
        Github
      </a>

      <a
        href="https://www.linkedin.com/company/deliberative"
        data-tippy-content="@linkedin_handle"
        rel="noopener noreferrer"
        target="_blank"
        class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-neutral-500 hover:bg-gray-50 hover:text-gray-700"
        role="menuitem"
        on:click={close}
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 27 27" aria-hidden="true">
          <path
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
          />
        </svg>
        LinkedIn
      </a>

      <a
        href="https://twitter.com/deliberative_"
        data-tippy-content="@twitter_handle"
        rel="noopener noreferrer"
        target="_blank"
        class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-neutral-500 hover:bg-gray-50 hover:text-gray-700"
        role="menuitem"
        on:click={close}
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
          />
        </svg>
        Twitter
      </a>
    </div>

    <div class="p-2">
      <strong class="block p-2 text-xs font-medium uppercase text-gray-400"> Danger Zone </strong>

      <DeleteWallets />
    </div>
  </div>
</div>
