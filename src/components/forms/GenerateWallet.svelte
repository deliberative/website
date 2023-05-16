<script lang="ts">
  import { onMount } from 'svelte';

  import MnemonicWordSelect from './wallet/MnemonicWordSelect.svelte';
  import Entropy from './wallet/Entropy.svelte';
  import SaveWallet from './wallet/SaveWallet.svelte';

  import { mnemonic, entropy, generateMnemonic } from '../../stores/walletParams';

  onMount(() => {
    generateMnemonic($entropy);
  });

  const generate = (_event: MouseEvent) => {
    generateMnemonic($entropy);
  };
</script>

<div class="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8 h-full">
  <div class="mx-auto max-w-2xl text-center">
    <h1 class="text-2xl font-bold sm:text-3xl dark:text-neutral-50">Generate wallet</h1>

    <p class="mt-4 text-neutral-500 dark:text-neutral-300">
      A mnemonic represents a random seed that generates your wallet's public/secret keypair.
      Passwords are used for the generation of different keypairs from the same mnemonic. Write down
      these words in a piece of paper in the exact order and click regenerate to hide them.
      Everything is generated on your device.
    </p>
  </div>

  <form action="" class="mx-auto mb-0 mt-8 max-w-2xl space-y-4">
    <Entropy generateOnChange={true} />

    <fieldset class="flex flex-wrap gap-2">
      <legend class="sr-only">Mnemonic</legend>

      <div class="p-2 pt-3 pb-3 text-sm shadow-sm text-neutral-500 dark:text-neutral-300">
        Mnemonic:
      </div>

      {#each $mnemonic as word, index}
        <MnemonicWordSelect bind:word position={index} disabled={true} />
      {/each}
    </fieldset>

    <div class="flex items-center justify-between">
      <p class="text-sm text-gray-500">
        Already have a wallet?
        <a class="underline" href="/wallet/restore">Restore</a>
      </p>

      <SaveWallet />

      <button type="submit" class="btn-big-filled" on:click={generate}> Regenerate </button>
    </div>
  </form>
</div>
