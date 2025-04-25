// import { createRouter, createWebHistory } from 'vue-router'
// import type { RouteMeta } from 'vue-router'
// import { useUserStore } from '@/stores/user'
//
// // 定义路由元信息的类型
// interface CustomRouteMeta extends RouteMeta {
//   requiresAuth?: boolean
//   roles?: string[]
//   hidden?: boolean
// }
//
// const routes = [
//   {
//     path: '/login',
//     name: 'Login',
//     component: () => import('@/views/login/index.vue'),
//     meta: {} as CustomRouteMeta // 明确指定 meta 类型
//   },
//   {
//     path: '/',
//     component: () => import('@/components/Layout/index.vue'),
//     meta: { requiresAuth: true } as CustomRouteMeta,
//     children: [
//       {
//         path: '/system',
//         name: 'System',
//         component: () => import('@/views/system/index.vue'),
//         meta: { roles: ['admin'] } as CustomRouteMeta
//       },
//       {
//         path: '/user',
//         name: 'User',
//         component: () => import('@/views/user/index.vue'),
//         meta: { roles: ['admin'] } as CustomRouteMeta
//       },
//       {
//         path: '/monitor',
//         name: 'Monitor',
//         component: () => import('@/views/monitor/index.vue'),
//         meta: { roles: ['admin', 'auditor'] } as CustomRouteMeta
//       },
//       {
//         path: '/log',
//         name: 'Log',
//         component: () => import('@/views/log/index.vue'),
//         meta: { roles: ['admin', 'auditor'] } as CustomRouteMeta
//       },
//       {
//         path: '/403',
//         name: 'Forbidden',
//         component: () => import('@/views/error/Error403.vue'),
//         meta: {} as CustomRouteMeta
//       }
//     ]
//   }
// ]
//
// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })
//
// router.beforeEach(async (to, from, next) => {
//   const userStore = useUserStore()
//
//   // 需要登录的页面
//   if (to.meta.requiresAuth) {
//     if (userStore.token) {
//       // 检查角色权限
//       if (to.meta.roles && Array.isArray(to.meta.roles) && !to.meta.roles.includes(userStore.role)) {
//         next('/403')
//       } else {
//         next()
//       }
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })
//
// export default router
