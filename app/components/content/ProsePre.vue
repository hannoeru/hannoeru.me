<template>
  <div class="border border-gray-2 dark:border-dark-3 rounded-lg p-3 overflow-auto">
    <div v-if="filename" class="flex">
      <span class="block text-xs text-gray-400 dark:text-gray-500 mb-2">
        {{ filename }}
      </span>
    </div>
    <pre :class="$props.class"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})
</script>

<style>
pre code .line {
  display: block;
}
</style>
