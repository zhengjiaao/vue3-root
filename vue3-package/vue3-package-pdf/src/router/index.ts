import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /*{
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
      path: '/VuePdfEmbed',
      name: 'VuePdfEmbed',
      component: () => import('../views/pdf/VuePdfEmbedView.vue'),
    },
    {
      path: '/PdfObject',
      name: 'PdfObject',
      component: () => import('../views/pdf/PdfObjectView.vue'),
    },
    {
      path: '/PdfjsDist',
      name: 'PdfjsDist',
      component: () => import('../views/pdf/PdfjsDistView.vue'),
    },
  ],
})

export default router
