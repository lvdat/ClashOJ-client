import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Trang chủ - ClashOJ - Hệ thống thi đấu coding thời gian thực!' }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue')
    },
    {
      path: '/testapi',
      name: 'testapi',
      component: () => import('../views/TestAPI.vue'),
      meta: { title: 'Test API ClashOJ' }
    },
    {
      path: '/submission',
      name: 'submission',
      component: () => import('../views/Submission.vue'),
      meta: { title: 'Submission - ClashOJ' }
    },
  ]
})

export default router
