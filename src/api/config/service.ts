import { createService } from '.'

export const dataProcess = '/booking-data-process/access'
export const gogoAccess = '/labubu-gogogo/access'

/** 导出 */
export const exportService = createService(dataProcess)
/** 通用服务 */
export const commonAccessService = createService(gogoAccess)
