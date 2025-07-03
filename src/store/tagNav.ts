import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { getSessionTag, setSessionTag } from '~/storage'

// 页签项接口
export interface TabItem {
  path: string
  name: string
  title: string
  icon?: string
  affix?: boolean
}

export const useTagNavStore = defineStore('tagNav', () => {
  // 存储页签列表
  const tabsList = ref<TabItem[]>(getSessionTag() || [])
  // 当前激活的页签路径
  const activeTab = ref<string>('')

  // 固定页签列表计算属性
  const affixTabs = computed(() => {
    return tabsList.value.filter(tab => tab.affix)
  })

  // 可关闭页签列表计算属性
  const closableTabs = computed(() => {
    return tabsList.value.filter(tab => !tab.affix)
  })

  // 添加页签
  function addTab(tab: TabItem) {
    // 检查是否已存在
    const existTab = tabsList.value.find(t => t.path === tab.path)
    if (!existTab) {
      tabsList.value.push(tab)
    }
    else {
      Object.assign(existTab, tab)
    }
    // 设置为激活页签
    activeTab.value = tab.path
  }

  // 关闭页签
  function closeTab(path: string) {
    // 如果是固定页签，不允许关闭
    const tab = tabsList.value.find(t => t.path === path)
    if (tab && tab.affix) return

    const index = tabsList.value.findIndex(t => t.path === path)
    if (index > -1) {
      tabsList.value.splice(index, 1)

      // 如果关闭的是当前激活页签
      if (path === activeTab.value) {
        // 如果还有其他页签，激活前一个
        if (tabsList.value.length > 0) {
          const newIndex = Math.max(0, index - 1)
          activeTab.value = tabsList.value![newIndex]!.path
        }
        else {
          // 没有页签了，回到首页
          activeTab.value = '/'
        }
      }
    }
  }

  // 关闭其他页签
  function closeOtherTabs(path: string) {
    const currentTab = tabsList.value.find(t => t.path === path)
    if (!currentTab) return

    // 保留固定页签和当前页签
    tabsList.value = [...affixTabs.value, currentTab]
    activeTab.value = path
  }

  // 关闭所有页签
  function closeAllTabs() {
    // 只保留固定页签
    tabsList.value = [...affixTabs.value]
    if (tabsList.value.length > 0) {
      activeTab.value = tabsList.value[0]!.path
    }
    else {
      activeTab.value = '/'
    }
  }

  // 设置当前激活页签
  function setActiveTab(path: string) {
    activeTab.value = path
  }

  // 初始化页签
  function initTabs(tabs: TabItem[]) {
    tabsList.value = tabs
    if (tabs.length > 0) {
      activeTab.value = tabs[0]!.path
    }
  }

  watch(() => tabsList.value, () => {
    setSessionTag(tabsList.value)
  }, { immediate: true, deep: true })

  return {
    tabsList,
    activeTab,
    affixTabs,
    closableTabs,
    addTab,
    closeTab,
    closeOtherTabs,
    closeAllTabs,
    setActiveTab,
    initTabs,
  }
})
