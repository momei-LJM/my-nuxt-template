<template>
  <div class="tabs-container bg-white border-b border-slate-200 px-4 py-2 shadow-sm">
    <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide">
      <transition-group
        name="tab"
        tag="div"
        class="flex items-center gap-2"
      >
        <div
          v-for="tab in tabsList"
          :key="tab.path"
          class="tab-item group"
          :class="[
            activeTab === tab.path ? 'tab-active' : 'tab-inactive',
          ]"
          @click="handleTabClick(tab)"
        >
          <!-- 图标 -->
          <svg-icon
            v-if="tab.icon"
            :icon-class="tab.icon"
            class="w-4 h-4 transition-colors duration-200"
            :class="[
              activeTab === tab.path ? 'text-blue-600' : 'text-slate-500',
            ]"
          />

          <!-- 标签标题 -->
          <span class="tab-title">
            {{ tab.title }}
          </span>

          <!-- 关闭按钮 -->
          <button
            v-if="!tab.affix"
            class="tab-close"
            @click.stop="handleCloseTab(tab.path)"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- 活跃状态指示器 -->
          <div
            v-if="activeTab === tab.path"
            class="tab-indicator"
          />
        </div>
      </transition-group>
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
  router.push(activeTab.value)
}

// 监听路由变化
const watchRouteChange = () => {
  if (route.path && !tabsList.value.some(t => t.path === route.path)) {
    const key = route.path.split('/')[1]
    const menu = menuMap.value[key!]
    tabsStore.addTab({
      path: `${menu?.path}`,
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
.tabs-container {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent);
  }
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.tab-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  min-width: fit-content;
  white-space: nowrap;
  border: 1px solid transparent;

  &:hover {
    transform: scale(1.05);
  }

  // 默认样式
  &.tab-inactive {
    background-color: #f8fafc;
    color: #475569;
    border-color: #e2e8f0;

    &:hover {
      background-color: #f1f5f9;
      color: #334155;
      border-color: #cbd5e1;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
  }

  // 激活样式
  &.tab-active {
    background: linear-gradient(to right, #eff6ff, #dbeafe);
    color: #1d4ed8;
    border-color: #bfdbfe;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    .tab-title {
      font-weight: 500;
    }
  }
}

.tab-title {
  font-size: 0.8125rem;
  line-height: 1.2;
  font-weight: 400;
  transition: all 0.2s ease;
  user-select: none;
}

.tab-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  color: #94a3b8;
  transition: all 0.2s ease;
  opacity: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    color: #ef4444;
    background-color: #fef2f2;
    transform: scale(1.1);
  }

  .tab-item:hover & {
    opacity: 1;
  }

  .tab-active & {
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
}

.tab-indicator {
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 2rem;
  height: 0.125rem;
  background: linear-gradient(to right, #3b82f6, #2563eb);
  border-radius: 9999px;
  animation: slideIn 0.3s ease-out;
}

// 过渡动画
.tab-enter-active {
  transition: all 0.3s ease-out;
}

.tab-leave-active {
  transition: all 0.3s ease-in;
}

.tab-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.9);
}

.tab-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.9);
}

.tab-move {
  transition: transform 0.3s ease;
}

@keyframes slideIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 2rem;
    opacity: 1;
  }
}

// 响应式优化
@media (max-width: 768px) {
  .tab-item {
    padding: 0.375rem 0.5rem;

    .tab-title {
      font-size: 0.75rem;
    }
  }
}
</style>
