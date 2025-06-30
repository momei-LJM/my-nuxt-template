<template>
  <div class="text-red-500">
    hellow
    {{ user.name }}
    <el-button
      type="primary"
      @click="changeName"
    >
      11
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useBaseStore } from '~/store'

const baseStore = useBaseStore()
const { user } = storeToRefs(baseStore)
const { changeName } = baseStore
const a = ref(1)
a.value = 2
</script>

<style lang="scss" scoped>

</style>
