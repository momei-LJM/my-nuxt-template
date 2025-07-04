<template>
  <el-breadcrumb
    separator="/"
    class="h-[48px] flex items-center shadow-sm w-full px-4"
  >
    <el-breadcrumb-item
      v-for="item in breadcrumb"
      :key="item.path || item.uniKey"
      :to="item.path ? { path: '/' + item.path } : undefined"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNavBarStore } from '~/store/navBar'

const route = useRoute()
const { getBreadcrumbByRoute } = useNavBarStore()
const breadcrumb = computed(() => {
  // 取完整 path，适配多级路由
  const path = route.path.replace(/^\//, '')
  return getBreadcrumbByRoute(path)
})
</script>
