<template>
  <div class="h-[41px] flex items-center">
    tags
    <el-check-tag
      v-for="tag in activeTags"
      :key="tag.uniKey"
      checked
    >
      {{
        tag.title }}
    </el-check-tag>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutStore } from '~/store/layout'

const route = useRoute()
const layoutStore = useLayoutStore()
const { addTags, menuMap } = layoutStore
const { activeTags } = storeToRefs(layoutStore)

onMounted(() => {
  const menu = menuMap[route.path.replace('/', '')]
  if (menu) {
    addTags(menu)
  }
})
</script>
