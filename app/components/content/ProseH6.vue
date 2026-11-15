<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <ContentHeading :id="id" :level="6">
    <slot />
  </ContentHeading>
</template>
