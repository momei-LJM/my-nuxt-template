<template>
  <div class="h-[41px] flex items-center">
    <div
      v-for="tab in tabsList"
      :key="tab.path"
      :class="['tab-item', { active: tab.path === activeTab }]"
      @click="handleTabClick(tab)"
    >
      <span>{{ tab.title }}</span>
      <i
        v-if="!tab.affix"
        class="el-icon-close"
        @click.stop="handleCloseTab(tab.path)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutStore } from '~/store/layout'
import { useTagNavStore, type TabItem } from '~/store/tagNav'

const route = useRoute()
const router = useRouter()
const { menuMap } = storeToRefs(useLayoutStore())

const tabsStore = useTagNavStore()

const { tabsList, activeTab } = storeToRefs(tabsStore)

// 点击页签切换
const handleTabClick = (tab: TabItem) => {
  if (tab.path !== activeTab.value) {
    router.push(tab.path)
    tabsStore.setActiveTab(tab.path)
  }
}

// 关闭页签
const handleCloseTab = (path: string) => {
  tabsStore.closeTab(path)
}

// 监听路由变化
const watchRouteChange = () => {
  if (route.path && !tabsList.value.some(t => t.path === route.path)) {
    const key = route.path.split('/')[1]
    const menu = menuMap.value[key!]
    tabsStore.addTab({
      path: `/${menu?.path}`,
      name: menu?.title || '',
      title: menu?.title || '未知页签',
      icon: menu?.icon || '',
    })
  }
}

// 初始化
watchRouteChange()
</script>

<style lang="scss" scoped>
.tabs-view {
  width: 100%;
  height: 40px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
}

.tabs-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.tabs-operation {
  padding: 0 10px;
  height: 100%;
  display: flex;
  align-items: center;
  border-right: 1px solid #e4e7ed;
}

.tabs-container {
  flex: 1;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.tab-item {
  height: 100%;
  min-width: 80px;
  padding: 0 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  color: #606266;
  border-right: 1px solid #e4e7ed;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.tab-item.active {
  background-color: #fff;
  color: #409eff;
}

.tab-item:hover {
  background-color: #e4e7ed;
}

.tab-item.active:hover {
  background-color: #fff;
}

.tab-item .el-icon-close {
  margin-left: 5px;
  font-size: 12px;
  opacity: 0.6;
  transition: all 0.3s;
}

.tab-item .el-icon-close:hover {
  opacity: 1;
  transform: scale(1.2);
  color: #f56c6c;
}
</style>
