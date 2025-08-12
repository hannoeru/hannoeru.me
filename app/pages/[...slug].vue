<script setup lang="ts">
const domain = useRuntimeConfig().public.domain
const router = useRouter()
const { page } = await useContent()

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

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    message: 'The requested page does not exist.',
  })
}
</script>

<template>
  <article v-if="page" class="md:p-10 bg-white dark:bg-dark-900 p-6 md:rounded-2xl max-w-full overflow-hidden">
    <header v-if="page.title" class="mb-8">
      <p v-if="page.date" class="opacity-50 mb-2">
        {{ page.date ? formatDate(page.date) : '-' }}
      </p>
      <div class="flex items-center mb-6">
        <h1 class="text-4xl font-extrabold">
          {{ page.title }}
        </h1>
        <TagSelectList v-if="$route.path === '/posts'" />
      </div>
      <ShareButtons :page="page" />
    </header>
    <div v-if="page.image">
      <NuxtPicture
        format="webp"
        placeholder
        :src="page.image"
        :alt="page.title"
        :img-attrs="{
          class: 'overflow-hidden rounded-lg md:rounded-xl w-full',
        }"
      />
    </div>
    <ContentRenderer :value="page" />
    <div v-if="page.tags" class="mt-12">
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-mono opacity-50">Tags:</span>
        <TagLabel
          v-for="tag in page.tags"
          :key="tag"
          @click="searchTag(tag)"
        >
          <span>{{ tag }}</span>
        </TagLabel>
      </div>
    </div>
    <AppFooter />
  </article>
</template>
