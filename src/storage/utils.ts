import type { LOCAL_STORAGE_KEY, SESSION_STORAGE_KEY } from './enum'

const tryJsonParse = (data: string): any => {
  try {
    return JSON.parse(data)
  }
  catch (e) {
    console.error('JSON parse error:', e)
    return null
  }
}
const tryJsonStringify = (data: any): string => {
  try {
    return JSON.stringify(data)
  }
  catch (e) {
    console.error('JSON stringify error:', e)
    return ''
  }
}
export type LocalTypeKey = keyof typeof LOCAL_STORAGE_KEY
export type SessionTypeKey = keyof typeof SESSION_STORAGE_KEY
/**
 * Set value to localStorage with type safety
 */
export const setLocal = <T>(key: LocalTypeKey, value: T): void => {
  localStorage.setItem(key, tryJsonStringify(value))
}

/**
 * Get value from localStorage with type safety
 */
export const getLocal = <T>(key: LocalTypeKey): T | null => {
  const value = localStorage.getItem(key)
  if (!value)
    return null
  return tryJsonParse(value) as T
}

/**
 * Remove value from localStorage
 */
export const removeLocal = (key: LocalTypeKey): void => {
  localStorage.removeItem(key)
}

/**
 * Set value to sessionStorage with type safety
 */
export const setSession = <T>(key: SessionTypeKey, value: T): void => {
  sessionStorage.setItem(key, tryJsonStringify(value))
}

/**
 * Get value from sessionStorage with type safety
 */
export const getSession = <T>(key: SessionTypeKey): T | null => {
  const value = sessionStorage.getItem(key)
  if (!value)
    return null
  return tryJsonParse(value) as T
}

/**
 * Remove value from sessionStorage
 */
export const removeSession = (key: SessionTypeKey): void => {
  sessionStorage.removeItem(key)
}
