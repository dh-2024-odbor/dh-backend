<script lang="ts" setup>
defineProps({
  title: String,
  description: String,
});
</script>

<template>
  <div class="page-title-wrapper">
    <div class="title">
      <div class="page-title">{{ title }}</div>
      <p class="page-description">{{ description }}</p>
      <slot />
    </div>
    <div class="actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-title-wrapper {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .page-title {
    font-size: 1.6rem;
    font-weight: 700;
  }
}
</style>
