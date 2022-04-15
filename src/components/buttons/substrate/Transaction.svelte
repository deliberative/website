<script type="ts">
  import type { KeyringPair } from '@polkadot/keyring/types';

  import substrate from '../../../stores/substrate';
  import type {
    inputParamsType,
    paramFieldsType,
  } from '../../../utils/substrate';

  export let accountPair: KeyringPair;
  export let label:
    | 'Query'
    | 'Submit'
    | 'Store Something'
    | 'Upgrade'
    | 'Unsigned'
    | 'Signed'
    | 'SUDO';

  export let status: any;

  export let type:
    | 'QUERY'
    | 'RPC'
    | 'SIGNED-TX'
    | 'UNSIGNED-TX'
    | 'SUDO-TX'
    | 'UNCHECKED-SUDO-TX'
    | 'CONSTANT';

  export let attrs: {
    palletRpc: string;
    callable: string;
    inputParams: inputParamsType | null;
    paramFields: paramFieldsType | null;
  };

  export let disabled: boolean;

  const isQuery = () => type === 'QUERY';
  const isSudo = () => type === 'SUDO-TX';
  const isUncheckedSudo = () => type === 'UNCHECKED-SUDO-TX';
  const isUnsigned = () => type === 'UNSIGNED-TX';
  const isSigned = () => type === 'SIGNED-TX';
  const isRpc = () => type === 'RPC';
  const isConstant = () => type === 'CONSTANT';

  let unsub: (() => string) | (() => void) | null;

  const transaction = async () => {
    if (typeof unsub === 'function') {
      unsub();
      unsub = null;
    }

    status = 'Sending...';
    (isSudo() && substrate.transaction(accountPair, attrs, true)) ||
      (isUncheckedSudo() &&
        substrate.transaction(accountPair, attrs, true, false)) ||
      (isSigned() && signedTx()) ||
      (isUnsigned() && unsignedTx()) ||
      (isQuery() && query()) ||
      (isRpc() && rpc()) ||
      (isConstant() && constant());
  };
</script>
