<script setup lang="ts">
const route = useRoute()
const domain = useRuntimeConfig().public.domain

const currentPath = computed(() => encodeURIComponent(`${domain}${route.path}`))

const { copy, copied } = useClipboard({
  read: false,
  source: currentPath,
})
const { page } = useContent()
</script>

<template>
  <div v-if="page.type === 'post'" class="text-xl -mx-1 flex space-x-3 mt-8">
    <a
      :href="`https://www.facebook.com/sharer/sharer.php?u=${currentPath}`"
      class="icon-link"
      target="_blank"
      rel="noopener"
      title="Share to Facebook"
    >
      <div i-carbon:logo-facebook />
    </a>
    <a
      :href="`https://twitter.com/intent/tweet?url=${currentPath}`"
      class="icon-link transform scale-130"
      target="_blank"
      rel="noopener"
      title="Share to Twitter"
    >
      <div i-carbon:logo-twitter />
    </a>
    <a
      :href="`https://lineit.line.me/share/ui?url=${currentPath}`"
      class="icon-link"
      target="_blank"
      rel="noopener"
      title="Share to Line"
    >
      <div i-uil:line />
    </a>
    <a
      :href="`mailto:?subject=I want to share this with you &amp;body=Hi there, Check out this site ${currentPath}, Thanks.`"
      class="icon-link"
      target="_blank"
      rel="noopener"
      title="Share via Email"
    >
      <div i-ic:round-mail />
    </a>
    <button
      class="icon-link focus:outline-none transform scale-70"
      title="Copy link"
      @click="copy(currentPath)"
    >
      <div v-if="!copied" i-carbon:link />
      <div v-else i-carbon:checkmark />
    </button>
  </div>
</template>
