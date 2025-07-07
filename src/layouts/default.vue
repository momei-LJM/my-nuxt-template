<template>
  <div class="flex h-full">
    <div class="border-r-[1px] border-[#eee]">
      <sider-menus />
    </div>
    <div class="flex-1 flex flex-col">
      <nav-bar />
      <nav-tags />
      <div class="flex-1 bg-gray-100 p-[16px]">
        <div class="bg-white h-full overflow-auto">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>
