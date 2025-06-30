<template>
  <el-sub-menu
    v-if="menu.children"
    :index="menu.uniKey"
  >
    <template #title>
      <el-icon />
      <span>{{ menu.title }}</span>
    </template>
    <sub-menu-render
      v-for="m in menu.children"
      :key="m.uniKey"
      :menu="m"
    />
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="menu.uniKey"
    @click="onMenuClick"
  >
    <template #title>
      <el-icon />
      <span>{{ menu.title }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import type { MenuItemRegistered } from 'element-plus'
import type { TMenu } from '~/store/layout'

const { menu } = defineProps<{
  menu: TMenu
}>()
const router = useRouter()
const onMenuClick = (v: MenuItemRegistered) => {
  router.push(v.index)
}
</script>
