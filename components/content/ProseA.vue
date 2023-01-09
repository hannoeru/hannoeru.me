<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: '',
  },
  blank: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <a v-if="href.startsWith('https://')" :href="href" target="_blank" rel="noopener noreferrer" class="text-sky-500 dark:text-sky-400 font-medium hover:underline">
    <slot />
  </a>
  <NuxtLink v-else :href="href" class="text-sky-500 dark:text-sky-400 font-medium hover:underline">
    <slot />
  </NuxtLink>
</template>
