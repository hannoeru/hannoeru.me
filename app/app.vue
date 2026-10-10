<script setup lang="ts">
import { TooltipProvider } from 'reka-ui'

useHead({
  htmlAttrs: { class: 'site-root' },
  bodyAttrs: { class: 'site-body' },
})
</script>

<template>
  <TooltipProvider>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage
        :transition="{
          mode: 'out-in',
          enterActiveClass: 'transition-opacity duration-150 ease-[ease] motion-reduce:transition-none',
          leaveActiveClass: 'transition-opacity duration-150 ease-[ease] motion-reduce:transition-none',
          enterFromClass: 'opacity-0',
          leaveToClass: 'opacity-0',
        }"
      />
    </NuxtLayout>
  </TooltipProvider>
</template>
