<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <ContentHeading :id="id" :level="5">
    <slot />
  </ContentHeading>
</template>
