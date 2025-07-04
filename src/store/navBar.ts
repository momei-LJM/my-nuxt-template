import { useLayoutStore, type TMenu } from './layout'

export const useNavBarStore = defineStore('navBar', () => {
  const { menus } = storeToRefs(useLayoutStore())
  // 导航生成方法
  function getBreadcrumbByRoute(path: string): TMenu[] {
    const result = findMenuPathByRoute(path, menus.value)
    return result || []
  }

  return { getBreadcrumbByRoute }
})
