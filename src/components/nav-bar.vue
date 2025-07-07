<template>
  <div class="flex items-center px-[10px] shadow-sm">
    <svg-icon
      :icon-class="isCollapse ? 'base-menu-unfold' : 'base-menu-fold'"
      class="cursor-pointer !text-[20px]"
      @click="toggleCollapse"
    />

    <el-breadcrumb
      separator="/"
      class="h-[48px] flex items-center flex-1 px-4"
    >
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="item in breadcrumb"
          :key="item.path || item.uniKey"
          :to="item.path ? { path: '/' + item.path } : undefined"
        >
          {{ item.title }}
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
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
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
