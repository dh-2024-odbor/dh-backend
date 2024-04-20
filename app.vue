<script lang="ts" setup>
useHead({
  title: 'DH 2024 - Admin Panel',
  htmlAttrs: {
    lang: 'en',
    // @ts-ignore
    'color-scheme': 'dark'
  },
})
</script>

<template>
  <div class="sidebar-and-content-wrapper">
    <LayoutMainSidebar />
    <RouterView />
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/main.scss';


.sidebar-and-content-wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-left: var(--main-sidebar-width);
}
</style>