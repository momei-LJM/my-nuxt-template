import { commonAccessService } from '@/api/config/service'

/**
 * 获取登录人身份信息
 */
export const getWhaleIdentityInfo = () =>
  commonAccessService.get<any>('/identityInfo/getWhaleIdentityInfo', undefined)
