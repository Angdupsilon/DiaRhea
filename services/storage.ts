import { HistoryEntry } from '../types';

const STORAGE_KEYS = {
  HISTORY: 'dia-rhea-history',
  PENDING_PREFIX: 'dia-rhea-pending-',
  VERIFIED_PREFIX: 'dia-rhea-verified-',
};

// Session Storage (Pending Results & Verification)
export const storePendingResult = (testId: string, resultData: any) => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(`${STORAGE_KEYS.PENDING_PREFIX}${testId}`, JSON.stringify(resultData));
};

export const getPendingResult = (testId: string) => {
  if (typeof window === 'undefined') return null;
  const data = sessionStorage.getItem(`${STORAGE_KEYS.PENDING_PREFIX}${testId}`);
  return data ? JSON.parse(data) : null;
};

export const storeVerifiedCode = (testId: string, code: string) => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(`${STORAGE_KEYS.VERIFIED_PREFIX}${testId}`, code);
};

export const hasVerifiedCode = (testId: string): boolean => {
  if (typeof window === 'undefined') return false;
  return !!sessionStorage.getItem(`${STORAGE_KEYS.VERIFIED_PREFIX}${testId}`);
};

// Local Storage (History)
export const saveToHistory = (entry: HistoryEntry) => {
  if (typeof window === 'undefined') return;
  const history = getHistory();
  // Prepend new entry, limit to 50
  const newHistory = [entry, ...history].slice(0, 50);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
};

export const getHistory = (): HistoryEntry[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
  return data ? JSON.parse(data) : [];
};

export const deleteFromHistory = (entryId: string) => {
  if (typeof window === 'undefined') return;
  const history = getHistory();
  const newHistory = history.filter(item => item.id !== entryId);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
};

export const clearHistory = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
};