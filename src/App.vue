<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Han',
  meta: [
    { property: 'og:title', content: 'Han' },
    { property: 'og:image', content: 'https://hannoeru.me/avatar.png' },
    { name: 'description', content: 'Han\'s Portfolio' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: '@hannoeru' },
  ],
})
</script>

<template>
  <Header />
  <main class="pt-$header-height">
    <div class="px-7 py-16">
      <router-view />
    </div>
  </main>
  <Footer />
</template>
