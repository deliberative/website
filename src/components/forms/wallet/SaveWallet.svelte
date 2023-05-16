<script lang="ts">
  import { startDB, storeWallet } from '../../../storage';
  import { mnemonic, password } from '../../../stores/walletParams';

  const save = async (_event: MouseEvent | KeyboardEvent) => {
    const db = await startDB();

    await storeWallet(db, $mnemonic, $password === '' ? null : $password);
  };
</script>

<button class="btn-big-transparent" on:click={save}> Save </button>
