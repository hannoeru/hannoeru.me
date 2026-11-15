<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <ContentHeading :id="id" :level="4" class="heading-color font-semibold mt-1.5em mb-0.5em next:mt-0">
    <slot />
  </ContentHeading>
</template>
