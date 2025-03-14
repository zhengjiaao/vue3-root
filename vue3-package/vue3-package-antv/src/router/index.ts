import {createRouter, createWebHistory} from 'vue-router'
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
            name: 'home',
            component: () => import('../views/g2/RendererView.vue'),
        },
        {
            path: '/bar',
            name: 'bar',
            component: () => import('../views/g2/BarView.vue'),
        },
        {
            path: '/line',
            name: 'line',
            component: () => import('../views/g2/LineView.vue'),
        },
        {
            path: '/pie',
            name: 'pie',
            component: () => import('../views/g2/PieView.vue'),
        },
        {
            path: '/radar',
            name: 'radar',
            component: () => import('../views/g2/RadarView.vue'),
        },
        {
            path: '/venn',
            name: 'venn',
            component: () => import('../views/g2/VennView.vue'),
        },
        {
            path: '/renderer',
            name: 'renderer',
            component: () => import('../views/g2/RendererView.vue'),
        },
        {
            path: '/g6',
            name: 'g6',
            component: () => import('../views/g6/G6View.vue'),
        },
        {
            path: '/g6/force',
            name: 'force',
            component: () => import('../views/g6/ForceView.vue'),
        },
        {
            path: '/g6/grid',
            name: 'grid',
            component: () => import('../views/g6/GridView.vue'),
        },
        {
            path: '/x6',
            name: 'x6',
            component: () => import('../views/x6/X6View.vue'),
        },
        {
            path: '/x6/vue/custom',
            name: 'x6VueShapeCustom',
            component: () => import('../views/x6/X6VueShapeCustomView.vue'),
        },
        {
            path: '/x6/vue/progres',
            name: 'x6VueShapeProgress',
            component: () => import('../views/x6/X6VueShapeProgressView.vue'),
        },
        {
            path: '/x6/dag',
            name: 'X6DAG',
            component: () => import('../views/x6/X6DAGView.vue'),
        },
    ],
})

export default router
