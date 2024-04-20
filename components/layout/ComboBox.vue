<script lang="ts" setup generic="T">
import type { Option } from '@/types';

defineProps<{
  modelValue: T;
  options: Option<T>[];
}>();

const emit = defineEmits(['update:modelValue']);

const selectOption = (option: Option<T>) => {
  emit('update:modelValue', option.value);
};
</script>

<template>
  <select
    class="body-medium"
    :value="modelValue"
    @change="(event) => emit('update:modelValue', (event.target as HTMLSelectElement).value)"
  >
    <option :key="i" v-for="(option, i) in options" @click="selectOption(option)" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
select {
  position: relative;
  cursor: default;
  max-width: max-content;
  user-select: none;
  margin: 4px 0 8px 0;

  background-color: var(--color-card);
  color: var(--color-on-surface-variant);
  border-radius: 8px;
  padding: 6px 10px;
  width: max-content;
  border: none;
  max-width: 100%;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.8);
  }
}
</style>
