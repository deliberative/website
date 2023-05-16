<script lang="ts">
  import { onMount } from 'svelte';

  import { entropy, bits, generateMnemonic } from '../../../stores/walletParams';

  export let generateOnChange = false;

  onMount(() => {
    entropy.subscribe((value) => {
      if (generateOnChange) {
        generateMnemonic(value);
      }
    });
  });
</script>

<fieldset class="flex flex-wrap gap-2">
  <legend class="sr-only">Entropy</legend>

  <div class="p-2 pt-2 pb-3 text-sm shadow-sm text-neutral-500 dark:text-neutral-300">
    Choose entropy:
  </div>

  {#each bits as bit}
    <div>
      <input
        type="radio"
        id="EntropyBit{bit}"
        class="peer hidden"
        checked={$entropy === bit}
        bind:group={$entropy}
        value={bit}
      />

      <label
        for="EntropyBit{bit}"
        class="flex
      cursor-pointer
      items-center
      justify-center
      rounded-md
      border
      border-gray-100
      bg-white
      px-3
      py-2
      text-neutral-900
      hover:border-gray-200
      peer-checked:border-purple-900
      peer-checked:bg-purple-900
      peer-checked:dark:bg-purple-800
      peer-checked:text-white"
      >
        <p class="text-sm font-medium">{bit} bit</p>
      </label>
    </div>
  {/each}
</fieldset>
