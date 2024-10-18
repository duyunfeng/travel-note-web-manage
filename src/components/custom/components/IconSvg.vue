<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup lang="ts">
import { computed, defineProps } from 'vue';
const props = defineProps({
  name: {
    type: String,
    default: ''
  }
});
const iconName = computed(() => {
  return `#icon-${props.name}`;
});
</script>
<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.icon:hover,
.icon:active {
  cursor: pointer;
}
</style>
