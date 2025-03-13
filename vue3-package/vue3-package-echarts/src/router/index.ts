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
            name: 'echarts',
            component: () => import('../components/EChartsComponent.vue'),
        },
        {
            path: '/base',
            name: 'base',
            component: () => import('../views/echarts/BaseView.vue'),
        },
        {
            path: '/bar',
            name: 'bar',
            component: () => import('../views/echarts/BarView.vue'),
        },
        {
            path: '/line',
            name: 'line',
            component: () => import('../views/echarts/LineView.vue'),
        },
        {
            path: '/pie',
            name: 'pie',
            component: () => import('../views/echarts/PieView.vue'),
        },
        {
            path: '/scatter',
            name: 'scatter',
            component: () => import('../views/echarts/ScatterView.vue'),
        },
        {
            path: '/radar',
            name: 'radar',
            component: () => import('../views/echarts/RadarView.vue'),
        },
        {
            path: '/sankey',
            name: 'sankey',
            component: () => import('../views/echarts/SankeyView.vue'),
        },
        {
            path: '/map',
            name: 'map',
            component: () => import('../views/echarts/map/MapView.vue'),
        },
        {
            path: '/3d/globe',
            name: '3d-globe',
            component: () => import('../views/echarts/3D/GlobeView.vue'),
        },
        {
            path: '/3d/map3d',
            name: '3d-map3d',
            component: () => import('../views/echarts/3D/Map3DView.vue'),
        },
        {
            path: '/3d/lines3d',
            name: '3d-lines3d',
            component: () => import('../views/echarts/3D/Lines3DView.vue'),
        },
    ],
})

export default router
