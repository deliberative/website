import { openDB } from 'idb';

import type { DBSchema, IDBPDatabase } from 'idb';
import type { IDemocracy } from '../models/Democracy';
import type { IParticipant } from '../models/Participant';
import type { IAlternative } from '../models/Alternative';

interface DB extends DBSchema {
  democracies: {
    key: string;
    value: IDemocracy;
  };

  participants: {
    key: string;
    value: IParticipant;
  };

  alternatives: {
    key: string;
    value: IAlternative;
  };
}

export const sha256 = async (message: string): Promise<string> => {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
};

export const getDB = async (): Promise<IDBPDatabase<DB>> => {
  return await openDB<DB>('db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('democracies')) {
        db.createObjectStore('democracies', {
          keyPath: 'hash',
        });
      }

      if (!db.objectStoreNames.contains('participants')) {
        db.createObjectStore('participants', {
          keyPath: 'hash',
        });
      }

      if (!db.objectStoreNames.contains('alternatives')) {
        db.createObjectStore('alternatives', {
          keyPath: 'hash',
        });
      }
    },
  });
};

export const getItem = async (
  tableName: 'democracies' | 'participants' | 'alternatives',
  hash: string,
): Promise<IDemocracy | IParticipant | IAlternative | undefined> => {
  const db = await getDB();
  const tx = db.transaction(tableName, 'readonly');
  const store = tx.objectStore(tableName);
  const result = await store.get(hash);

  return result;
};

export const getAllItems = async (
  tableName: 'democracies' | 'participants' | 'alternatives',
): Promise<(IDemocracy | IParticipant | IAlternative)[]> => {
  const db = await getDB();
  const tx = db.transaction(tableName, 'readonly');
  const store = tx.objectStore(tableName);
  const result = await store.getAll();

  return result;
};

export const setItem = async (
  tableName: 'democracies' | 'participants' | 'alternatives',
  value: IDemocracy | IParticipant | IAlternative,
): Promise<void> => {
  const db = await getDB();
  const tx = db.transaction(tableName, 'readwrite');
  const store = tx.objectStore(tableName);
  await store.add(value);
};

export const updateItem = async (
  tableName: 'democracies' | 'participants' | 'alternatives',
  value: IDemocracy | IParticipant | IAlternative,
): Promise<void> => {
  const db = await getDB();
  const tx = db.transaction(tableName, 'readwrite');
  const store = tx.objectStore(tableName);
  await store.put(value);
};

export const removeItem = async (
  tableName: 'democracies' | 'participants' | 'alternatives',
  hash: string,
): Promise<void> => {
  const db = await getDB();
  const tx = db.transaction(tableName, 'readwrite');
  const store = tx.objectStore(tableName);
  const result = await store.get(hash);
  if (!result) {
    console.log('Item with hash ' + hash + ' not found');
    return;
  }
  await store.delete(hash);
  console.log('Deleted item with hash ', hash);
};
