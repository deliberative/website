import type { StoreSchema } from '../db';

export interface GeneratedKey {
  id?: number;
  mnemonicId: IDBValidKey;
  /**
   * Used to convert entropy to secret key
   */
  nonce: string;
  /**
   * We do not want to store plaintext secret keys
   * but we want to give confirmation to the user that
   * the secret key used is the one intended
   */
  secretKeySHA512: string;
  publicKeySHA512: string;
}

export const generatedKeySchema: StoreSchema<GeneratedKey> = {
  name: 'generatedKeys',
  keyPath: 'id',
  autoIncrement: true,
  indexes: [
    { name: 'id', keyPath: 'id', options: { unique: true } },
    {
      name: 'secretKeySHA512',
      keyPath: 'secretKeySHA512',
      options: { unique: true }
    },
    {
      name: 'publicKeySHA512',
      keyPath: 'publicKeySHA512',
      options: { unique: true }
    }
  ]
};
