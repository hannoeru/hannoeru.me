<script setup lang="ts">
const props = defineProps<{
  scale?: number | string
  origin?: string
}>()
const style = computed(() => {
  const transforms = []
  if (props.scale != null)
    transforms.push(`scale(${props.scale || 1})`)
  return {
    'transform': transforms.join(' '),
    'transform-origin': props.origin || 'top left',
  }
})
</script>

<template>
  <div :style="style">
    <slot />
  </div>
</template>
