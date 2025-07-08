<template>
  <div class="navbar-container bg-white border-b border-slate-200 shadow-sm backdrop-blur-md">
    <div class="flex items-center justify-between h-16 px-6">
      <!-- 左侧区域 -->
      <div class="flex items-center gap-6">
        <!-- 折叠按钮 -->
        <button
          class="collapse-btn group"
          @click="() => toggleCollapse()"
        >
          <svg-icon
            :icon-class="isCollapse ? 'base-menu-unfold' : 'base-menu-fold'"
            class="w-5 h-5 transition-all duration-200 group-hover:text-blue-600 group-hover:scale-110"
          />
        </button>

        <!-- 面包屑导航 -->
        <nav class="breadcrumb-nav flex-1">
          <ol class="flex items-center gap-2 text-sm">
            <transition-group
              name="breadcrumb"
              tag="div"
              class="flex items-center gap-2"
            >
              <li
                v-for="(item, index) in breadcrumb"
                :key="item.path || item.uniKey"
                class="breadcrumb-item"
              >
                <!-- 分隔符 -->
                <svg
                  v-if="index > 0"
                  class="breadcrumb-separator w-4 h-4 text-slate-400 mx-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>

                <!-- 面包屑项 -->
                <router-link
                  v-if="item.path && index < breadcrumb.length - 1"
                  :to="`/${item.path}`"
                  class="breadcrumb-link"
                >
                  {{ item.title }}
                </router-link>
                <span
                  v-else
                  class="breadcrumb-current"
                >
                  {{ item.title }}
                </span>
              </li>
            </transition-group>
          </ol>
        </nav>
      </div>

      <!-- 右侧区域 -->
      <div class="flex items-center gap-4">
        <!-- 用户信息区域 -->
        <div class="user-section flex items-center gap-3">
          <div class="user-avatar w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
          <span class="user-name text-sm font-medium text-slate-700">
            用户名
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLayoutStore } from '~/store/layout'

const route = useRoute()

const layoutStore = useLayoutStore()
const { getBreadcrumbByRoute } = layoutStore
const { isCollapse } = storeToRefs(layoutStore)

const { toggleCollapse } = useLayoutStore()
const breadcrumb = computed(() => {
  // 取完整 path，适配多级路由
  const path = route.path.replace(/^\//, '')
  return getBreadcrumbByRoute(path)
})
</script>

<style lang="scss" scoped>
.navbar-container {
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

.collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  color: #475569;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  background: transparent;

  &:hover {
    color: #3b82f6;
    background-color: #eff6ff;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

.breadcrumb-nav {
  max-width: 100%;
  overflow: hidden;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-separator {
  transition: color 0.2s ease;
}

.breadcrumb-link {
  color: #475569;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #3b82f6;
    text-decoration: underline;
    text-decoration-color: #3b82f6;
    text-underline-offset: 2px;
  }
}

.breadcrumb-current {
  color: #0f172a;
  font-weight: 600;
}

.user-section {
  .user-avatar {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border: 2px solid white;
    transition: transform 0.2s ease;
    cursor: pointer;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 70%, #1d4ed8 100%);

    &:hover {
      transform: scale(1.05);
    }
  }

  .user-name {
    transition: color 0.2s ease;
    cursor: pointer;

    &:hover {
      color: #3b82f6;
    }

    @media (max-width: 640px) {
      display: none;
    }
  }
}

// 面包屑动画
.breadcrumb-enter-active {
  transition: all 0.3s ease-out;
}

.breadcrumb-leave-active {
  transition: all 0.3s ease-in;
}

.breadcrumb-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.breadcrumb-move {
  transition: transform 0.3s ease;
}

// 响应式优化
@media (max-width: 768px) {
  .navbar-container {
    .flex {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  .breadcrumb-nav {
    display: none;

    @media (min-width: 640px) {
      display: block;
    }
  }
}

@media (max-width: 640px) {
  .breadcrumb-item {
    .breadcrumb-link,
    .breadcrumb-current {
      font-size: 0.75rem;
    }
  }

  .collapse-btn {
    width: 2rem;
    height: 2rem;

    :deep(.svg-icon) {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
