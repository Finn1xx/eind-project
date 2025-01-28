import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/video.vue')
    },
    {
      path: '/liked',
      name: 'liked',
      component: () => import('../views/liked.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register.vue')
    }
    
  ]
})

export default router
