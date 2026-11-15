<script setup lang="ts">
const props = defineProps<{
  post: {
    path: string
    title?: string
    description?: string
    image?: string
    date?: Date | string
    lang?: string
  }
}>()

function comparable(text: string) {
  return text.normalize('NFKC').toLowerCase().replace(/\s+/g, '')
}

const description = computed(() => {
  const { title = '', description } = props.post
  if (!description || comparable(title).includes(comparable(description)))
    return undefined
  return description
})
</script>

<template>
  <NuxtLink :to="post.path" class="post-row group">
    <NuxtPicture
      v-if="post.image"
      :src="post.image"
      format="webp"
      alt=""
      width="112"
      height="72"
      sizes="80px sm:112px"
      loading="lazy"
      class="post-thumbnail"
    />
    <div class="post-row-content">
      <div class="post-row-heading">
        <span class="post-row-title" :lang="post.lang">{{ post.title }}</span>
        <time v-if="post.date" class="post-time" :datetime="new Date(post.date).toISOString()">{{ formatDate(post.date) }}</time>
      </div>
      <p v-if="description" class="post-description" :lang="post.lang">
        {{ description }}
      </p>
    </div>
  </NuxtLink>
</template>
