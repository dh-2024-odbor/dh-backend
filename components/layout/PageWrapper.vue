<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  isNarrow: {
    type: Boolean,
    default: true,
  },
});

const slots = defineSlots<{
  default(): any;
  'side-panel'(): any;
}>();

const route = useRoute();

const isSidePanelVisible = computed(() => !!slots['side-panel']);

const shouldAdjustCenter = computed(
  () => !isSidePanelVisible.value && props.isNarrow
);
</script>

<template>
  <div class="page-layout" :class="{ narrow: isNarrow, 'adjust-center': shouldAdjustCenter }">
    <div class="page-content">
      <slot />
    </div>

    <div class="side-panel" v-if="isSidePanelVisible">
      <slot name="side-panel" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-layout {
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  gap: 32px;

  &.adjust-center {
    margin-right: var(--sub-sidebar-width);
  }

  &.narrow .page-content {
    max-width: 800px;
  }

  .page-content {
    width: 100%;
  }

  .side-panel {
    width: 100%;
    max-width: 300px;
  }
}
</style>
