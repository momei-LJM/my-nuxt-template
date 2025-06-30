<template>
  <div class="text-red-500">
    hellow
    {{ user.name }}
    <el-button
      type="primary"
      @click="to"
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
const a = ref(1)
a.value = 2

const router = useRouter()

const to = () => {
  router.push({ name: 'Landing' })
}
</script>

<style lang="scss" scoped>

</style>
