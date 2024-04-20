<script lang="ts" setup>
defineProps({
  title: String,
  description: String,
});
</script>

<template>
  <div class="horizontal-card">
    <div class="card-image">
      <slot name="image"></slot>
    </div>
    <div class="card-content">
      <slot name="content">
        <slot name="title">
          <h3 class="title">{{ title }}</h3>
        </slot>
        <slot name="description">
          <p class="description">{{ description }}</p>
        </slot>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.horizontal-card {
  background-color: var(--color-surface);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 20px;
  cursor: pointer;
  position: relative;

  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.05),
    0 2px 2px 0 rgba(0, 0, 0, 0.01);

  .card-image {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 16px 0 4px;

    :deep(svg) {
      width: 36px;
      height: 36px;
    }
  }

  .description {
    color: var(--color-outline);
  }

  &:hover {
    background-color: var(--color-surface-hover);
  }

  &:active {
    background-color: var(--color-surface-active);
  }

  h3 {
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
