<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const tags = computed(() => {
  const value = route.query.tags
  return (Array.isArray(value) ? value : [value]).filter((tag): tag is string => Boolean(tag))
})
const clearQuery = computed(() => {
  const { tags: _, ...query } = route.query
  return query
})
function removeTag(tag: string) {
  const tagList = tags.value.filter(i => i !== tag)
  const query = { ...route.query }

  if (tagList.length)
    query.tags = tagList
  else
    delete query.tags

  router.push({ query })
}
</script>

<template>
  <div v-if="tags.length" class="tag-filter">
    <span class="muted">Filtered by</span>
    <TagLabel
      v-for="tag in tags"
      :key="tag"
      :show-close="true"
      :aria-label="`Remove tag filter ${tag}`"
      @click="removeTag(tag)"
    >
      {{ tag }}
    </TagLabel>
    <NuxtLink v-if="tags.length > 1" :to="{ query: clearQuery }" class="section-link">
      Clear all
    </NuxtLink>
  </div>
</template>
