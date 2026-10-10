<script setup lang="ts">
defineProps<{
  showClose?: boolean
}>()
</script>

<template>
  <button
    type="button"
    class="
        inline-flex items-center
        bg-[var(--c-hover)] text-[var(--c-muted)] hover:text-[var(--c-accent)]
        px-2 py-1 rounded
        text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] group"
  >
    <span v-if="showClose" i-icon-park-outline-close-small class="text-gray-500 mr-0.5 -ml-1 group-hover:text-current" />
    <slot />
  </button>
</template>
