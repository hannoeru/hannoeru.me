<template>
  <section aria-labelledby="recent-posts" class="recent-posts">
    <div class="section-heading">
      <h2 id="recent-posts" class="section-label">
        Recent posts
      </h2>
      <NuxtLink to="/posts" class="section-link">
        All posts <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>
    <ListPosts :limit="5" />
  </section>
</template>
