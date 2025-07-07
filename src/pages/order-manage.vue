<template>
  <div>
    order-manage
  </div>
</template>

<script lang="ts" setup>
import { getWhaleIdentityInfo } from '~/api/modules/user'

getWhaleIdentityInfo()
</script>
