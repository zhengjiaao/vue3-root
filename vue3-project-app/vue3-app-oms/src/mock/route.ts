import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/routes',
    method: 'get',
    response: () => ({
      code: 200,
      data: [
        {
          path: '/system',
          name: 'System',
          component: 'system/index.vue',
          meta: { title: '系统管理' }
        },
        {
          path: '/user',
          name: 'User',
          component: 'user/index.vue',
          meta: { title: '用户管理' }
        }
      ]
    })
  }
] as MockMethod[]
