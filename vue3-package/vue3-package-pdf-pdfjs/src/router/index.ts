import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
/*    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },*/
    {
      path: '/canvas',
      name: 'canvas',
      component: () => import('../views/pdf/CanvasView.vue'),
    },
    {
      path: '/merge',
      name: 'merge',
      component: () => import('../views/pdf/MergeView.vue'),
    },
    {
      path: '/split',
      name: 'split',
      component: () => import('../views/pdflib/SplitView.vue'),
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/pdflib/FormView.vue'),
    },
    {
      path: '/watermark',
      name: 'watermark',
      component: () => import('../views/pdflib/WatermarkView.vue'),
    },
  ],
})

export default router
