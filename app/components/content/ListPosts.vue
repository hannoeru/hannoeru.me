<script setup lang="ts">
import { toArray } from '@antfu/utils'

const route = useRoute()

const { data: posts } = await useAsyncData('posts', async () => {
  if (route.query.tags) {
    return queryCollection('content')
      .where('type', '=', 'post')
      .where('tags', '=', toArray(route.query.tags))
      .order('date', 'DESC')
      .select('path', 'title', 'description', 'image', 'categories', 'date')
      .all()
  }
  else {
    return queryCollection('content')
      .where('type', '=', 'post')
      .order('date', 'DESC')
      .select('path', 'title', 'description', 'image', 'categories', 'date')
      .all()
  }
})
</script>

<template>
  <ul class="grid grid-cols-1 md:grid-cols-2 gap-10">
    <li
      v-for="post in posts"
      :key="post.path"
      class="before:hidden !pl-0"
    >
      <NuxtLink
        class="
            block w-full h-full
            bg-light-3 dark:bg-dark-800
            rounded-md
            overflow-hidden
            flex flex-col
            group"
        :to="post.path"
      >
        <div v-if="post.image" class="relative w-full h-50 overflow-hidden">
          <NuxtImg
            format="webp"
            placeholder
            :src="post.image"
            :alt="post.title"
            class="absolute w-full h-full rounded-t-md object-cover transition duration-500 transform filter group-hover:(scale-105 brightness-75)"
            loading="lazy"
          />
        </div>
        <div class="p-6 flex flex-col justify-between flex-grow">
          <div>
            <div v-if="post.categories?.length" class="text-sm mb-2 text-cool-gray-500 font-bold">
              {{ post.categories[0] }}
            </div>
            <div class="text-xl font-semibold">
              {{ post.title }}
            </div>
          </div>
          <div class="opacity-50 text-sm mt-4">
            {{ post.date ? formatDate(post.date) : '-' }}
          </div>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
