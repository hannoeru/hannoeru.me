<script setup lang='ts'>
import { isDark, toggleDark } from '@/logics'
</script>

<template>
  <a class="select-none" title="Toggle Color Scheme" @click="toggleDark()">
    <div i-ri-moon-line v-if="isDark" />
    <div i-ri-sun-line v-else />
  </a>
</template>
