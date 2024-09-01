<script lang="ts">
import { defineComponent } from '#imports'

export default defineComponent({
  props: {
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
  },
})
</script>

<template>
  <div class="bg-$c-code-bg rounded overflow-hidden">
    <div v-if="filename" class="flex">
      <span class="py-1 px-2 block text-xs text-coolgray-700 dark:text-coolgray-400 bg-coolgray-200 dark:bg-dark-300 rounded-br">
        {{ filename }}
      </span>
    </div>
    <slot />
  </div>
</template>

<style>
pre {
  padding: 1rem;
  background: var(--c-code-bg);
  overflow: auto;
  border-radius: .5rem;
}
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
