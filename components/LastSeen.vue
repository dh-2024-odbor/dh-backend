<script lang="ts" setup>
import { defineProps } from 'vue';
import type { NodeDetails } from '~/types/telemetry';

defineProps<{
  timestamp: string;
}>();

</script>

<template>
  <div>
    <div class="last-seen">
      <p style="color: var(--color-primary)" v-if="timeBetween(new Date(timestamp)) < 60 * 1000">• Online</p>
      <p style="color: var(--color-error)" v-else>• Last seen: {{ getRelativeTimeString(new Date(timestamp)) }}</p>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.last-seen {
  margin-right: 1rem;
}
</style>