<script setup lang='ts'>
import { isClient } from '@vueuse/core'
import { formatDate } from '@/logics'
import { DOMAIN } from '@/constants'

import type { HeadAttrs, HeadObject } from '@vueuse/head'

const route = useRoute()
const router = useRouter()
const props = defineProps<{ frontmatter: any }>()

const frontmatter = computed(() => props.frontmatter)
const isPostList = computed(() => route.path === '/posts')

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

function searchTag(tag: string) {
  router.push({
    path: '/posts',
    query: {
      tags: tag,
    },
  })
}
</script>

<template>
  <div :class="{ 'post-list': isPostList }">
    <div v-if="frontmatter.title" class="max-w-$md-max-width m-auto mb-8">
      <p v-if="frontmatter.date" class="opacity-50 -mt-2 mb-5">
        {{ formatDate(frontmatter.date) }}
      </p>
      <div class="flex items-center">
        <h1 class="text-4xl font-extrabold">
          {{ frontmatter.title }}
        </h1>
        <TagSelectList v-if="route.path === '/posts'" />
      </div>
      <ShareButtons />
    </div>
    <div v-if="frontmatter.image" class="max-w-screen-lg mx-auto py-8">
      <img v-lazy="frontmatter.image" class="overflow-hidden rounded-lg md:rounded-xl w-full" :alt="frontmatter.title">
    </div>
    <div :class="{ 'max-w-$md-max-width mx-auto': frontmatter.prose !== false }">
      <slot />
    </div>
    <div v-if="frontmatter.tags" class="max-w-$md-max-width m-auto mt-12">
      <span class="text-lg font-semibold mr-2">Tags:</span>
      <div class="flex flex-wrap items-center text-light-blue-500 -mx-1">
        <TagLabel v-for="tag in frontmatter.tags" :key="tag" class="m-1" @click="searchTag(tag)">
          <span>{{ tag }}</span>
        </TagLabel>
      </div>
    </div>
    <div v-if="route.path !== '/'" class="max-w-$md-max-width m-auto mt-8 mb-8">
      <router-link
        :to="route.path.split('/').slice(0, -1).join('/') || '/'"
        class="font-mono no-underline opacity-50 hover:opacity-75"
      >
        cd ..
      </router-link>
    </div>
  </div>
</template>
