<script setup lang="ts">
import dayjs from 'dayjs'

const year = dayjs().get('year')
</script>

<template>
  <footer class="site-footer">
    <div class="footer-links">
      <NuxtLink v-if="$route.path !== '/'" :to="$route.path.split('/').slice(0, -1).join('/') || '/'" class="font-mono">cd ..</NuxtLink>
      <a href="https://github.com/hannoeru" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://x.com/hannoeru" target="_blank" rel="noopener noreferrer">X</a>
      <a href="/feed.xml">RSS</a>
    </div>
    <p><a target="_blank" rel="noopener noreferrer" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> · {{ year }} © hannoeru</p>
  </footer>
</template>
