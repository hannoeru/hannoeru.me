<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <ContentHeading :id="id" :level="2" class="heading-color text-2xl font-bold mt-2em mb-1em next:mt-0">
    <slot />
  </ContentHeading>
</template>
