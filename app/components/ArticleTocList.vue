<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

defineProps<{
  links: TocLink[]
  activeId?: string
}>()
</script>

<template>
  <ul class="list-none p-0 m-0">
    <li v-for="link in links" :key="link.id">
      <a
        :href="`#${link.id}`"
        :aria-current="link.id === activeId ? 'location' : undefined"
        :class="link.depth > 2 ? 'pl-6' : 'pl-3'"
        class="block py-[.3rem] border-l line-color muted hover:text-heading-light dark:hover:text-heading-dark [&[aria-current]]:accent [&[aria-current]]:border-accent-light dark:[&[aria-current]]:border-accent-dark"
      >
        {{ link.text }}
      </a>
      <ArticleTocList
        v-if="link.children?.length"
        :links="link.children"
        :active-id="activeId"
      />
    </li>
  </ul>
</template>
