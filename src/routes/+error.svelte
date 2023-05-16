<script>
  import { page } from '$app/stores';
</script>

<div class="grid h-screen px-4 place-content-center">
  <div class="text-center">
    <h1 class="font-black text-gray-200 text-9xl">{$page.status}</h1>

    <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

    <p class="mt-4 text-gray-500">{$page.error.message}</p>

    <a href="/" class="btn-big-filled"> Go Back Home </a>
  </div>
</div>
