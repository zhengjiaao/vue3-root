import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../views/draggable/VueDraggablePlusView.vue'),
    },
    {
      path: '/element/plus',
      component: () => import('../views/draggable/VueDraggablePlusAndElementPlusView.vue'),
    }
  ],
})

export default router
