<template>
  <define-template v-slot="{ menu, isSub }">
    <svg-icon
      v-if="isSub&&menu.icon"
      :icon-class="menu.icon"
      class="svg-icon-menu shrink-0 mr-[6px]"
    />
    <span>
      {{ menu.title }}
    </span>
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
      class="svg-icon-menu shrink-0 mr-[6px]"
    />
    <template #title>
      <reuse-template :menu="menu" />
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import type { MenuItemRegistered } from 'element-plus'
import { useLayoutStore, type TMenu } from '~/store/layout'
import { useTagNavStore } from '~/store/tagNav'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const { menu } = defineProps<{
  menu: TMenu
}>()
const { menuMap } = storeToRefs(useLayoutStore())
const { addTab } = useTagNavStore()
const router = useRouter()
const onMenuClick = (v: MenuItemRegistered) => {
  router.push(v.index)
  const menu = menuMap.value[v.index]
  addTab(
    {
      path: v.index,
      name: menu?.title || '',
      title: menu?.title || '',
      icon: menu?.icon || '',
      affix: false,
    })
}
</script>

<style lang="scss" scoped>
@mixin menu-item-style {
  height: 48px;
  margin: 4px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  .svg-icon-menu {
    color: #64748b;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    transition: color 0.2s ease;
  }

  // 默认状态
  &:not(.is-active) {
    &:hover {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      transform: translateX(2px);

      .svg-icon-menu {
        color: #3b82f6;
      }
    }
  }

  // 激活状态
  &.is-active {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: #ffffff !important;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

    .svg-icon-menu {
      color: #ffffff;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 100%;
      background: #ffffff;
      border-radius: 0 2px 2px 0;
    }
  }

  // 菜单项文字
  .el-menu-item__title {
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.25px;
  }
}

// 子菜单标题样式
:deep(.el-sub-menu__title) {
  height: 48px;
  margin: 4px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-weight: 500;
  color: #374151;

  .svg-icon-menu {
    color: #64748b;
    width: 18px;
    height: 18px;
    transition: color 0.2s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    color: #1f2937;
    transform: translateX(2px);

    .svg-icon-menu {
      color: #3b82f6;
    }
  }
}

// 子菜单面板
:deep(.el-sub-menu .el-menu) {
  background: transparent;

  .el-menu-item {
    height: 40px;
    margin: 2px 16px 2px 32px;
    border-radius: 6px;
    font-size: 13px;
    color: #6b7280;

    &:hover {
      background: rgba(59, 130, 246, 0.08);
      color: #3b82f6;
    }

    &.is-active {
      background: rgba(59, 130, 246, 0.12);
      color: #3b82f6;
      font-weight: 500;

      &::before {
        content: '';
        position: absolute;
        left: -16px;
        top: 50%;
        transform: translateY(-50%);
        width: 2px;
        height: 16px;
        background: #3b82f6;
        border-radius: 1px;
      }
    }
  }
}

// 菜单项基础样式
.el-menu-item {
  @include menu-item-style;
}

.layout-menu-item {
  @include menu-item-style;
}

// 折叠状态优化
:deep(.el-menu--collapse) {
  .el-menu-item,
  .el-sub-menu__title {
    margin: 4px 6px;
    justify-content: center;

    .svg-icon-menu {
      margin-right: 0;
    }
  }
}
</style>
