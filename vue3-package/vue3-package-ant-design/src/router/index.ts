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
      path: '/form',
      name: 'form',
      component: () => import('../views/ant/FormView.vue'),
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../views/ant/TableView.vue'),
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('../views/ant/MessageView.vue'),
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('../views/ant/LayoutView.vue'),
    },
    {
      path: '/datePicker',
      name: 'datePicker',
      component: () => import('../views/ant/DatePickerView.vue'),
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/ant/UploadView.vue'),
    }
  ],
})

export default router
