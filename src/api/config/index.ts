import qs from 'qs'

const requestInterceptor = ({ options }: any) => {
  return options
}

const responseInterceptor = ({ response }: any) => {
  if (response._data?.code !== 0) {
    throw new Error(response._data?.message || '请求失败')
  }
}
const apiFetch = $fetch.create({
  baseURL: '/api',
  onRequest: [requestInterceptor],
  onResponse: [responseInterceptor],
})

const createHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'access-token': 'xxx',
  }
}
export class ApiService {
  serviceName?: string
  baseUrl?: string
  constructor(serviceName?: string) {
    this.serviceName = serviceName
    this.baseUrl = serviceName ? `/api/${serviceName}` : undefined
  }

  public get<P, R>(url: string, params?: P) {
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

export const http = new ApiService()

export const createService = (serviceName?: string) => {
  return new ApiService(serviceName)
}
