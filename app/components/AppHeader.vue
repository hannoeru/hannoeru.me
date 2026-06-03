<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'

const isOpen = ref(false)
</script>

<template>
  <DialogRoot v-model:open="isOpen">
    <header class="md:hidden fixed top-0 left-0 z-30">
      <DialogTrigger as-child>
        <button
          class="p-6 text-xl"
          aria-label="Open navigation"
        >
          <div i-ri-menu-2-fill />
        </button>
      </DialogTrigger>
    </header>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden" />
      <DialogContent class="fixed inset-y-0 left-0 z-40 flex w-[min(20rem,100vw)] flex-col bg-$c-bg px-3 pt-10 shadow-2xl md:hidden">
        <DialogTitle class="sr-only">
          Site navigation
        </DialogTitle>
        <DialogDescription class="sr-only">
          Main navigation links and social links.
        </DialogDescription>
        <DialogClose
          class="absolute top-0 right-0 p-6 text-xl"
          aria-label="Close navigation"
        >
          <div i-ri-close-line />
        </DialogClose>
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
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
  <aside class="h-[calc(100vh-96px)] hidden flex-col bg-$c-bg md:(sticky top-12 flex)">
    <nav class="nav grid dark:text-gray-200 mt-6">
      <NavLink to="/" title="Home">
        <div i-ri-home-5-line />
        <span class="block text-lg">Home</span>
      </NavLink>
      <NavLink to="/posts" title="Posts">
        <div i-ri-article-line />
        <span class="block text-lg">Posts</span>
      </NavLink>
      <NavLink to="/bookmarks" title="Bookmarks">
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
