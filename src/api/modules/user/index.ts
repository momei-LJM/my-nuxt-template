import type { TUserInfoRes } from './model'
import { commonAccessService } from '@/api/config/service'

/**
 * 获取登录人身份信息
 */
export const getWhaleIdentityInfo = () =>
  commonAccessService.get<TUserInfoRes>('/identityInfo/getWhaleIdentityInfo', undefined, { loading: true })
