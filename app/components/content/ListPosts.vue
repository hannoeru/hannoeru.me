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

const postGroups = computed(() => {
  const groups = new Map<string, NonNullable<typeof posts.value>>()
  for (const post of filteredPosts.value ?? []) {
    const year = post.date ? String(new Date(post.date).getFullYear()) : 'Undated'
    const group = groups.get(year) ?? []
    group.push(post)
    groups.set(year, group)
  }
  return Array.from(groups, ([year, entries]) => ({ year, entries }))
})
</script>

<template>
  <div class="post-archive">
    <section
      v-for="group in postGroups"
      :key="group.year"
      :aria-label="`Posts from ${group.year}`"
      class="post-year"
    >
      <h2>{{ group.year }}</h2>
      <ul>
        <li v-for="post in group.entries" :key="post.path">
          <NuxtLink :to="post.path" class="post-row">
            <span class="post-row-title">{{ post.title }}</span>
            <time v-if="post.date" :datetime="new Date(post.date).toISOString()">{{ formatDate(post.date) }}</time>
          </NuxtLink>
          <p v-if="post.description" class="post-description">
            {{ post.description }}
          </p>
        </li>
      </ul>
    </section>
    <p v-if="!filteredPosts?.length" class="muted">
      No posts match these tags. Remove a tag to see more posts.
    </p>
  </div>
</template>
