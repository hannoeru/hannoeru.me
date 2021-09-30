<script setup lang='ts'>
import { isClient } from '@vueuse/core'
import { formatDate } from '@/logics'
import { DOMAIN } from '@/constants'

import type { HeadObject, HeadAttrs } from '@vueuse/head'

const route = useRoute()
const router = useRouter()
const props = defineProps<{ frontmatter: any }>()

const frontmatter = computed(() => props.frontmatter)

if (isClient) {
  onMounted(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const href = anchor.getAttribute('href') as string
        router.push(href)
      })
    })
  })
}

useHead(computed<HeadObject>(() => {
  const head = frontmatter.value

  const meta = [
    head.title ? { property: 'og:title', content: head.title } : null,
    ...(head.description
      ? [
        { property: 'og:description', content: head.description },
        { name: 'description', content: head.description },
      ]
      : []),
    head.image ? { property: 'og:image', content: DOMAIN + head.image } : null,
    { property: 'og:type', content: 'article' },
  ].filter(Boolean) as HeadAttrs[]

  return {
    title: head.title,
    meta,
    htmlAttrs: {
      lang: head.lang || 'en',
    },
  }
}))
</script>

<template>
  <div v-if="frontmatter.title" class="prose m-auto mb-8">
    <p v-if="frontmatter.date" class="opacity-50 !-mt-2">
      {{ formatDate(frontmatter.date) }}
    </p>
    <h1 class="mb-0">
      {{ frontmatter.title }}
    </h1>
    <ShareButtons />
  </div>
  <div v-if="frontmatter.image" class="max-w-screen-lg mx-auto py-8">
    <img v-lazy="frontmatter.image" class="overflow-hidden rounded-xl w-full" :alt="frontmatter.title">
  </div>
  <div :class="{ 'prose mx-auto': frontmatter.prose !== false }">
    <slot />
  </div>
  <div v-if="frontmatter.tags" class="prose m-auto mt-12">
    <span class="text-lg font-semibold mr-2">Tags:</span>
    <div class="flex flex-wrap items-center text-light-blue-500">
      <div v-for="(tag, index) in frontmatter.tags" :key="tag">
        <span>{{ tag }}</span>
        <span v-if="index !== frontmatter.tags.length - 1" class="pr-2">,</span>
      </div>
    </div>
  </div>
  <div v-if="route.path !== '/'" class="prose m-auto mt-8 mb-8">
    <router-link
      :to="route.path.split('/').slice(0, -1).join('/') || '/'"
      class="font-mono no-underline opacity-50 hover:opacity-75"
    >
      cd ..
    </router-link>
  </div>
</template>
