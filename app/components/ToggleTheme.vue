<script setup lang="ts">
const colorMode = useColorMode()

const modes = ['system', 'dark', 'light']

const toggle = () => {
  colorMode.preference = modes[(modes.indexOf(colorMode.preference) + 1) % modes.length] || 'system'
}
</script>

<template>
  <button aria-label="Toggle Theme" class="p-1 flex justify-center items-center" @click="toggle()">
    <div v-if="$colorMode.preference === 'system'" i-ri-macbook-line />
    <div v-else-if="$colorMode.preference === 'dark'" i-ri-moon-line />
    <div v-else i-ri-sun-line />
  </button>
</template>
