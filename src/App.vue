<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Han',
  meta: [
    { property: 'og:title', content: 'Han' },
    { property: 'og:image', content: 'https://hannoeru.me/avatar.png' },
    { property: 'og:type', content: 'website' },
    { name: 'description', content: 'Han\'s Portfolio' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@hannoeru' },
  ],
  htmlAttrs: {
    prefix: 'og: http://ogp.me/ns#',
  },
})
</script>

<template>
  <Header />
  <main class="pt-$header-height">
    <div class="px-6 py-10 md:py-16">
      <router-view />
    </div>
  </main>
  <Footer />
</template>
