<script setup lang="ts">
import { matchesPost } from '~/utils/search'

const emit = defineEmits<{ select: [path: string] }>()
const query = shallowRef('')

function selectResult(event: MouseEvent, path: string) {
  if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey) {
    event.preventDefault()
    emit('select', path)
  }
}
const { data: posts, status, error, refresh } = useAsyncData('search-posts', () => queryCollection('content')
  .where('type', '=', 'post')
  .order('date', 'DESC')
  .select('path', 'title', 'description', 'tags', 'date')
  .all(), { server: false })

const results = computed(() => {
  const matches = posts.value?.filter(post => matchesPost(post, query.value)) ?? []
  return query.value.trim() ? matches : matches.slice(0, 8)
})
</script>

<template>
  <div class="post-search">
    <label for="post-search" class="sr-only">Search posts</label>
    <input
      id="post-search"
      v-model="query"
      type="search"
      placeholder="Search posts…"
      autocomplete="off"
      spellcheck="false"
    >
    <p role="status" class="search-status">
      <template v-if="status === 'pending'">
        Loading posts…
      </template>
      <template v-else-if="error">
        Posts could not load.
      </template>
      <template v-else-if="!results.length">
        No posts found. Try another title or tag.
      </template>
      <template v-else-if="!query.trim()">
        Recent posts
      </template>
      <template v-else>
        {{ results.length }} {{ results.length === 1 ? 'result' : 'results' }}
      </template>
    </p>
    <button
      v-if="error"
      type="button"
      class="text-link"
      @click="refresh()"
    >
      Try again
    </button>
    <ul class="search-results">
      <li v-for="post in results" :key="post.path">
        <NuxtLink :to="post.path" @click="event => selectResult(event, post.path)">
          <span>{{ post.title }}</span>
          <time v-if="post.date" :datetime="new Date(post.date).toISOString()">{{ formatDate(post.date) }}</time>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
