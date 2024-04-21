<script lang="ts" setup>
defineProps({
  to: String,
})
</script>

<template>
  <div class="back-button-wrapper ">
    <NuxtLink :to="to!" class="back-button">
      <Icon icon="fluent:arrow-left-24-filled" /> Back
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.back-button-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;

}

.back-button {
  background: transparent;
  border: none;
  border-radius: 12px;
  padding: 0.65em 0em;
  display: flex;
  justify-self: start;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
  opacity: 0.7;
  margin-bottom: 0.5rem;
  font-size: 1em;
  cursor: pointer;
  color: var(--on-surface);

  transition: 0.1s ease-in-out;

  &:hover {
    opacity: 1;
    margin-left: -0.2rem;
    gap: 0.6rem;
  }

  &:active {
    scale: 0.95;
    transition: 50ms ease-in-out;
  }
}

</style>