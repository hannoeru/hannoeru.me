<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <ContentHeading :id="id" :level="3" class="heading-color text-xl font-semibold mt-1.6em mb-0.6em next:mt-0">
    <slot />
  </ContentHeading>
</template>
