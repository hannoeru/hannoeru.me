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
        bg-gray-200 hover:bg-gray-300
        dark:bg-dark-700 dark:hover:bg-dark-300
        text-gray-500
        dark:text-gray-300
        px-2 py-1 rounded
        text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 group"
  >
    <span v-if="showClose" i-icon-park-outline-close-small class="text-gray-500 mr-0.5 -ml-1 group-hover:text-current" />
    <slot />
  </button>
</template>
