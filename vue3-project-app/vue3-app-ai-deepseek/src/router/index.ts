import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),  // 聊天界面（单文件式）
      // component: () => import('../views/ChatView2.vue'), // 聊天界面（多文件式，todo 但是会出现非实时渲染情况，待解决）
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/SettingsView.vue'),
    }
  ],
})

export default router
