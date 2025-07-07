export interface TUserInfoRes {
  userInfo: UserInfo
  enterpriseInfo: EnterpriseInfo
}

export interface EnterpriseInfo {
  enterpriseId: number
  enterpriseName: string
  enterpriseState: number
}

export interface UserInfo {
  userId: number
  userType: number
  userGroup: string
  countryCode: string
  phone: string
  email: string
  nickname: string
  systemRole: number
}
