<script setup lang="ts">
defineProps<{
  showClose?: boolean
}>()
</script>

<template>
  <button
    class="
        inline-flex items-center
        bg-coolgray-200 hover:bg-gray-300
        dark:bg-dark-700 dark:hover:bg-dark-300
        text-cool-gray-500
        dark:text-cool-gray-300
        px-2 py-1 rounded
        text-sm focus:outline-none group"
  >
    <span v-if="showClose" i-icon-park-outline-close-small class="text-cool-gray-500 mr-0.5 -ml-1 group-hover:text-current" />
    <slot />
  </button>
</template>
