export interface TMenu {
  path?: string
  icon?: string
  title?: string
  children?: TMenu[]
  uniKey: string
}
// 指定 path
const menusData: TMenu[] = [
  {
    uniKey: 'landing',
    path: 'landing',
    title: '落地页',
    icon: 'dcpt-dcgl',
  },
  {
    uniKey: 'order-manage',
    path: 'order-manage',
    icon: 'dcpt-dcgl',
    title: '订单管理',
  },
  {
    title: '嵌套菜单测试',
    uniKey: 'nested-menu',
    icon: 'dcpt-dcgl',
    children: [
      {
        path: 'nested-menu-1',
        title: '嵌套菜单1',
        uniKey: 'nested-menu-1',
        icon: 'dcpt-dcgl',
      },
      {
        path: 'nested-menu-2',
        title: '嵌套菜单2',
        uniKey: 'nested-menu-2',
        icon: 'dcpt-dcgl',
      },
    ],
  },

]

export const useLayoutStore = defineStore('layout', () => {
  const menus = ref(menusData)
  const menuMap = ref(flat2Map<TMenu>('path', menus.value))
  const isCollapse = ref(false)

  const breadcrumb = ref<TMenu[]>([])
  // 导航生成方法
  const getBreadcrumbByRoute = (path: string): TMenu[] => {
    const result = findMenuPathByRoute(path, menus.value)
    return result || []
  }
  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  return { isCollapse, toggleCollapse, menus, menuMap, getBreadcrumbByRoute, breadcrumb }
})
