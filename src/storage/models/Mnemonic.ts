import type { StoreSchema } from '../db';

export interface Mnemonic {
  id?: number;
  mnemonic: string;
  generatedKeysId: IDBValidKey[];
  timesUsed: number;
}

export const mnemonicSchema: StoreSchema<Mnemonic> = {
  name: 'mnemonics',
  keyPath: 'id',
  autoIncrement: true,
  indexes: [
    { name: 'id', keyPath: 'id', options: { unique: true } },
    {
      name: 'mnemonic',
      keyPath: 'mnemonic',
      options: { unique: true }
    }
  ]
};
