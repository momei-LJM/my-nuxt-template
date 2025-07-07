import { ResultEnum } from './enums'
import { getLocalToken, removeLocalToken } from '~/storage'

export const requestInterceptor = ({ options }: any) => {
  return options
}

export const responseInterceptor = ({ response }: any) => {
  const data = response._data
  const code = data.code
  if (code === ResultEnum.OVERDUE) {
    getLocalToken() && removeLocalToken()
    ElMessage.error(data?.message)
    navigateTo('/landing')
    return
  }
  if (code !== ResultEnum.SUCCESS) {
    ElMessage.error(data?.message)
    throw new Error(data?.message || '请求失败')
  }
}
