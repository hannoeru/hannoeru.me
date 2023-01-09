<script setup lang="ts">
import { toArray } from '@antfu/utils'
import { QueryBuilderParams } from '@nuxt/content-edge/dist/runtime/types'

const route = useRoute()

const query = ref<QueryBuilderParams>({
  path: '/posts',
  without: ['excerpt', 'body'],
  sort: [{ _file: -1, $numeric: true }],
})

watch(
  () => route.query,
  () => {
    if (route.query.tags) {
      query.value.where = {
        // @ts-expect-error
        type: 'post',
        tags: {
          $in: toArray(route.query.tags),
        },
      }
    } else {
      query.value.where = {
        // @ts-expect-error
        type: 'post',
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="max-w-screen-md mx-auto">
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <ContentList
        v-slot="{ list }"
        :query="query"
      >
        <li
          v-for="post in list"
          :key="post._path"
          class="before:hidden !pl-0"
        >
          <NuxtLink
            class="
            block w-full h-full
            bg-white dark:bg-dark-900
            rounded-md
            overflow-hidden
            flex flex-col
            group"
            :to="post._path"
          >
            <div v-if="post.image" class="relative w-full h-50 overflow-hidden">
              <img :src="post.image" :alt="post.title" class="absolute w-full h-full rounded-t-md object-cover transition duration-500 transform filter group-hover:(scale-105 brightness-75)" loading="lazy">
            </div>
            <div class="px-8 py-6 flex flex-col justify-between flex-grow">
              <div>
                <div v-if="post.categories?.length" class="text-sm mb-2 text-cool-gray-500 font-bold">
                  {{ post.categories[0] }}
                </div>
                <div class="text-xl font-semibold">
                  {{ post.title }}
                </div>
              </div>
              <div class="opacity-50 text-sm mt-4">
                {{ formatDate(post.date) }}
              </div>
            </div>
          </NuxtLink>
        </li>
      </ContentList>
    </ul>
  </div>
</template>
