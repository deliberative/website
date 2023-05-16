<script lang="ts">
  import { onMount } from 'svelte';

  import MnemonicWordSelect from './wallet/MnemonicWordSelect.svelte';
  import Entropy from './wallet/Entropy.svelte';

  import { mnemonic, zeroMnemonic } from '../../stores/walletParams';

  onMount(() => {
    zeroMnemonic();
  });
</script>

<div class="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-2xl text-center">
    <h1 class="text-2xl font-bold sm:text-3xl">Restore wallet</h1>

    <p class="mt-4 text-gray-500">
      A mnemonic is used as a seed for the generation of your wallet's public/secret keypair.
    </p>

    <p class="mt-4 text-gray-500">
      With a password we can recreate your secret key in the browser without storing it.
    </p>
  </div>

  <form action="" class="mx-auto mb-0 mt-8 max-w-2xl space-y-4">
    <Entropy generateOnChange={false} />

    <fieldset class="flex flex-wrap gap-2">
      <legend class="sr-only">Mnemonic</legend>

      {#each $mnemonic as word, index}
        <MnemonicWordSelect bind:word position={index} disabled={false} />
      {/each}
    </fieldset>

    <div class="flex items-center justify-between">
      <p class="text-sm text-gray-500">
        Don't have a wallet?
        <a class="underline" href="/wallet/generate">Generate</a>
      </p>

      <button type="submit" class="btn-big-filled"> Restore </button>
    </div>
  </form>
</div>
