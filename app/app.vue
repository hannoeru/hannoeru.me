<script setup lang="ts">
import { TooltipProvider } from 'reka-ui'
</script>

<template>
  <TooltipProvider>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </TooltipProvider>
</template>
