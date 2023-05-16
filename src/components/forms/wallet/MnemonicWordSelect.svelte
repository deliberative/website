<script lang="ts">
  import { fuzzySearch } from '../../../utils/fuzzySearch';
  import { addWordToMnemonic } from '../../../stores/walletParams';

  export let word: string;
  export let position: number;
  export let disabled: boolean;

  let suggestions: { match: string; score: number }[] = [];

  const getSuggestions = async (
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) => {
    if (!disabled) {
      const target = event.target as HTMLInputElement;

      if (target.value.length > 0) {
        suggestions = await fuzzySearch(target.value, dcrypto.wordlist);
      } else {
        suggestions = [];
      }
    }
  };

  const handleAutocompleteSuggestionClick = (w: string) => {
    addWordToMnemonic(w, position);

    word = w;

    suggestions = [];
  };
</script>

<div class="relative flex flex-wrap gap-1">
  <div class="p-2 pt-3 pb-3 text-sm shadow-sm text-neutral-500 dark:text-neutral-300">
    {position + 1}.
  </div>
  <input
    type="text"
    class="w-20 rounded-lg border-gray-200 p-2 pt-3 pb-3 text-sm shadow-sm"
    placeholder="Search mnemonic words from wordlist"
    bind:value={word}
    on:input={getSuggestions}
    {disabled}
  />

  {#if suggestions.length > 0}
    <div
      class="absolute z-10 mt-2 w-full text-left bg-white border border-gray-300 rounded shadow-md"
    >
      {#each suggestions as suggestion}
        <button
          class="group flex items-center justify-between rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
          on:click={() => handleAutocompleteSuggestionClick(suggestion.match)}
        >
          <span class="text-sm font-medium"> {suggestion.match} </span>

          <span
            class="shrink-0 rounded-full bg-gray-100 py-0.5 px-3 text-xs text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700"
          >
            {suggestion.score}
          </span>
        </button>
      {/each}
    </div>
  {/if}
</div>
