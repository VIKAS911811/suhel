/**
 * High-Quality CMD Profile & Photo Storage System using IndexedDB with localStorage fallback.
 * Preserves 100% original photo quality, original aspect ratio, and raw file bytes.
 * Supports files up to 10 MB (JPG, JPEG, PNG, WEBP).
 */

import cmdPhotoAsset from '../assets/images/cmd_rk_ansari.jpg';
import { CMD_PHOTO_DATA_URL } from '../assets/images/cmdBase64';
import { MD_PHOTO_DATA_URL } from '../assets/images/mdBase64';

export interface CmdData {
  name: string;
  title: string;
  companyName: string;
  photoDataUrl: string; // Base64 Data URL or Asset URL
  photoWidth?: number;
  photoHeight?: number;
  message: string;
  bio: string;
  experience: string;
  qualification: string;
  achievements: string[];
  email: string;
  phone: string;
  updatedAt: string;
}

export const DEFAULT_CMD_DATA: CmdData = {
  name: 'R. K. ANSARI',
  title: 'CHAIRMAN & MANAGING DIRECTOR (CMD)',
  companyName: 'SR GROUP',
  photoDataUrl: CMD_PHOTO_DATA_URL || cmdPhotoAsset || '/cmd_rk_ansari.jpg',
  photoWidth: 1200,
  photoHeight: 800,
  message: '“Built on Experience. Driven by Excellence. Trusted by Industry.”',
  bio: 'With over 30+ years of rich and extensive experience in the industrial sector, Mr. R. K. Ansari has established a strong legacy of visionary leadership, technical expertise, quality commitment, safety and professional project execution. Under his leadership, SR GROUP continues to grow as a trusted name in industrial project services, delivering reliable, efficient and quality-driven solutions to clients across diverse industrial environments.',
  experience: '30+ YEARS OF LEGACY • EXPERIENCE • LEADERSHIP',
  qualification: 'Visionary Leader & Heavy Industrial Engineering Expert',
  achievements: [
    'Industrial Project Execution & Management',
    'Fabrication & Heavy Structural Erection',
    'Mechanical Works & Equipment Installation',
    'Piping Works & Plant Maintenance',
    'Quality & Safety Commitment across all sites',
    'Timely Delivery & Long-Term Client Trust'
  ],
  email: 'info@srgroupone.com',
  phone: '(+91) 9898 241 068',
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_MD_DATA: CmdData = {
  name: 'SUHEL ANSARI',
  title: 'MANAGING DIRECTOR (MD)',
  companyName: 'SR GROUP',
  photoDataUrl: MD_PHOTO_DATA_URL || '/md_photo.jpg',
  photoWidth: 1448,
  photoHeight: 1086,
  message: '“Driven by Vision. Focused on Excellence. Committed to Growth.”',
  bio: 'With over 10+ years of professional experience in the industrial sector, Mr. Suhel Ansari brings a strong combination of leadership, technical understanding, project management and business development to SR GROUP. With a focus on quality, safety, efficiency and client satisfaction, he plays a key role in driving the group’s growth and strengthening its capabilities across industrial projects.',
  experience: '10+ YEARS OF INDUSTRIAL EXPERIENCE',
  qualification: 'Executive Leadership, Business Development & Project Execution Specialist',
  achievements: [
    'Industrial Project Management & Execution',
    'Heavy Fabrication & Erection Leadership',
    'Process Mechanical Works & Equipment Installation',
    'Plant Maintenance, Quality & Safety Systems',
    'Strategic Business Development & Client Coordination'
  ],
  email: 'info@srgroupone.com',
  phone: '(+91) 9129 325 506',
  updatedAt: new Date().toISOString(),
};

const DB_NAME = 'SRGroupCmdDB';
const DB_VERSION = 1;
const STORE_NAME = 'cmd_profile';
const CMD_KEY = 'cmd_main_profile';
const MD_KEY = 'md_main_profile';

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
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

/**
 * Save Leader (CMD / MD) Profile into IndexedDB & Server API
 */
export async function saveCmdProfile(data: CmdData, role: 'cmd' | 'md' = 'cmd'): Promise<void> {
  const key = role === 'md' ? MD_KEY : CMD_KEY;
  const itemToSave = { id: key, ...data, updatedAt: new Date().toISOString() };

  // 1. Sync with Server API so it persists across published builds & all devices
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

    fetch('/api/cmd', {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ role, data }),
    }).catch((err) => console.warn('Server cmd sync warning:', err));
  } catch (e) {
    // Ignore server sync failure
  }

  // 2. Save to IndexedDB
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(itemToSave);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn(`IndexedDB ${role} write failed, falling back to localStorage:`, err);
    try {
      localStorage.setItem(`sr_group_${role}_profile`, JSON.stringify(itemToSave));
    } catch (lsErr) {
      console.error(`LocalStorage quota exceeded for ${role} profile:`, lsErr);
    }
  }
}

