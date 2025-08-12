<script setup lang="ts">
import dayjs from 'dayjs'

const year = dayjs().get('year')
</script>

<template>
  <footer>
    <NuxtLink
      v-if="$route.path !== '/'"
      :to="$route.path.split('/').slice(0, -1).join('/') || '/'"
      class="font-mono no-underline opacity-50 hover:opacity-75"
    >
      cd ..
    </NuxtLink>
    <p class="text-sm opacity-50">
      <a
        target="_blank"
        rel="noopener"
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
        style="color:inherit"
        class="!font-normal"
      >
        CC BY-NC-SA 4.0
      </a>
      {{ year }} © hannoeru
    </p>
  </footer>
</template>
