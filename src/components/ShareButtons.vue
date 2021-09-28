<script setup lang="ts">
import { DOMAIN } from '@/constants'

const route = useRoute()

const currentPath = computed(() => `${DOMAIN}${route.path}`)

const { text, copy, copied } = useClipboard()

syncRef(currentPath, text)
</script>

<template>
  <div v-if="route.meta.frontmatter.date" class="text-xl -mx-1 flex space-x-3">
    <a
      :href="`https://www.facebook.com/sharer/sharer.php?u=${currentPath}`"
      class="!text-cool-gray-500 !dark:text-light-100 !hover:text-light-blue-500 block"
      target="_blank"
      rel="noopener"
    >
      <carbon:logo-facebook />
    </a>
    <a
      :href="`https://twitter.com/intent/tweet?url=${currentPath}`"
      class="!text-cool-gray-500 !dark:text-light-100 !hover:text-light-blue-500 block transform scale-130"
      target="_blank"
      rel="noopener"
    >
      <carbon:logo-twitter />
    </a>
    <a
      :href="`mailto:?subject=I want to share this with you &amp;body=Hi there, Check out this site ${currentPath}, Thanks.`"
      class="!text-cool-gray-500 !dark:text-light-100 !hover:text-light-blue-500 block"
      target="_blank"
      rel="noopener"
    >
      <ic:round-mail />
    </a>

    <button class="!text-cool-gray-500 !dark:text-light-100 !hover:text-light-blue-500 focus:outline-none transform scale-70" @click="copy(currentPath)">
      <carbon:link v-if="!copied" />
      <carbon:checkmark v-else />
    </button>
  </div>
</template>
