<script setup lang="ts">
const domain = useRuntimeConfig().public.domain
const { page, layout } = useContent()

const router = useRouter()

function searchTag(tag: string) {
  router.push({
    path: '/posts',
    query: {
      tags: tag,
    },
  })
}

useHead({
  title: page.value?.title || 'Han',
  meta: [
    { property: 'og:title', content: page.value?.title || 'Han' },
    ...(page.value?.description
      ? [
          { property: 'og:description', content: page.value.description },
          { name: 'description', content: page.value.description },
        ]
      : []),
    ...(page.value?.image ? [{ property: 'og:image', content: new URL(page.value.image, domain).toString() }] : []),
    { property: 'og:type', content: 'article' },
  ],
})
</script>

<template>
  <div class="document-driven-page">
    <NuxtLayout :name="layout || 'default'">
      <div v-if="page">
        <div v-if="page.title" class="max-w-screen-md m-auto mb-8">
          <p v-if="page.date" class="opacity-50 -mt-2 mb-5">
            {{ formatDate(page.date) }}
          </p>
          <div class="flex items-center">
            <h1 class="text-4xl font-extrabold">
              {{ page.title }}
            </h1>
            <TagSelectList v-if="$route.path === '/posts'" />
          </div>
          <ShareButtons />
        </div>
        <div v-if="page.image" class="max-w-screen-lg mx-auto py-8">
          <NuxtImg
            format="webp"
            placeholder
            :src="page.image"
            class="overflow-hidden rounded-lg md:rounded-xl w-full"
            :alt="page.title"
          />
        </div>
        <div class="max-w-screen-md mx-auto">
          <ContentRenderer :value="page">
            <template #empty="{ value }">
              <DocumentDrivenEmpty :value="value" />
            </template>
          </ContentRenderer>
        </div>
        <div v-if="page.tags" class="max-w-screen-md m-auto mt-12">
          <span class="text-lg font-semibold mb-2">Tags</span>
          <div class="flex flex-wrap items-center text-light-blue-500 -mx-1">
            <TagLabel
              v-for="tag in page.tags"
              :key="tag"
              class="m-1"
              @click="searchTag(tag)"
            >
              <span>{{ tag }}</span>
            </TagLabel>
          </div>
        </div>
        <div v-if="$route.path !== '/'" class="max-w-screen-md m-auto mt-8 mb-8">
          <NuxtLink
            :to="$route.path.split('/').slice(0, -1).join('/') || '/'"
            class="font-mono no-underline opacity-50 hover:opacity-75"
          >
            cd ..
          </NuxtLink>
        </div>
      </div>
      <DocumentDrivenNotFound v-else />
    </NuxtLayout>
  </div>
</template>
