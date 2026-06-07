<template>
  <div class="app-layout">
    <SidebarNav />
    <MobileTopBar />
    <main class="app-main" :class="{ 'sidebar-collapsed': uiStore.sidebarCollapsed }">
      <RouterView v-slot="{ Component }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
import SidebarNav from './SidebarNav.vue'
import MobileTopBar from './MobileTopBar.vue'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
</script>

<style scoped>
.app-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.app-main {
  flex: 1;
  margin-left: var(--sidebar-width);
  height: 100vh;
  overflow: hidden;
  transition: margin-left 0.25s ease;
}
.app-main.sidebar-collapsed {
  margin-left: 0;
}
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.15s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
@media (max-width: 768px) {
  .app-main {
    margin-left: 0;
    padding-top: var(--topbar-height);
  }
}
</style>
