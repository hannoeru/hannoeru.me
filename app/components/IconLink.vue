<script setup lang="ts">
const props = defineProps<{
  href: string
  title?: string
  newTab?: boolean
}>()

const isNewTab = computed(() => props.newTab ?? props.href.startsWith('http'))
</script>

<template>
  <a :href="$props.href" :target="isNewTab ? '_blank' : undefined" :rel="isNewTab ? 'noopener' : undefined" :title="$props.title" class="flex items-center justify-center p-1">
    <slot />
  </a>
</template>
