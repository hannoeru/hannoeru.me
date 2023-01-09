<template>
  <header
    class="fixed top-0 inset-x-0 z-50 h-$header-height px-6 bg-white dark:bg-dark-800 !bg-opacity-80 backdrop-blur"
  >
    <div class="max-w-screen-lg mx-auto h-full flex justify-between items-center">
      <NuxtLink class="text-2xl font-bold select-none outline-none" to="/" focusable="false">
        Han
      </NuxtLink>
      <nav class="nav">
        <NuxtLink to="/posts" title="Posts">
          <span class="lt-md:hidden">Blog</span>
          <div i-ri-article-line class="md:hidden" />
        </NuxtLink>
        <NuxtLink to="/bookmarks" title="Bookmarks">
          <span class="lt-md:hidden">Bookmarks</span>
          <div i-ri-bookmark-line class="md:hidden" />
        </NuxtLink>
        <a href="https://twitter.com/hannoeru" target="_blank" rel="noopener" title="Twitter">
          <div i-feather-twitter />
        </a>
        <a href="https://github.com/hannoeru" target="_blank" rel="noopener" title="GitHub">
          <div i-uil-github-alt />
        </a>
        <a href="/feed.xml" target="_blank" title="RSS" class="lt-md:hidden">
          <div i-la-rss-square style="font-size:1.25rem;" />
        </a>
        <ToggleDark />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.nav img {
  margin-bottom: 0;
}

.nav a, .nav button {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.7;
  outline: none;
  padding: 0.5rem;
}

.nav a:hover, .nav button:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>
