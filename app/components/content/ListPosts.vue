<script setup lang="ts">
const route = useRoute()

const selectedTags = computed(() => {
  const tags = route.query.tags
  return (Array.isArray(tags) ? tags : [tags]).filter((tag): tag is string => Boolean(tag))
})

const { data: posts } = await useAsyncData('posts', () => queryCollection('content')
  .where('type', '=', 'post')
  .order('date', 'DESC')
  .select('path', 'title', 'description', 'image', 'categories', 'date', 'tags')
  .all())

const filteredPosts = computed(() => {
  if (!selectedTags.value.length)
    return posts.value

  return posts.value?.filter(post => selectedTags.value.every(tag => post.tags?.includes(tag)))
})
</script>

<template>
  <ul class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
    <li
      v-for="post in filteredPosts"
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
          <NuxtPicture
            format="webp"
            :src="post.image"
            alt=""
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
            <p v-if="post.description" class="mt-3 text-sm leading-6 opacity-70 line-clamp-3">
              {{ post.description }}
            </p>
          </div>
          <div class="opacity-50 text-sm mt-4">
            {{ post.date ? formatDate(post.date) : '-' }}
          </div>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
