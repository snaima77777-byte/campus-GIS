<template>
  <header class="mobile-topbar">
    <button class="hamburger" @click="uiStore.toggleMobileMenu()">
      <i class="fa" :class="uiStore.mobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
    </button>
    <span class="topbar-title">{{ pageTitle }}</span>
    <span class="topbar-spacer"></span>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/ui'

const route = useRoute()
const uiStore = useUiStore()

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/dashboard': '工作台',
    '/navigation': '校园导航',
    '/campus-life': '校园生活',
    '/dining': '餐饮指南',
    '/sports': '体育场馆',
    '/register': '报到注册',
    '/profile': '个人信息',
    '/room-assignment': '宿舍分配',
    '/data': '数据看板',
  }
  return titles[route.path] || 'HLJIT'
})
</script>

<style scoped>
.mobile-topbar {
  display: none;
}
@media (max-width: 768px) {
  .mobile-topbar {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--topbar-height);
    background: var(--bg-canvas);
    border-bottom: 1px solid var(--hairline);
    z-index: 50;
    padding: 0 var(--sp-xxs);
  }
  .hamburger {
    background: none;
    border: none;
    color: var(--text-ink);
    font-size: 18px;
    cursor: pointer;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .topbar-title {
    flex: 1;
    text-align: center;
    font: 500 14px/1.4 var(--font-family);
    color: var(--text-ink);
  }
  .topbar-spacer {
    width: 36px;
  }
}
</style>
