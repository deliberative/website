import { openDB, getItem, setItem, updateItem } from './db';

import { uint8ToHex } from './utils/uint8ToHex';

import { mnemonicSchema } from './models/Mnemonic';
import { generatedKeySchema } from './models/GeneratedKey';

import type { Mnemonic } from './models/Mnemonic';
import type { GeneratedKey } from './models/GeneratedKey';

const dbName = 'deliberativeDB';
const dbVersion = 1;

export const startDB = async () => {
  const db = await openDB(dbName, dbVersion, [mnemonicSchema, generatedKeySchema]);

  return db;
};

export const storeWallet = async (db: IDBDatabase, words: string[], password?: string) => {
  const m = words.join(' ');
  const keyPair = await dcrypto.keyPairFromMnemonic(m, password);

  const secretKeyHash = await dcrypto.sha512(keyPair.secretKey);
  const publicKeyHash = await dcrypto.sha512(keyPair.publicKey);

  const defaultSalt = new Uint8Array(dcrypto.constants.crypto_pwhash_argon2id_SALTBYTES);
  const encoder = new TextEncoder();
  encoder.encodeInto('password12345678', defaultSalt);
  const salt = new Uint8Array(dcrypto.constants.crypto_pwhash_argon2id_SALTBYTES);

  if (password) {
    const pwdBuffer = encoder.encode(password).buffer;
    const pwdHash = await dcrypto.sha512(new Uint8Array(pwdBuffer));

    salt.set(
      pwdHash.slice(
        dcrypto.constants.crypto_hash_sha512_BYTES -
          dcrypto.constants.crypto_pwhash_argon2id_SALTBYTES,
        dcrypto.constants.crypto_hash_sha512_BYTES
      )
    );
  } else {
    salt.set(defaultSalt);
  }

  const mnemonic: Mnemonic = {
    mnemonic: m,
    generatedKeysId: [],
    timesUsed: 0
  };

  const mnemonicId = await setItem('mnemonics', mnemonic, { db });

  const generatedKey: GeneratedKey = {
    mnemonicId,
    nonce: uint8ToHex(salt),
    secretKeySHA512: uint8ToHex(secretKeyHash),
    publicKeySHA512: uint8ToHex(publicKeyHash)
  };

  const generatedKeyId = await setItem('generatedKeys', generatedKey, { db });

  await updateItem('mnemonics', mnemonicId, 'generatedKeysId', [generatedKeyId], { db });

  return true;
};
