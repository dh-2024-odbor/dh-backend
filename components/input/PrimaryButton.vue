<script lang="ts" setup>
defineProps({
  label: String,
  expandHeight: Boolean,
  disabled: Boolean,
});
</script>

<template>
  <div
    class="primary-button-wrapper clickable"
    :class="{ 'expand-height': expandHeight, 'disabled-element': disabled }"
  >
    <button class="primary-button" type="button"><slot />{{ label }}</button>
  </div>
</template>

<style lang="scss" scoped>
.primary-button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2000px;
  cursor: pointer;
  max-width: max-content;
  user-select: none;
  height: 2.5rem;

  &.expand-height {
    height: 100%;
  }

  button {
    border: none;
    border-radius: 2000px;
    background-color: var(--color-primary-container);
    color: var(--color-on-primary-container);
    font-size: 1rem;

    padding: 0 1rem;
    height: 100%;
    width: 100%;
    font-weight: 500;
    cursor: inherit;
  }

  &:hover button {
    background-color: var(--color-primary-container-hover);
  }

  &:active button {
    background-color: var(--color-primary-container-active);
  }
}
</style>
