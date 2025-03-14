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
      path: '/',
      name: 'L7Map',
      component: () => import('../views/l7/L7MapView.vue'),
    },
    {
      path: '/map/GaoDe',
      name: 'L7GaoDeMap',
      component: () => import('../views/l7/L7GaoDeMapView.vue'),
    },
    {
      path: '/map/layer',
      name: 'L7MapLayer',
      component: () => import('../views/l7/L7MapLayerView.vue'),
    },
    {
      path: '/map/draw',
      name: 'L7Draw',
      component: () => import('../views/l7/L7DrawView.vue'),
    },
    {
      path: '/map/plot',
      name: 'L7Plot',
      component: () => import('../views/l7/L7PlotView.vue'),
    },
  ],
})

export default router
