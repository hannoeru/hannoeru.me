<script setup lang='ts'>
import { isDark, toggleDark } from '@/logics'
</script>

<template>
  <a class="select-none" title="Toggle Color Scheme" @click="toggleDark()">
    <div v-if="isDark" i-ri-moon-line />
    <div v-else i-ri-sun-line />
  </a>
</template>
