<script setup lang="ts">
const props = defineProps<{
  id: string | number
  scale?: string | number
  conversation?: string
}>()

type TwitterWidgets = {
  createTweet: (id: string, element: HTMLElement, options: { theme: 'dark' | 'light', conversation: string }) => Promise<HTMLElement | undefined>
}

declare global {
  interface Window {
    twttr?: { widgets?: TwitterWidgets }
  }
}

const colorMode = useColorMode()
const tweet = ref<HTMLElement | null>()
const loaded = ref(false)

async function create() {
  const widgets = window.twttr?.widgets
  if (!tweet.value || !widgets) return
  const tweets = Array.from(tweet.value.querySelectorAll('.twitter-tweet'))
  for (const item of tweets) {
    tweet.value.removeChild(item)
  }

  await widgets.createTweet(
    props.id.toString(),
    tweet.value,
    {
      theme: colorMode.value === 'dark' ? 'dark' : 'light',
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
  if (!loaded.value) {
    create()
  }
})

watch(() => colorMode.value, () => create())
</script>

<template>
  <AppTransform :scale="scale || 1">
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
  </AppTransform>
</template>
