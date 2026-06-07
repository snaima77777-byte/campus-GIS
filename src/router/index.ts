import { createRouter, createWebHashHistory } from 'vue-router'
import { useStudentStore } from '@/stores/student'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import NavigationView from '../views/NavigationView.vue'
import CampusLifeView from '../views/CampusLifeView.vue'
import DiningView from '../views/DiningView.vue'
import SportsView from '../views/SportsView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import RoomAssignmentView from '../views/RoomAssignmentView.vue'
import DataDashboardView from '../views/DataDashboardView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/navigation',
      name: 'navigation',
      component: NavigationView,
      meta: { requiresAuth: true },
    },
    {
      path: '/campus-life',
      name: 'campus-life',
      component: CampusLifeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/dining',
      name: 'dining',
      component: DiningView,
      meta: { requiresAuth: true },
    },
    {
      path: '/sports',
      name: 'sports',
      component: SportsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/room-assignment',
      name: 'room-assignment',
      component: RoomAssignmentView,
      meta: { requiresAuth: true },
    },
    {
      path: '/data',
      name: 'data',
      component: DataDashboardView,
      meta: { requiresAuth: true },
    },
  ],
})

// Navigation guard — redirect to login if not authenticated
router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth) {
    // Need to access store outside of setup context
    const raw = localStorage.getItem('studentInfo')
    if (!raw) {
      next({ name: 'login' })
      return
    }
    try {
      const data = JSON.parse(raw)
      if (!data.name || !data.studentId || !data.college) {
        next({ name: 'login' })
        return
      }
    } catch {
      next({ name: 'login' })
      return
    }
  }
  next()
})

export default router
