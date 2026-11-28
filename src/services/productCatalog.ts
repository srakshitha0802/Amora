import { PRODUCTS } from '../data/products';
import type { Product, ProductCategory } from '../types';

export type ProductStatus = 'draft' | 'published';

export interface CatalogProduct extends Product {
  price: number;
  status: ProductStatus;
}

const DATABASE_NAME = 'amora-product-catalog';
const DATABASE_VERSION = 1;
const PRODUCTS_STORE = 'products';
const META_STORE = 'meta';
const SEEDED_KEY = 'catalog-seeded-v1';
const CHANGE_EVENT = 'amora:catalog-changed';
const CHANNEL_NAME = 'amora-product-catalog';

let databasePromise: Promise<IDBDatabase> | null = null;

function openDatabase(): Promise<IDBDatabase> {
  if (!('indexedDB' in window)) {
    return Promise.reject(new Error('IndexedDB is not available in this browser.'));
  }
  if (databasePromise) return databasePromise;

  databasePromise = new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(PRODUCTS_STORE)) {
        database.createObjectStore(PRODUCTS_STORE, { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains(META_STORE)) {
        database.createObjectStore(META_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      databasePromise = null;
      reject(request.error ?? new Error('Could not open the product catalog.'));
    };
    request.onblocked = () => {
      databasePromise = null;
      reject(new Error('The product catalog is blocked by another open browser tab.'));
    };
  });

  return databasePromise;
}

function transactionComplete(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => reject(transaction.error ?? new Error('Catalog update was aborted.'));
    transaction.onerror = () => reject(transaction.error ?? new Error('Catalog update failed.'));
  });
}

async function notifyCatalogChanged(): Promise<void> {
  window.dispatchEvent(new Event(CHANGE_EVENT));
  if ('BroadcastChannel' in window) {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage('changed');
    channel.close();
  }
}

export async function initializeProductCatalog(): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction([PRODUCTS_STORE, META_STORE], 'readwrite');
  const productsStore = transaction.objectStore(PRODUCTS_STORE);
  const metaStore = transaction.objectStore(META_STORE);
  const seededRequest = metaStore.get(SEEDED_KEY);

  await new Promise<void>((resolve, reject) => {
    seededRequest.onsuccess = () => {
      if (seededRequest.result) {
        resolve();
        return;
      }

      const countRequest = productsStore.count();
      countRequest.onsuccess = () => {
        if (countRequest.result === 0) {
          PRODUCTS.forEach((product) => {
            productsStore.put({
              ...product,
              price: product.unitPriceEstimate,
              status: 'published',
            } satisfies CatalogProduct);
          });
        }
        metaStore.put(true, SEEDED_KEY);
        resolve();
      };
      countRequest.onerror = () =>
        reject(countRequest.error ?? new Error('Could not initialize the product catalog.'));
    };
    seededRequest.onerror = () =>
      reject(seededRequest.error ?? new Error('Could not read product catalog metadata.'));
  });

  await transactionComplete(transaction);
}

export async function getAllCatalogProducts(): Promise<CatalogProduct[]> {
  await initializeProductCatalog();
  const database = await openDatabase();
  const transaction = database.transaction(PRODUCTS_STORE, 'readonly');
  const request = transaction.objectStore(PRODUCTS_STORE).getAll();
  const products = await new Promise<CatalogProduct[]>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as CatalogProduct[]);
    request.onerror = () => reject(request.error ?? new Error('Could not read products.'));
  });
  await transactionComplete(transaction);
  return products;
}

export async function getPublishedCatalogProducts(): Promise<Product[]> {
  return (await getAllCatalogProducts()).filter((product) => product.status === 'published');
}

export async function saveCatalogProduct(product: CatalogProduct): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(PRODUCTS_STORE, 'readwrite');
  transaction.objectStore(PRODUCTS_STORE).put(product);
  await transactionComplete(transaction);
  await notifyCatalogChanged();
}

export async function deleteCatalogProduct(productId: string): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(PRODUCTS_STORE, 'readwrite');
  transaction.objectStore(PRODUCTS_STORE).delete(productId);
  await transactionComplete(transaction);
  await notifyCatalogChanged();
}

export function subscribeToCatalogChanges(onChange: () => void): () => void {
  const handleLocalChange = () => onChange();
  window.addEventListener(CHANGE_EVENT, handleLocalChange);

  let channel: BroadcastChannel | null = null;
  if ('BroadcastChannel' in window) {
    channel = new BroadcastChannel(CHANNEL_NAME);
    channel.addEventListener('message', handleLocalChange);
  }

  return () => {
    window.removeEventListener(CHANGE_EVENT, handleLocalChange);
    channel?.removeEventListener('message', handleLocalChange);
    channel?.close();
  };
}

export const PRODUCT_CATEGORIES: Exclude<ProductCategory, 'All'>[] = [
  'Corporate Merchandise',
  'Polaroids & Photo Products',
  'Personalised Gifts',
  'Stickers',
  'Bookmarks & Stationery',
  'Posters & Prints',
];
