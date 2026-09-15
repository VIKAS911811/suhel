/**
 * High-Quality Logo Storage System using IndexedDB with localStorage fallback.
 * Preserves 100% original image quality, original aspect ratio, and raw file bytes.
 * Supports files up to 10 MB (JPG, JPEG, PNG, WEBP).
 */

export interface CustomLogoData {
  companyId: string;
  dataUrl: string; // Base64 Data URL (Original, lossless)
  fileName: string;
  fileSize: number; // in bytes
  mimeType: string;
  width: number; // original px width
  height: number; // original px height
  aspectRatio: number; // width / height
  uploadedAt: string;
  bgStyle?: 'transparent' | 'white' | 'dark' | 'auto';
}

const DB_NAME = 'SRGroupLogosDB';
const DB_VERSION = 1;
const STORE_NAME = 'custom_logos';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported in this browser.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'companyId' });
      }
    };
  });
}

/**
 * Save custom logo into IndexedDB, localStorage, and Server API
 */
export async function saveCustomLogo(logoData: CustomLogoData): Promise<void> {
  // 1. Sync with Server API so it persists in published builds for all users
  try {
    const activeToken =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('sr_admin_jwt_token') || localStorage.getItem('sr_admin_jwt_token')
        : null;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (activeToken) {
      headers['Authorization'] = `Bearer ${activeToken}`;
      headers['x-admin-token'] = activeToken;
    }

    fetch('/api/logos', {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(logoData),
    }).catch((err) => console.warn('Server logo sync warning:', err));
  } catch (e) {
    // Ignore server sync failure
  }

  // 2. Save into IndexedDB
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(logoData);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('IndexedDB write failed, falling back to localStorage:', err);
    try {
      localStorage.setItem(`sr_custom_logo_${logoData.companyId}`, JSON.stringify(logoData));
    } catch (lsErr) {
      console.error('LocalStorage quota exceeded for logo:', lsErr);
    }
  }
}

/**
 * Fetch all custom logos from Server API, IndexedDB, or localStorage
 */
export async function getAllCustomLogos(): Promise<Record<string, CustomLogoData>> {
  const result: Record<string, CustomLogoData> = {};

  // 1. Try fetching from Server API first (global persistent logos)
  try {
    const res = await fetch('/api/logos');
    if (res.ok) {
      const serverLogos = await res.json();
      if (serverLogos && typeof serverLogos === 'object') {
        Object.keys(serverLogos).forEach((key) => {
          if (serverLogos[key]) {
            result[key] = serverLogos[key];
          }
        });
      }
    }
  } catch (apiErr) {
    console.warn('Server logos fetch failed, trying local DB:', apiErr);
  }

  // 2. Check IndexedDB
  try {
    const db = await openDB();
    const items = await new Promise<CustomLogoData[]>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });

    items.forEach((item) => {
      if (item && item.companyId && !result[item.companyId]) {
        result[item.companyId] = item;
      }
    });
  } catch (err) {
    console.warn('IndexedDB read failed, checking localStorage fallback:', err);
  }

  // 3. Check localStorage
  const keys = ['sr-group', 'suhel-engineering', 'sr-infra', 'sr-power-solution'];
  keys.forEach((key) => {
    try {
      const raw = localStorage.getItem(`sr_custom_logo_${key}`);
      if (raw && !result[key]) {
        result[key] = JSON.parse(raw);
      }
    } catch (e) {
      // ignore JSON parse error
    }
  });

  return result;
}

/**
 * Delete custom logo for a specific company
 */
export async function deleteCustomLogo(companyId: string): Promise<void> {
  try {
    fetch(`/api/logos/${companyId}`, {
      method: 'DELETE',
    }).catch((err) => console.warn('Server logo delete warning:', err));
  } catch (e) {
    // Ignore server sync failure
  }

  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(companyId);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('IndexedDB delete failed, removing from localStorage:', err);
  }

  try {
    localStorage.removeItem(`sr_custom_logo_${companyId}`);
  } catch (e) {
    // ignore
  }
}

/**
 * Delete all custom logos (Reset system)
 */
export async function clearAllCustomLogos(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    // ignore
  }

  const keys = ['sr-group', 'suhel-engineering', 'sr-infra', 'sr-power-solution'];
  keys.forEach((k) => localStorage.removeItem(`sr_custom_logo_${k}`));
}

/**
 * Process uploaded File into high-quality CustomLogoData
 * Validates format, size (10MB limit), and calculates image dimensions.
 */
export function processLogoFile(file: File, companyId: string): Promise<CustomLogoData> {
  return new Promise((resolve, reject) => {
    // 1. Validate File Size (10 MB Limit)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > MAX_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      reject(new Error(`File size (${sizeMB} MB) exceeds the 10 MB limit. Please upload a smaller file.`));
      return;
    }

    // 2. Validate MIME Type & Extension
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const extensionMatch = file.name.match(/\.(jpg|jpeg|png|webp)$/i);

    if (!validTypes.includes(file.type.toLowerCase()) && !extensionMatch) {
      reject(new Error('Invalid image format. Only JPG, JPEG, PNG, and WEBP files are allowed.'));
      return;
    }

    // 3. Read raw file as Data URL without aggressive compression or canvas alteration
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Failed to read the image file. Please try again.'));
    };

    reader.onload = () => {
      const dataUrl = reader.result as string;

      // 4. Create in-memory HTML Image to extract original dimensions & aspect ratio
      const img = new Image();

      img.onerror = () => {
        reject(new Error('Corrupted image file. Could not parse image dimensions.'));
      };

      img.onload = () => {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        const aspectRatio = width / (height || 1);

        const logoData: CustomLogoData = {
          companyId,
          dataUrl,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type || 'image/png',
          width,
          height,
          aspectRatio,
          uploadedAt: new Date().toISOString(),
          bgStyle: 'auto',
        };

        resolve(logoData);
      };

      img.src = dataUrl;
    };

    reader.readAsDataURL(file);
  });
}
