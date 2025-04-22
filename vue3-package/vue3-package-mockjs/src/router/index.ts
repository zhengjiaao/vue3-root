import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
/*    {
      path: '/',
      name: 'home',
      component: HomeView,
    },*/
   /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },*/
    {
      path: '/mock/api',
      name: 'mockApi',
      component: () => import('../views/mock/ApiMockView.vue'),
    },
    {
      path: '/mock/user',
      name: 'mockUser',
      component: () => import('../views/mock/UserMockView.vue'),
    },
  ],
})

export default router
