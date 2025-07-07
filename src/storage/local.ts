import { LOCAL_STORAGE_KEY } from './enum'
import { getLocal, removeLocal, setLocal } from './utils'

/**
 * token
 */
export const setLocalToken = (data: string) =>
  setLocal(LOCAL_STORAGE_KEY.TOKEN, data)
export const getLocalToken = () => getLocal<string>(LOCAL_STORAGE_KEY.TOKEN)
export const removeLocalToken = () => removeLocal(LOCAL_STORAGE_KEY.TOKEN)
