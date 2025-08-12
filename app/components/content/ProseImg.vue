<template>
  <NuxtPicture
    format="webp"
    placeholder
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :img-attrs="{
      class: 'w-full h-full object-cover rounded-lg',
    }"
    loading="lazy"
  />
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
