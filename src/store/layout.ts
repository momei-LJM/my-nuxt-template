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
  },
  {
    uniKey: 'order-manage',
    path: 'order-manage',
    title: '订单管理',
  },
  {
    title: '嵌套菜单测试',
    uniKey: 'nested-menu',
    children: [
      {
        path: 'nested-menu-1',
        title: '嵌套菜单1',
        uniKey: 'nested-menu-1',
      },
      {
        path: 'nested-menu-2',
        title: '嵌套菜单2',
        uniKey: 'nested-menu-2',
      },
    ],
  },

]

export const useLayoutStore = defineStore('layout', () => {
  const menus = ref(menusData)
  const isCollapse = ref(false)
  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }
  return { isCollapse, toggleCollapse, menus }
})
