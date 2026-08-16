<script setup lang="ts">
import type { NuxtLinkProps } from '#app'

defineProps<{
  to?: NuxtLinkProps['to']
  title?: string
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    :title="title"
    class="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-gray-100 dark:hover:bg-dark-700"
    @click="$emit('click')"
  >
    <slot />
  </NuxtLink>
</template>
