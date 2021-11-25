<script setup lang="ts">
import { useRouter } from 'vue-router'
import { formatDate } from '@/logics'

const router = useRouter()
const route = useRoute()
const postRoutes = router.getRoutes()
  .filter(i =>
    i.path.startsWith('/posts') && i.meta.frontmatter.date && !i.path.endsWith('.html'),
  )
  .sort((a, b) =>
    +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date),
  )
const posts = computed(() => {
  if (route.query.tags) {
    const tags = Array.isArray(route.query.tags) ? route.query.tags : [route.query.tags]
    return postRoutes
      .filter(i =>
        (i.meta.frontmatter.tags as string[])
          .map(tag => tag.toLowerCase())
          .includes(tags[0]?.toLowerCase() as string),
      )
  }
  return postRoutes
})

onMounted(() => document.body.style.setProperty('--md-max-width', '768px'))
onUnmounted(() => {
  setTimeout(() => {
    document.body.style.removeProperty('--md-max-width')
  }, 300)
})

</script>

<template>
  <div class="max-w-screen-md mx-auto">
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <li
        v-for="post in posts"
        :key="post.path"
        class="before:hidden !pl-0"
      >
        <router-link
          class="
            block w-full h-full
            bg-white dark:bg-dark-900
            rounded-md
            overflow-hidden
            flex flex-col
            group"
          :to="post.path"
        >
          <div class="relative w-full h-50 overflow-hidden">
            <img v-lazy="post.meta.frontmatter.image" alt="" class="absolute w-full h-full rounded-t-md object-cover transition duration-500 transform filter group-hover:(scale-105 brightness-75)">
          </div>
          <div class="px-8 py-6 flex flex-col justify-between flex-grow">
            <div>
              <div v-if="post.meta.frontmatter.categories?.length" class="text-sm mb-2 text-cool-gray-500 font-bold">
                {{ post.meta.frontmatter.categories[0] }}
              </div>
              <div class="text-xl font-semibold">
                {{ post.meta.frontmatter.title }}
              </div>
            </div>
            <div class="opacity-50 text-sm mt-4">
              {{ formatDate(post.meta.frontmatter.date) }}
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
