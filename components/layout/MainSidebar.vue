<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { computed, watch } from 'vue';

import { useRoute, type RouteMeta } from 'vue-router';
import type { SidebarItemMeta } from '~/types/sidebar';


const route = useRoute();

const currentMainRoute = computed(() => {
  return route.matched[0] as any | undefined;
});

const pages: SidebarItemMeta[] = [{
  icon: 'fluent:home-20-regular',
  activeIcon: 'fluent:home-20-filled',
  labelKey: 'home',
  path: '/home',
}];

watch([currentMainRoute], () => {
  document.querySelector('#app')?.classList.add('page-fade-in');
  setTimeout(() => {
    document.querySelector('#app')?.classList.remove('page-fade-in');
  }, 200);
});
</script>

<template>
  <div class="sidebar-wrapper" v-if="currentMainRoute?.meta?.mainSidebarType">
    <div class="main-sidebar">
      <div class="branding-item-wrapper">
        <NuxtLink to="/home" class="branding-item">
          Logo
        </NuxtLink>
      </div>

      <NuxtLink
        :key="i"
        v-for="(e, i) in pages"
        :to="e.path"
        class="main-sidebar-item"
        :class="{ 'current-main-route': e.path === currentMainRoute.name }"
      >
        <Icon v-show="e.path === currentMainRoute.name && e.activeIcon" :icon="e.activeIcon!" />
        <Icon v-show="!(e.path === currentMainRoute.name && e.activeIcon)" :icon="e.icon!" />
        <span>{{ e.labelKey! }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/base.scss';

.sidebar-wrapper {
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100vh;
  max-height: 100vh;
  z-index: 20;
  position: fixed;
  left: 0;
  user-select: none;
}

.main-sidebar {
  min-width: var(--main-sidebar-width);
  max-width: var(--main-sidebar-width);
  z-index: 20;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 100vh;
  max-height: 100vh;

  .branding-item-wrapper {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;

    a.branding-item {
      color: var(--color-logo);
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        --size: 3rem;
        width: var(--size);
        height: var(--size);
      }
    }
  }

  a.main-sidebar-item {
    --sidebar-item-margin: 6px;
    --sidebar-item-width: calc(var(--main-sidebar-width) - 2 * var(--sidebar-item-margin));

    width: var(--sidebar-item-width);
    height: var(--sidebar-item-width);
    margin: var(--sidebar-item-margin);
    padding: 10px 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 16px;

    color: var(--color-inverse-surface);

    transition: all 0.2s ease-in-out;

    &:hover {
      box-shadow: 0 0 0 1px var(--color-outline-variant);
    }

    &:active {
      transition-duration: 0.1s;
      scale: 0.96;
    }

    &.current-main-route {
      background-color: var(--color-primary-container);
      color: var(--color-on-primary-container);
    }

    span {
      font-size: 10px;
      font-weight: 600;
      text-overflow: clip;
      overflow: hidden;
      max-width: 100%;
      white-space: nowrap;
    }
  }
}

</style>