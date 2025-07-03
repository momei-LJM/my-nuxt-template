import { SESSION_STORAGE_KEY } from './enum'
import { setSession, getSession, removeSession } from './utils'

export const setSessionTag = (data: any) =>
  setSession(SESSION_STORAGE_KEY.TAG, data)

export const getSessionTag = () =>
  getSession<any>(SESSION_STORAGE_KEY.TAG)
export const removeSessionTag = () =>
  removeSession(SESSION_STORAGE_KEY.TAG)

export { }
