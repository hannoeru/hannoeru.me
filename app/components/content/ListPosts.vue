<script setup lang="ts">
const props = defineProps<{
  limit?: number
}>()

const route = useRoute()

const selectedTags = computed(() => {
  if (props.limit)
    return []
  const tags = route.query.tags
  return (Array.isArray(tags) ? tags : [tags]).filter((tag): tag is string => Boolean(tag))
})

const { data: posts } = await useAsyncData(props.limit ? `posts-${props.limit}` : 'posts', () => {
  const query = queryCollection('content')
    .where('type', '=', 'post')
    .order('date', 'DESC')
    .select('path', 'title', 'description', 'image', 'date', 'tags', 'lang')
  return props.limit ? query.limit(props.limit).all() : query.all()
})

const filteredPosts = computed(() => {
  if (!selectedTags.value.length)
    return posts.value ?? []

  return posts.value?.filter(post => selectedTags.value.every(tag => post.tags?.includes(tag))) ?? []
})

const postGroups = computed(() => {
  const groups = new Map<string, typeof filteredPosts.value>()
  for (const post of filteredPosts.value) {
    const year = post.date ? String(new Date(post.date).getFullYear()) : 'Undated'
    const group = groups.get(year) ?? []
    group.push(post)
    groups.set(year, group)
  }
  return Array.from(groups, ([year, entries]) => ({ year, entries }))
})

function countLabel(count: number) {
  return `${count} ${count === 1 ? 'post' : 'posts'}`
}

const status = computed(() => {
  const total = posts.value?.length ?? 0
  if (!selectedTags.value.length)
    return countLabel(total)
  return `${filteredPosts.value.length} of ${countLabel(total)} tagged ${selectedTags.value.join(' + ')}`
})
</script>

<template>
  <ul v-if="limit" class="post-list">
    <li v-for="post in filteredPosts" :key="post.path">
      <PostRow :post="post" />
    </li>
  </ul>
  <div v-else class="post-archive">
    <p class="archive-status" role="status">
      {{ status }}
    </p>
    <section
      v-for="group in postGroups"
      :key="group.year"
      :aria-labelledby="`posts-${group.year}`"
      class="post-year"
    >
      <h2 :id="`posts-${group.year}`" class="section-heading section-label">
        <span>{{ group.year }}</span>
        <span class="muted">{{ countLabel(group.entries.length) }}</span>
      </h2>
      <ul class="post-list">
        <li v-for="post in group.entries" :key="post.path">
          <PostRow :post="post" />
        </li>
      </ul>
    </section>
    <p v-if="!filteredPosts.length" class="muted">
      No posts match these tags.
      <NuxtLink to="/posts" class="prose-link">
        Show all posts
      </NuxtLink>
    </p>
  </div>
</template>
