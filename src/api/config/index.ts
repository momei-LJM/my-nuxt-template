import qs from 'qs'
import { requestInterceptor, responseInterceptor } from './Interceptors'

const apiFetch = $fetch.create({
  baseURL: import.meta.env.VITE_API_URL,
  onRequest: [requestInterceptor],
  onResponse: [responseInterceptor],
})

const createHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'access-token': 'mock-token',
  }
}
export class ApiService {
  serviceName?: string
  baseUrl?: string
  constructor(serviceName?: string) {
    this.serviceName = serviceName
    this.baseUrl = serviceName ? `${import.meta.env.VITE_API_URL}/${serviceName}` : undefined
  }

  public get<R>(url: string, params?: any) {
    const serialize = params ? qs.stringify(params, { arrayFormat: 'brackets' }) : params
    const search = serialize ? `${url}?${serialize}` : url
    return apiFetch<R>(search, {
      method: 'GET',
      baseURL: this.baseUrl,
      headers: createHeaders(),
    })
  }

  public post<R extends Record<string, any>>(url: string, params: any = {}) {
    return apiFetch<R>(url, {
      method: 'POST',
      baseURL: this.baseUrl,
      headers: createHeaders(),
      body: params,
    })
  }

  public put<R extends Record<string, any>>(url: string, params: any = {}) {
    return apiFetch<R>(url, {
      method: 'PUT',
      baseURL: this.baseUrl,
      headers: createHeaders(),
      body: params,
    })
  }

  public delete(url: string, params: any = {}) {
    return apiFetch(url, {
      method: 'DELETE',
      baseURL: this.baseUrl,
      headers: createHeaders(),
      body: params,
    })
  }
}

export const createService = (serviceName?: string) => {
  return new ApiService(serviceName)
}
