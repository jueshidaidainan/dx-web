<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/">首页 (Home)</RouterLink>
      <RouterLink to="/about">关于 (About)</RouterLink>
      <RouterLink to="/data-list">数据列表</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
/*
  给页面顶部导航栏一些简单的样式
*/
.header {
  line-height: 1.5;
  border-bottom: 1px solid #444;
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
}

.nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: var(--color-text);
  text-decoration: none;
}

.nav a:first-of-type {
  border: 0;
}

.nav a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1); /* an active link color */
}
</style>