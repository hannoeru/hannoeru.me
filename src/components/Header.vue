<template>
  <header
    class="
      fixed top-0 inset-x-0 z-50
      h-$header-height px-6
      bg-white dark:bg-dark-800 !bg-opacity-80
      backdrop-filter backdrop-blur"
  >
    <div class="max-w-screen-lg mx-auto h-full flex justify-between items-center">
      <router-link
        class="text-2xl font-bold select-none outline-none"
        to="/"
        focusable="false"
      >
        Han
      </router-link>
      <nav class="nav">
        <router-link to="/posts">
          <span class="<md:hidden">Blog</span>
          <ri-article-line class="md:hidden" />
        </router-link>
        <router-link to="/bookmarks" title="Bookmarks">
          <span class="<md:hidden">Bookmarks</span>
          <ri-bookmark-line class="md:hidden" />
        </router-link>
        <a href="https://twitter.com/hannoeru" target="_blank" title="Twitter">
          <feather-twitter />
        </a>
        <a href="https://github.com/hannoeru" target="_blank" title="GitHub">
          <uil-github-alt />
        </a>
        <a href="/feed.xml" target="_blank" title="RSS" class="<md:hidden">
          <la-rss-square style="font-size:1.25rem;" />
        </a>
        <ToggleTheme />
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

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.7;
  outline: none;
  padding: .5rem;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}
</style>
