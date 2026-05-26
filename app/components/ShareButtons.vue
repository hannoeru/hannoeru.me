<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'

defineProps<{
  page: ContentCollectionItem
}>()

const route = useRoute()
const domain = useRuntimeConfig().public.domain

const canonicalUrl = computed(() => new URL(route.path, domain).toString())
const encodedUrl = computed(() => encodeURIComponent(canonicalUrl.value))
const mailtoUrl = computed(() => `mailto:?${new URLSearchParams({
  subject: 'I want to share this with you',
  body: `Hi there, Check out this site ${canonicalUrl.value}, Thanks.`,
})}`)

const { copy, copied } = useClipboard({
  read: false,
  source: canonicalUrl,
})
</script>

<template>
  <div v-if="page.type === 'post'" class="text-xl flex space-x-3">
    <a
      :href="`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`"
      class="icon-link"
      target="_blank"
      rel="noopener"
      title="Share to Facebook"
    >
      <div i-carbon:logo-facebook />
    </a>
    <a
      :href="`https://twitter.com/intent/tweet?url=${encodedUrl}`"
      class="icon-link transform scale-130"
      target="_blank"
      rel="noopener"
      title="Share to Twitter"
    >
      <div i-carbon:logo-twitter />
    </a>
    <a
      :href="`https://lineit.line.me/share/ui?url=${encodedUrl}`"
      class="icon-link"
      target="_blank"
      rel="noopener"
      title="Share to Line"
    >
      <div i-uil:line />
    </a>
    <a
      :href="mailtoUrl"
      class="icon-link"
      target="_blank"
      rel="noopener"
      title="Share via Email"
    >
      <div i-ic:round-mail />
    </a>
    <button
      class="icon-link focus:outline-none transform scale-70"
      title="Copy link"
      @click="copy()"
    >
      <div v-if="!copied" i-carbon:link />
      <div v-else i-carbon:checkmark />
    </button>
  </div>
</template>
