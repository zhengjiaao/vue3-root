import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  /*  {
      path: '/',
      name: 'home',
      component: HomeView,
    },*/
    {
      path: '/rsa',
      name: 'rsa',
      component: () => import('../views/rsa/RSAView.vue'),
    },
  ],
})

export default router
