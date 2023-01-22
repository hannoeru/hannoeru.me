<script setup lang="ts">
const isOpen = ref(false)

const isLargeScreen = useMediaQuery('(min-width: 768px)')

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <header v-if="!isLargeScreen" class="fixed top-0 left-0 z-30">
    <button class="p-6 text-xl" @click="toggle">
      <div i-ri-menu-2-fill />
    </button>
  </header>
  <Transition name="slide-fade">
    <aside v-if="(!isLargeScreen && isOpen) || isLargeScreen" class="top-12 h-[calc(100vh-96px)] flex flex-col bg-$c-bg" :class="[isLargeScreen ? 'sticky' : 'fixed pt-10 px-3 w-full h-full z-20']">
      <header class="py-4">
        <NuxtLink class="block text-3xl font-bold select-none outline-none p-4" to="/" focusable="false">
          Han
        </NuxtLink>
      </header>
      <nav class="nav grid dark:text-gray-200">
        <NuxtLink to="/" title="Home" class="flex items-center gap-3 px-5 py-3 hover:bg-white dark:hover:bg-dark-900 rounded-xl transition">
          <div i-ri-home-5-line />
          <span class="block text-lg">Home</span>
        </NuxtLink>
        <NuxtLink to="/posts" title="Posts" class="flex items-center gap-3 px-5 py-3 hover:bg-white dark:hover:bg-dark-900 rounded-xl transition">
          <div i-ri-article-line />
          <span class="block text-lg">Posts</span>
        </NuxtLink>
        <NuxtLink to="/bookmarks" title="Bookmarks" class="flex items-center gap-3 px-5 py-3 hover:bg-white dark:hover:bg-dark-900 rounded-xl transition">
          <div i-ri-bookmark-line />
          <span class="block text-lg">Bookmarks</span>
        </NuxtLink>
      </nav>
      <div class="flex gap-4 p-4 mt-auto">
        <IconLink href="https://twitter.com/hannoeru" title="Twitter">
          <div i-feather-twitter />
        </IconLink>
        <IconLink href="https://github.com/hannoeru" title="GitHub">
          <div i-uil-github-alt />
        </IconLink>
        <IconLink href="/feed.xml" title="RSS" new-tab>
          <div i-la-rss-square style="font-size:1.25rem;" />
        </IconLink>
        <ToggleTheme />
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
