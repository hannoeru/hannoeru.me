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
        interactive-surface muted hover:accent
        px-2 py-1 rounded
        text-sm group"
  >
    <span v-if="showClose" i-icon-park-outline-close-small class="muted mr-0.5 -ml-1 group-hover:text-current" />
    <slot />
  </button>
</template>
