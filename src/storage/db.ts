export interface StoreSchema<T> {
  name: string;
  keyPath: keyof T | IDBValidKey;
  autoIncrement?: boolean;
  indexes?: Array<{
    name: string;
    keyPath: keyof T & IDBValidKey;
    options?: IDBIndexParameters;
  }>;
}

export const openDB = async (
  dbName: string,
  dbVersion: number,
  objectStores: StoreSchema<any>[]
): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = () =>
      reject(new Error(`Failed to open database ${dbName}. Error: ${request.error}`));

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      console.log('IDB update needed' + event);

      const db = request.result;

      for (const objectStore of objectStores) {
        const { name, keyPath, autoIncrement, indexes } = objectStore;
        const objectStoreOptions: IDBObjectStoreParameters = {
          keyPath: keyPath as string | string[],
          autoIncrement
        };
        const store = db.createObjectStore(name, objectStoreOptions);

        if (indexes) {
          for (const index of indexes) {
            store.createIndex(index.name, index.keyPath as string | string[], index.options);
          }
        }
      }
    };

    request.onsuccess = () => resolve(request.result);
  });
};

export const getDB = async (dbName: string, dbVersion = 1): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = () =>
      reject(new Error(`Failed to open database ${dbName}. Error: ${request.error}`));

    request.onupgradeneeded = () =>
      reject(new Error(`Version requires an upgrade. Use openDB instead`));

    request.onsuccess = () => resolve(request.result);
  });
};

export const deleteDB = async (dbName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(dbName);

    request.onerror = () =>
      reject(new Error(`Failed to delete database ${dbName}. Error: ${request.error}`));

    request.onsuccess = () => resolve();
  });
};

export const clearStore = async (db: IDBDatabase, storeName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.clear();

    request.onerror = () =>
      reject(new Error(`Failed to clear object store ${storeName}. Error: ${request.error}`));

    request.onsuccess = () => resolve();
  });
};

export const setItem = async <T>(
  storeName: string,
  item: T,
  options: {
    db?: IDBDatabase;
    dbName?: string;
    dbVersion?: number;
  }
): Promise<IDBValidKey> => {
  if (!options.db && !options.dbName && !options.dbVersion) throw new Error('Insufficient options');

  try {
    const db =
      options.db || (await getDB(options.dbName || 'deliberativeDB', options.dbVersion || 1));

    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.add(item);

      request.onerror = () =>
        reject(new Error(`Failed to set item in store ${storeName}. Error: ${request.error}`));

      request.onsuccess = () => resolve(request.result);
    });
  } catch (error) {
    throw error;
  }
};

export const getItem = async <T>(
  storeName: string,
  id: IDBValidKey,
  options: {
    db?: IDBDatabase;
    dbName?: string;
    dbVersion?: number;
  }
): Promise<T | undefined> => {
  if (!options.db && !options.dbName && !options.dbVersion) throw new Error('Insufficient options');

  try {
    const db =
      options.db || (await getDB(options.dbName || 'deliberativeDB', options.dbVersion || 1));

    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.get(id);

      request.onerror = () =>
        reject(
          new Error(`Failed to get item ${id} from store ${storeName}. Error: ${request.error}`)
        );

      request.onsuccess = () => resolve(request.result);
    });
  } catch (error) {
    throw error;
  }
};

export const updateItem = async <T>(
  storeName: string,
  id: IDBValidKey,
  updatedKey: keyof T,
  updatedValue: unknown,
  options: {
    db?: IDBDatabase;
    dbName?: string;
    dbVersion?: number;
  }
): Promise<void> => {
  if (!options.db && !options.dbName && !options.dbVersion) throw new Error('Insufficient options');

  try {
    const db =
      options.db || (await getDB(options.dbName || 'deliberativeDB', options.dbVersion || 1));

    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.get(id);

      req.onerror = (err) => reject(new Error(`Could not get item with id ${id} because ${err}`));

      req.onsuccess = (event) => {
        const item = event.target!.result;

        item[updatedKey] = updatedValue;

        const request = store.put(item);

        request.onerror = (error) =>
          reject(
            new Error(`Failed to update item ${item.id} from store ${storeName}. Error: ${error}`)
          );

        request.onsuccess = () => resolve();
      };
    });
  } catch (error) {
    throw error;
  }
};

export const getAllItems = async <T>(
  storeName: string,
  options: {
    db?: IDBDatabase;
    dbName?: string;
    dbVersion?: number;
  }
): Promise<T[]> => {
  if (!options.db && !options.dbName && !options.dbVersion) throw new Error('Insufficient options');

  try {
    const db =
      options.db || (await getDB(options.dbName || 'deliberativeDB', options.dbVersion || 1));

    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () =>
        reject(
          new Error(`Failed to get all items from store ${storeName}. Error: ${request.error}`)
        );

      request.onsuccess = () => resolve(request.result);
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes a record from the specified store by ID.
 *
 * @param storeName The name of the store to delete the record from.
 * @param id The ID of the record to delete.
 */
export const deleteItem = async (
  storeName: string,
  id: number,
  options: {
    db?: IDBDatabase;
    dbName?: string;
    dbVersion?: number;
  }
): Promise<void> => {
  if (!options.db && !options.dbName && !options.dbVersion) throw new Error('Insufficient options');

  try {
    const db =
      options.db || (await getDB(options.dbName || 'deliberativeDB', options.dbVersion || 1));

    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.delete(id);

      request.onerror = () =>
        reject(
          new Error(`Failed to delete item ${id} from store ${storeName}. Error: ${request.error}`)
        );

      request.onsuccess = () => resolve();
    });
  } catch (error) {
    throw error;
  }
};

export const countItems = async (
  storeName: string,
  options: {
    db?: IDBDatabase;
    dbName?: string;
    dbVersion?: number;
  }
): Promise<number> => {
  if (!options.db && !options.dbName && !options.dbVersion) throw new Error('Insufficient options');

  try {
    const db =
      options.db || (await getDB(options.dbName || 'deliberativeDB', options.dbVersion || 1));

    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.count();

      request.onerror = () =>
        reject(new Error(`Failed to count items from store ${storeName}. Error: ${request.error}`));

      request.onsuccess = () => resolve(request.result);
    });
  } catch (error) {
    throw error;
  }
};
