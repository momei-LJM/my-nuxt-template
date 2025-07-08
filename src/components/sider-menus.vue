<template>
  <div class="sidebar-container">
    <!-- Logo/Brand 区域 -->
    <div class="brand-section">
      <div class="brand-content">
        <div class="brand-icon">
          <svg-icon
            v-if="!isCollapse"
            icon-class="logo"
            class="logo-icon"
          />
          <div
            v-else
            class="logo-dot"
          />
        </div>
        <transition name="brand-text">
          <span
            v-if="!isCollapse"
            class="brand-text"
          >
            Nuxt Template
          </span>
        </transition>
      </div>
    </div>

    <!-- 菜单区域 -->
    <div class="menu-section">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="true"
        @open="handleOpen"
        @close="handleClose"
      >
        <template
          v-for="item in menus"
          :key="item.uniKey"
        >
          <sub-menu-render :menu="item" />
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutStore } from '~/store/layout'

const layoutStore = useLayoutStore()
const { menus, isCollapse } = storeToRefs(layoutStore)

const route = useRoute()

// 根据当前路由动态设置活跃菜单
const activeMenu = computed(() => {
  const path = route.path.replace(/^\//, '')

  // 递归查找匹配的菜单项
  const findMenuByPath = (menuItems: any[], targetPath: string): string | null => {
    for (const item of menuItems) {
      if (item.path === targetPath) {
        return item.uniKey
      }
      if (item.children) {
        const found = findMenuByPath(item.children, targetPath)
        if (found) return found
      }
    }
    return null
  }

  return findMenuByPath(menus.value, path) || ''
})

const handleOpen = () => { }
const handleClose = () => { }
</script>

<style lang="scss" scoped>
.sidebar-container {
  height: 100vh;
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border-right: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent);
  }
}

.brand-section {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-bottom: 1px solid #f1f5f9;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);

  .brand-content {
    display: flex;
    align-items: center;
    gap: 12px;

    .brand-icon {
      display: flex;
      align-items: center;
      justify-content: center;

      .logo-icon {
        width: 32px;
        height: 32px;
        color: #3b82f6;
      }

      .logo-dot {
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
        animation: pulse 2s infinite;
      }
    }

    .brand-text {
      font-size: 18px;
      font-weight: 700;
      background: linear-gradient(135deg, #1e293b, #3b82f6);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.5px;
    }
  }
}

.menu-section {
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;

    &:hover {
      background: #94a3b8;
    }
  }
}

// 过渡动画
.brand-text-enter-active,
.brand-text-leave-active {
  transition: all 0.3s ease;
}

.brand-text-enter-from,
.brand-text-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

// Element Plus 菜单样式重置
:deep(.el-menu) {
  border-right: none;
  background: transparent;

  &:not(.el-menu--collapse) {
    width: 240px;
  }

  &.el-menu--collapse {
    width: 64px;
  }
}
</style>
