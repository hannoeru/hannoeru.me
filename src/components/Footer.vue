<script setup lang="ts">
import dayjs from 'dayjs'
const year = dayjs().get('year')
</script>

<template>
  <footer class="py-8 px-6">
    <div class="max-w-$md-max-width mx-auto opacity-50 flex">
      <span class="text-sm">
        <a target="_blank" rel="noopener" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" style="color:inherit" class="!font-normal">
          CC BY-NC-SA 4.0
        </a>
        {{ year }} © hannoeru
      </span>
    </div>
  </footer>
</template>
