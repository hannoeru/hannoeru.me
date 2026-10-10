<template>
  <div class="site-shell">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <AppHeader />
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
