import { http } from '../config'

export const getApiTest = () => {
  return http.get('/get-method', { test: 1 })
}
