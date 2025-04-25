import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import {useUserStore} from "@/stores/user.ts";

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    // meta: { hidden: true }
    meta: {hidden: true, guestOnly: true} // 添加 guestOnly: true, 表示该路由不需要登录就能访问
  },
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/dashboard',
    // meta: { title: '首页', hidden: true }, // 添加 hidden: true 表示该路由不显示在侧边栏中
    meta: {title: '首页', hidden: true, requiresAuth: true}, // 添加 requiresAuth: true, 表示该路由需要登录才能访问
    // meta: { title: '首页', hidden: true, requiresAuth: true, roles: ['admin', 'auditor'] }, // 添加 requiresAuth: true, 表示该路由需要登录才能访问
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        // meta: { title: '控制台', icon: 'dashboard', affix: true }
        meta: {title: '控制台', icon: 'dashboard', roles: ['admin', 'auditor']} // 添加 roles: ['admin', 'auditor'] 表示该路由需要 admin 或 auditor 角色才能访问
        // meta: { title: '控制台', icon: 'dashboard', requiresAuth: true, roles: ['admin', 'auditor'] }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {title: '个人中心', hidden: true, roles: ['admin', 'auditor']}
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index.vue'),
        // meta: { title: '用户管理', icon: 'user' }
        meta: {title: '用户管理', icon: 'user', roles: ['admin']}
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/role/index.vue'),
        // meta: { title: '角色管理', icon: 'role' }
        meta: {title: '角色管理', icon: 'role', roles: ['admin']}
      },
      // {
      //   path: 'system',
      //   name: 'System',
      //   meta: { title: '系统管理', icon: 'system', roles: ['admin'] },
      //   children: [
      //     {
      //       path: 'monitor',
      //       name: 'Monitor',
      //       component: () => import('@/views/monitor/index.vue'),
      //       meta: { title: '系统监控', icon: 'monitor', roles: ['admin', 'auditor'] }
      //     },
      //   ]
      // },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/log/index.vue'),
        meta: {title: '日志管理', icon: 'log', roles: ['admin', 'auditor']}
      }
    ]
  },
  {
    path: '/no-permission',
    name: 'NoPermission',
    component: () => import('@/views/error/NoPermission.vue'),
    meta: {hidden: true, guestOnly: true}
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/views/error/Error403.vue'),
    meta: {hidden: true, guestOnly: true}
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/Error404.vue'),
    meta: {hidden: true, guestOnly: true}
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：登录状态和角色权限验证，避免无权限访问
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const userStore = useUserStore()
  const isAuthenticated = userStore.isAuthenticated
  const requiredRoles = to.meta.roles as string[] | undefined

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 未登录且需要认证，重定向到登录页面
    next({name: 'Login'})
  } else if (requiredRoles && !isAuthenticated) {
    // 未登录且需要认证，重定向到登录页面
    next({name: 'Login'})
  } else if (requiredRoles && isAuthenticated) {
    // 已登录但没有权限，重定向到无权限页面
    const roles = userStore.roles || [] // 如果 roles 为 null，则使用空数组作为默认值
    const hasAccess = requiredRoles.some(role => roles.includes(role))
    if (!hasAccess) {
      next({name: 'NoPermission'})
    } else {
      next()
    }
  } else {
    next()
  }
})


export default router
