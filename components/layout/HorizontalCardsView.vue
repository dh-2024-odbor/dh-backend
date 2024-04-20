<template>
  <div>
    <div class="horizontal-cards-view">
      <slot>
        <slot name="no-content"></slot>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.horizontal-cards-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 6px;
  margin-top: 2em;
}
</style>