/**
 * Get Leader (CMD / MD) Profile from Server API, IndexedDB, or localStorage
 */
export async function getCmdProfile(role: 'cmd' | 'md' = 'cmd'): Promise<CmdData> {
  const key = role === 'md' ? MD_KEY : CMD_KEY;
  const defaultData = role === 'md' ? DEFAULT_MD_DATA : DEFAULT_CMD_DATA;

  const sanitizeAndMerge = (raw: any): CmdData => {
    if (!raw || typeof raw !== 'object') return defaultData;
    return {
      name: raw.name && raw.name !== 'Shri SR Sharma' ? raw.name : defaultData.name,
      title: raw.title || defaultData.title,
      companyName: raw.companyName || defaultData.companyName,
      photoDataUrl: raw.photoDataUrl || defaultData.photoDataUrl,
      photoWidth: raw.photoWidth || defaultData.photoWidth,
      photoHeight: raw.photoHeight || defaultData.photoHeight,
      message: (raw.message && raw.message.trim().length > 0) ? raw.message : defaultData.message,
      bio: (raw.bio && raw.bio.trim().length > 0) ? raw.bio : defaultData.bio,
      experience: raw.experience || defaultData.experience,
      qualification: raw.qualification || defaultData.qualification,
      achievements: (Array.isArray(raw.achievements) && raw.achievements.length > 0)
        ? raw.achievements
        : defaultData.achievements,
      email: raw.email || defaultData.email,
      phone: raw.phone || defaultData.phone,
      updatedAt: raw.updatedAt || defaultData.updatedAt,
    };
  };

  // 1. Try fetching from Server API first (persisted on server disk)
  try {
    const res = await fetch('/api/cmd');
    if (res.ok) {
      const serverData = await res.json();
      if (serverData && serverData[role]) {
        return sanitizeAndMerge(serverData[role]);
      }
    }
  } catch (apiErr) {
    console.warn('Server cmd fetch failed, trying local DB:', apiErr);
  }

  // 2. Try IndexedDB
  try {
    const db = await openDB();
    const result = await new Promise<any>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (result) {
      const { id, ...data } = result;
      return sanitizeAndMerge(data);
    }
  } catch (err) {
    console.warn(`IndexedDB ${role} read failed, checking localStorage fallback:`, err);
  }

  // 3. Try LocalStorage
  try {
    const raw = localStorage.getItem(`sr_group_${role}_profile`);
    if (raw) {
      const parsed = JSON.parse(raw);
      const { id, ...data } = parsed;
      return sanitizeAndMerge(data);
    }
  } catch (e) {
    // ignore
  }

  return defaultData;
}

/**
 * Reset Leader Profile to defaults
 */
export async function resetCmdProfile(role: 'cmd' | 'md' = 'cmd'): Promise<CmdData> {
  const key = role === 'md' ? MD_KEY : CMD_KEY;
  const defaultData = role === 'md' ? DEFAULT_MD_DATA : DEFAULT_CMD_DATA;

  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    // ignore
  }

  try {
    localStorage.removeItem(`sr_group_${role}_profile`);
  } catch (e) {
    // ignore
  }

  return defaultData;
}

/**
 * Process uploaded File into photo Data URL
 */
export function processCmdPhotoFile(file: File): Promise<{ dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB limit
    if (file.size > MAX_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      reject(new Error(`File size (${sizeMB} MB) exceeds the 10 MB limit. Please upload a smaller file.`));
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const extensionMatch = file.name.match(/\.(jpg|jpeg|png|webp)$/i);

    if (!validTypes.includes(file.type.toLowerCase()) && !extensionMatch) {
      reject(new Error('Invalid image format. Only JPG, JPEG, PNG, and WEBP files are allowed.'));
      return;
    }

    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Failed to read the photo file. Please try again.'));
    };

    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();

      img.onerror = () => {
        reject(new Error('Corrupted image file. Could not parse image dimensions.'));
      };

      img.onload = () => {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        resolve({ dataUrl, width, height });
      };

      img.src = dataUrl;
    };

    reader.readAsDataURL(file);
  });
}
