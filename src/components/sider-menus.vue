<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
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
const { menus } = storeToRefs(layoutStore)

const handleOpen = () => { }
const handleClose = () => { }
</script>
