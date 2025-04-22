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
      path: '/base/bar',
      name: 'baseBar',
      component: () => import('../views/d3/base/BarChartView.vue'),
    },
    {
      path: '/base/line',
      name: 'baseLine',
      component: () => import('../views/d3/base/LineChartView.vue'),
    },
    {
      path: '/base/pie',
      name: 'basePie',
      component: () => import('../views/d3/base/PieChartView.vue'),
    },
  ],
})

export default router
