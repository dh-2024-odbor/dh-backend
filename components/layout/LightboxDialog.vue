<script lang="ts" setup>
import { ref, type Ref } from 'vue';

import { useI18n } from 'vue-i18n';
import type { MessageSchema } from '@/locale';
import PrimaryButton from '../inputs/PrimaryButton.vue';

defineProps({
  title: String,
  height: String,
  width: String,
});

const { t } = useI18n<[MessageSchema]>();

const visible = ref(false);
const isMouseDownInBackground = ref(false);
const lightboxElement: Ref<HTMLElement | null> = ref(null);

const backgroundClick = () => {
  if (
    lightboxElement.value == null ||
    (!lightboxElement.value.querySelectorAll('.qlb:hover').length && isMouseDownInBackground.value)
  ) {
    hide();
  }
  isMouseDownInBackground.value = false;
};
const show = () => {
  visible.value = true;
};

const hide = () => {
  visible.value = false;
};

defineExpose({
  hide,
  show,
});
</script>

<template>
  <div
    class="lightbox-background"
    :class="{ show: visible }"
    v-on:click.self="backgroundClick"
    v-on:mousedown.self="isMouseDownInBackground = true"
    ref="lightboxElement"
  >
    <div
      class="lightbox"
      :class="{ show: visible }"
      :style="`height: ${height || 'unset'}; width: ${width || '500px'}`"
    >
      <div class="lightbox-header" style="align-items: flex-start">
        <div>
          <h1 class="title-large">{{ title }}</h1>
        </div>
      </div>
      <div class="lightbox-content">
        <slot></slot>
      </div>
      <div class="lightbox-buttons">
        <slot name="buttons" :hide="hide">
          <PrimaryButton @click="hide" :label="t('actions.ok')"></PrimaryButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lightbox-background {
  display: flex !important;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  z-index: 90;
  left: 0;
  top: 0;
  width: 100%;
  height: 0;
  background-color: rgba(0, 0, 0, 0.9);
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  transition:
    opacity 0.2s,
    height 0s,
    padding 0s;
  overflow: auto;
  opacity: 0;
  padding: 0;
}

.lightbox-background:not(.show) {
  animation-duration: 0.2s;
  animation-name: LightboxBackgroundOut;
}

.lightbox-background.show {
  opacity: 1;
  height: 100%;
  padding-top: 160px;
  padding-bottom: 60px;
  animation-duration: 0.2s;
  animation-name: LightboxBackgroundIn;
}

@keyframes LightboxBackgroundIn {
  from {
    padding-top: 200px;
  }
  to {
    padding-top: 160px;
  }
}

@keyframes LightboxBackgroundOut {
  from {
    height: 100%;
    padding: 160px 0;
  }
  to {
    height: 100%;
    padding: 200px 0;
  }
}

.lightbox {
  max-height: 0;
  padding: 0 24px;

  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: var(--color-surface);
  margin: 0;
  width: 0;
  overflow: hidden;
  opacity: 0;
  border-style: solid;
  border-width: thin;
  border-color: var(--color-surface);
  box-shadow:
    0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%),
    0 2px 4px -1px rgb(0 0 0 / 40%);
  border-radius: 12px;
  z-index: 30;

  transition:
    all 0.3s,
    max-height 0s;
  width: auto;
  max-width: calc(100% - 10px);
}

.lightbox.show {
  display: flex;
  width: initial;
  transition:
    all 0.2s,
    height 0s,
    padding 0s;
  height: auto;
  opacity: 1;
  max-height: none;
  padding: 16px 24px;

  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;

  -webkit-animation-name: LightboxIn;
  animation-name: LightboxIn;
}

.lightbox:not(.show) {
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;

  -webkit-animation-name: LightboxOut;
  animation-name: LightboxOut;
}

@-webkit-keyframes LightboxIn {
  to {
    transform: scale(1);
  }
}
@keyframes LightboxIn {
  to {
    transform: scale(1);
  }
}

@-webkit-keyframes LightboxOut {
  from {
    transform: scale(1);
    max-height: none;
  }
  to {
    max-height: none;
  }
}
@keyframes LightboxOut {
  from {
    transform: scale(1);
    max-height: none;
  }
  to {
    max-height: none;
  }
}

.lightbox-header {
  margin-bottom: 12px;
}

.lightbox-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  width: 100%;
}
</style>
