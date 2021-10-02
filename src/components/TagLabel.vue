<script setup lang="ts">
defineProps<{
  showClose?: boolean
}>()
</script>

<template>
  <button
    class="
        inline-flex items-center
        bg-dark-700 hover:bg-dark-500
        text-cool-gray-300
        px-2 py-1 rounded
        text-sm focus:outline-none group"
  >
    <icon-park-outline:close-small v-if="showClose" class="text-cool-gray-500 mr-0.5 -ml-1 group-hover:text-current" />
    <slot />
  </button>
</template>
