<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const tags = computed(() => {
  const value = route.query.tags
  return (Array.isArray(value) ? value : [value]).filter((tag): tag is string => Boolean(tag))
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
  <div v-if="tags.length" class="inline-flex flex-wrap gap-2">
    <TagLabel
      v-for="tag in tags"
      :key="tag"
      :show-close="true"
      @click="removeTag(tag)"
    >
      {{ tag }}
    </TagLabel>
  </div>
</template>
