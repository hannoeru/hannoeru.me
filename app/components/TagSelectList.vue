<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const tags = computed(() => (Array.isArray(route.query.tags) ? route.query.tags : [route.query.tags].filter(Boolean)) as string[])
function removeTag(tag: string) {
  const tagList = tags.value.filter(i => i !== tag)
  if (tagList.length) {
    router.push({
      query: {
        tags: tags.value,
      },
    })
  } else {
    router.push({
      query: {},
    })
  }
}
</script>

<template>
  <div v-if="tags.length" class="mb-6 inline-flex !mb-0 ml-4">
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
