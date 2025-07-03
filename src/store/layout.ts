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
  const menuMap = flat2Map<TMenu>('path', menus.value)
  const activeTags = ref<TMenu[]>([])
  const isCollapse = ref(false)
  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  const addTags = (path: TMenu) => {
    activeTags.value = [...activeTags.value, path]
  }
  return { isCollapse, toggleCollapse, menus, activeTags, addTags, menuMap }
})
