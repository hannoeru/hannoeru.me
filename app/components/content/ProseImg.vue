<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    class="w-full my-2em rounded-lg md:rounded-xl"
    loading="lazy"
  >
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
})
</script>
