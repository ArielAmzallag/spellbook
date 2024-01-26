<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

nav {
  margin-bottom: 1em;
}
nav a {
  margin-right: 1em;
  text-decoration: none;
  color: #42b883;
}
nav a:hover {
  text-decoration: underline;
}
</style>
