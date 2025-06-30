<template>
  <define-template v-slot="{ menu, isSub }">
    <svg-icon
      v-if="isSub&&menu.icon"
      :icon-class="menu.icon"
      class="mr-[6px] svg-icon-menu"
    />
    <span>{{ menu.title }}</span>
  </define-template>
  <el-sub-menu
    v-if="menu.children"
    :index="menu.uniKey"
    :collapse-close-icon="menu.icon"
  >
    <template #title>
      <reuse-template
        :menu="menu"
        :is-sub="true"
      />
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
    class="layout-menu-item"
    @click="onMenuClick"
  >
    <svg-icon
      v-if="menu.icon"
      :icon-class="menu.icon"
      class="mr-[6px] svg-icon-menu"
    />
    <template #title>
      <reuse-template :menu="menu" />
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import type { MenuItemRegistered } from 'element-plus'
import type { TMenu } from '~/store/layout'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const { menu } = defineProps<{
  menu: TMenu
}>()

const router = useRouter()
const onMenuClick = (v: MenuItemRegistered) => {
  router.push(v.index)
}
</script>

<style lang="scss" scoped>
@mixin menu-item-style {
  height: 50px;
  .svg-icon-menu {
    color: #006aff;
  }
  &.is-active {
    box-sizing: border-box;
    background-image: linear-gradient(90deg, #2294ff 0%, #006aff 100%);
    border-radius: 2px;
    color: #fff !important;
    .svg-icon-menu {
      color: #ffffff;
    }
  }
  &:focus,
  &:hover {
    background-color: #e8f5ff;
    color: #006aff;
  }
}
:deep(.el-sub-menu__title:hover) {
  background-color: #e8f5ff;
  color: #006aff;
}
:deep(.el-sub-menu__title) {
  .svg-icon-menu {
    color: #006aff;
  }
}
.el-menu-item {
  @include menu-item-style;
}
.layout-menu-item {
  @include menu-item-style;
}
</style>
