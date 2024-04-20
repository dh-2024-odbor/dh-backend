<script lang="ts" setup>
defineProps({
  title: String,
});
</script>

<template>
  <div class="category">
    <span>
      <h1><slot name="icon" />{{ title }}</h1>
      <div class="category-buttons"></div>
      <slot name="buttons" />
    </span>
    <div class="category-content">
      <div v-if="$slots.default">
        <slot />
      </div>

      <div :key="i" v-for="i in 2">
        <slot :name="`column${i}`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.category {
  border-radius: 12px;
  border: 1px solid var(--gray_light);
  padding: 20px 28px;
  max-width: 100%;
  overflow: visible;
  overflow-x: visible;
  background: var(--color-surface);
  margin-bottom: 16px;
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.05),
    0 2px 2px 0 rgba(0, 0, 0, 0.01);
}

.category span {
  display: flex;
  align-items: center;
}

.category h1 {
  display: flex;
  align-items: center;
  font-size: 22px;
  margin-bottom: 14px;
  font-weight: 600;
}

.category h1 i {
  margin-right: 12px;
  height: 26px;
  width: 26px;
}

.category-buttons {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.category-buttons button {
  margin-left: 12px;
}

.category-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;

  & > *:first-child {
    width: 100%;
  }

  & > *:empty {
    display: none;
  }
}

.category:deep(.category_flex) {
  display: flex;
  align-items: center;
}

.category:deep(.category_flex > *:first-child) {
  width: 100%;
}

.category:deep(h2) {
  font-size: 16px;
  font-weight: 600;
}

.category:deep(h2:not(:nth-child(1))) {
  margin-top: 8px;
}
</style>
