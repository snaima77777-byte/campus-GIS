<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppShell from './components/AppShell.vue'

const route = useRoute()

const layout = computed(() => {
  // Login page has no shell
  if (route.path === '/login' || route.path === '/') {
    return 'div'
  }
  return AppShell
})
</script>

<style>
/* App-level — no scoped, these are global */
#app {
  width: 100%;
  height: 100%;
}
</style>
