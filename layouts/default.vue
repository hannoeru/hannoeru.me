<template>
  <div class="max-w-screen-xl mx-auto grid md:gap-6 md:grid-cols-[220px_1fr] p-0 md:p-12">
    <Header />
    <main class="pt-20 md:pt-$header-height bg-white dark:bg-dark-900 p-10 md:rounded-2xl max-w-screen">
      <slot />
      <Footer />
    </main>
  </div>
</template>
