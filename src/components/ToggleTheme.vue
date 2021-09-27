<script setup lang='ts'>
import { isDark, toggleDark } from '@/logics'
</script>

<template>
  <a class="select-none" title="Toggle Color Scheme" @click="toggleDark()">
    <ri-moon-line v-if="isDark" />
    <ri-sun-line v-else />
  </a>
</template>
