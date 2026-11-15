<script setup lang="ts">
const props = defineProps<{
  path: string
}>()

const { data: posts } = await useAsyncData('post-surround', () => queryCollection('content')
  .where('type', '=', 'post')
  .order('date', 'DESC')
  .select('path', 'title')
  .all())

const neighbors = computed(() => {
  const list = posts.value ?? []
  const index = list.findIndex(post => post.path === props.path)
  if (index === -1)
    return []
  const entries = [
    { rel: 'prev', label: 'Older', post: list[index + 1] },
    { rel: 'next', label: 'Newer', post: list[index - 1] },
  ] as const
  return entries.flatMap(({ post, ...entry }) => post ? [{ ...entry, post }] : [])
})
</script>

<template>
  <nav v-if="neighbors.length" aria-label="More posts" class="grid gap-3 mt-10 sm:grid-cols-2">
    <NuxtLink
      v-for="{ rel, label, post } in neighbors"
      :key="rel"
      :to="post.path"
      :rel="rel"
      class="group flex flex-col gap-1 py-3 px-4 border line-color rounded-lg leading-[1.5] hover:interactive-surface"
      :class="rel === 'next' && 'sm:col-start-2 sm:text-right'"
    >
      <span class="font-mono text-[.75rem] muted">
        <span v-if="rel === 'prev'" aria-hidden="true">← </span>{{ label }}<span v-if="rel === 'next'" aria-hidden="true"> →</span>
      </span>
      <span class="heading-color text-[.9375rem] transition-colors duration-150 group-hover:text-accent-light dark:group-hover:text-accent-dark">{{ post.title }}</span>
    </NuxtLink>
  </nav>
</template>
