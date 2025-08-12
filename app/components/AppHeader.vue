<script setup lang="ts">
const isOpen = ref(false)
const toggle = useToggle(isOpen)
</script>

<template>
  <header class="md:hidden fixed top-0 left-0 z-30">
    <button class="p-6 text-xl" @click="toggle()">
      <div i-ri-menu-2-fill />
    </button>
  </header>
  <aside class="h-[calc(100vh-96px)] flex flex-col bg-$c-bg md:(sticky top-12) lt-md:(fixed pt-10 px-3 w-full h-full z-20 transition-transform duration-150 ease-in-out)" :class="{ 'lt-md:translate-x-[-100%]': !isOpen }">
    <nav class="nav grid dark:text-gray-200 mt-6">
      <NavLink to="/" title="Home" @click="isOpen = false">
        <div i-ri-home-5-line />
        <span class="block text-lg">Home</span>
      </NavLink>
      <NavLink to="/posts" title="Posts" @click="isOpen = false">
        <div i-ri-article-line />
        <span class="block text-lg">Posts</span>
      </NavLink>
      <NavLink to="/bookmarks" title="Bookmarks" @click="isOpen = false">
        <div i-ri-bookmark-line />
        <span class="block text-lg">Bookmarks</span>
      </NavLink>
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
</template>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>
