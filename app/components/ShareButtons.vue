<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'
import { TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from 'reka-ui'

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
    <IconLink
      :href="`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`"
      title="Share to Facebook"
    >
      <div i-carbon:logo-facebook />
    </IconLink>
    <IconLink
      :href="`https://twitter.com/intent/tweet?url=${encodedUrl}`"
      title="Share to Twitter"
      class="transform scale-130"
    >
      <div i-carbon:logo-twitter />
    </IconLink>
    <IconLink
      :href="`https://lineit.line.me/share/ui?url=${encodedUrl}`"
      title="Share to Line"
    >
      <div i-uil:line />
    </IconLink>
    <IconLink
      :href="mailtoUrl"
      title="Share via Email"
    >
      <div i-ic:round-mail />
    </IconLink>
    <TooltipRoot>
      <TooltipTrigger as-child>
        <button
          type="button"
          class="icon-link focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transform scale-70"
          :aria-label="copied ? 'Copied link' : 'Copy link'"
          @click="copy()"
        >
          <div v-if="!copied" i-carbon:link />
          <div v-else i-carbon:checkmark />
        </button>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          side="top"
          :side-offset="6"
          class="z-50 rounded bg-dark-900 px-2 py-1 text-xs text-white shadow dark:bg-white dark:text-dark-900"
        >
          {{ copied ? 'Copied' : 'Copy link' }}
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </div>
</template>
