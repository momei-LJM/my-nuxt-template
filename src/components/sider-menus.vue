<template>
  <div>
    <div class="h-[50px] flex justify-center items-center text-green-400 font-bold">
      Nuxt Template
    </div>
    <el-menu
      default-active="2"
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

<style lang="scss" scoped>

</style>
