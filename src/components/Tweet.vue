<script setup lang="ts">
import { isDark } from '@/logics'

const props = defineProps<{
  id: string | number
  scale?: string | number
  conversation?: string
}>()

const tweet = ref<HTMLElement | null>()
const loaded = ref(false)

async function create() {
  if (!tweet.value) return
  const tweets = Array.from(tweet.value.querySelectorAll('.twitter-tweet'))
  for (const item of tweets)
    tweet.value.removeChild(item)

  // @ts-ignore
  await window.twttr.widgets.createTweet(
    props.id.toString(),
    tweet.value,
    {
      theme: isDark.value ? 'dark' : 'light',
      conversation: props.conversation || 'none',
    },
  )

  loaded.value = true
}

useScriptTag(
  'https://platform.twitter.com/widgets.js',
  () => {
    create()
  },
  { async: true },
)

onMounted(() => {
  // @ts-ignore
  if (!loaded.value && window?.twttr?.widgets)
    create()
})

watch(isDark, () => create())
</script>

<template>
  <Transform :scale="scale || 1">
    <div ref="tweet">
      <div
        v-if="!loaded"
        class="w-30 h-30 my-10px bg-gray-400 bg-opacity-10 rounded-lg flex opacity-50"
      >
        <div class="m-auto animate-pulse text-4xl">
          <div i-carbon:logo-twitter />
        </div>
      </div>
    </div>
  </Transform>
</template>
