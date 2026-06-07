<template>
  <!-- Desktop sidebar -->
  <aside class="sidebar" :class="{ collapsed: uiStore.sidebarCollapsed }">
    <div class="sidebar-brand" @click="router.push('/dashboard')" title="校园GIS">
      <span class="brand-text">HLJIT</span>
    </div>

    <nav class="sidebar-nav">
      <a
        v-for="item in navItems"
        :key="item.route"
        class="nav-item"
        :class="{ active: isActive(item.route) }"
        :title="item.label"
        @click="router.push(item.route)"
      >
        <i :class="item.icon"></i>
        <span class="nav-label">{{ item.label }}</span>
      </a>
    </nav>

    <div class="sidebar-footer">
      <a class="nav-item" title="退出" @click="logout">
        <i class="fa fa-sign-out"></i>
        <span class="nav-label">退出</span>
      </a>
    </div>
  </aside>

  <!-- Mobile overlay -->
  <Transition name="slide">
    <div v-if="uiStore.mobileMenuOpen" class="mobile-overlay" @click="uiStore.closeMobileMenu()">
      <aside class="mobile-sidebar" @click.stop>
        <div class="sidebar-brand" @click="goTo('/dashboard')">
          <span class="brand-text">HLJIT</span>
        </div>
        <nav class="sidebar-nav">
          <a
            v-for="item in navItems"
            :key="item.route"
            class="nav-item"
            :class="{ active: isActive(item.route) }"
            @click="goTo(item.route)"
          >
            <i :class="item.icon"></i>
            <span class="nav-label">{{ item.label }}</span>
          </a>
        </nav>
        <div class="sidebar-footer">
          <a class="nav-item" @click="logout">
            <i class="fa fa-sign-out"></i>
            <span class="nav-label">退出</span>
          </a>
        </div>
      </aside>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useStudentStore } from '@/stores/student'

const router = useRouter()
const route = useRoute()
const uiStore = useUiStore()
const studentStore = useStudentStore()

const navItems = [
  { route: '/dashboard', icon: 'fa fa-dashboard', label: '工作台' },
  { route: '/navigation', icon: 'fa fa-map-signs', label: '导航' },
  { route: '/campus-life', icon: 'fa fa-tree', label: '生活' },
  { route: '/dining', icon: 'fa fa-cutlery', label: '餐饮' },
  { route: '/sports', icon: 'fa fa-futbol-o', label: '体育' },
  { route: '/register', icon: 'fa fa-pencil-square-o', label: '报到' },
  { route: '/profile', icon: 'fa fa-user', label: '资料' },
  { route: '/room-assignment', icon: 'fa fa-bed', label: '宿舍' },
  { route: '/data', icon: 'fa fa-bar-chart', label: '数据' },
]

function isActive(path: string) {
  return route.path === path
}

function goTo(path: string) {
  router.push(path)
  uiStore.closeMobileMenu()
}

function logout() {
  studentStore.clear()
  uiStore.closeMobileMenu()
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background: var(--bg-canvas);
  border-right: 1px solid var(--hairline);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  transition: transform 0.25s ease;
}

.sidebar.collapsed {
  transform: translateX(-100%);
}

.sidebar-brand {
  width: 40px;
  height: 40px;
  margin: var(--sp-sm) 0 var(--sp-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s;
}
.sidebar-brand:hover {
  opacity: 0.8;
}
.brand-text {
  font: 600 14px/1 var(--font-family);
  color: var(--primary);
  letter-spacing: -0.5px;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: 100%;
}

.nav-item {
  width: 44px;
  height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
}

.nav-item:hover {
  color: var(--text-ink);
}
.nav-item.active {
  color: var(--primary);
}
.nav-item i {
  font-size: 16px;
}
.nav-label {
  font: var(--font-caption-uppercase);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 1px;
  line-height: 1;
  white-space: nowrap;
}

.sidebar-footer {
  padding-bottom: var(--sp-xs);
}

/* Mobile overlay */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: var(--bg-overlay);
  z-index: 200;
}
.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background: var(--bg-canvas);
  border-right: 1px solid var(--hairline);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 201;
}
.mobile-sidebar .nav-item {
  width: 200px;
  height: 44px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0 var(--sp-xs);
  gap: var(--sp-xs);
}
.mobile-sidebar .nav-item i {
  font-size: 14px;
  width: 20px;
  text-align: center;
}
.mobile-sidebar .nav-label {
  font: 500 13px/1.4 var(--font-family);
  letter-spacing: 0;
  text-transform: none;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .sidebar { display: none; }
}
@media (min-width: 769px) {
  .mobile-overlay { display: none; }
}
</style>
