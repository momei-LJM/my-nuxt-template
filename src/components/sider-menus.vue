<template>
  <div>
    <div
      class="h-[50px] flex justify-center items-center text-green-400 font-bold relative overflow-hidden flex-wrap"
    >
      <span v-if="!isCollapse">
        Nuxt Template
      </span>
    </div>
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
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
:deep(.el-menu) {
  border-right: none;
}
</style>
