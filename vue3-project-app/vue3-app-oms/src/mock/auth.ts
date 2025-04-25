import type { MockMethod } from 'vite-plugin-mock'

// 定义登录请求体的接口
interface LoginRequestBody {
  username: string
  password: string
  captchaCode?: string
}

// 定义 response 方法的参数类型
interface ResponseParams {
  body?: LoginRequestBody // 修复：明确指定类型为 LoginRequestBody
  headers?: Record<string, string>
}

export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }: { body: LoginRequestBody }) => {
      const users = [
        { id: 1, username: 'admin', password: 'pass123', role: 'admin' },
        { id: 2, username: 'auditor', password: 'pass123', role: 'auditor' },
        { id: 3, username: 'user', password: 'pass123', role: 'user' }
      ]

      const user = users.find(u =>
        u.username === body?.username &&
        u.password === body?.password
      )

      console.log('captchaCode = ' + body.captchaCode?.toLowerCase())

      // 检查验证码是否为空
      if (!body?.captchaCode) {
        return {
          code: 401,
          message: '验证码不能为空'
        }
      }

      // 验证验证码是否正确
      /*if (body?.captchaCode?.toLowerCase() !== '1234') {
        return {
          code: 401,
          message: '验证码错误'
        }
      }*/

      if (!user) {
        return {
          code: 401,
          message: '用户名或密码错误'
        }
      }

      return {
        code: 200,
        data: {
          token: 'MOCK_TOKEN_' + user.role.toUpperCase(),
          role: user.role,
          id: user.id,
          username: user.username
        }
      }
    }
  },
  {
    url: '/api/logout',
    method: 'post',
    response: ({ headers }: ResponseParams) => {
      const token = headers?.authorization?.replace('Bearer ', '')
      console.log('logout token:', token)
      if (token) {
        return {
          code: 200,
          data: true
        }
      } else {
        return {
          code: 200,
          data: false
        }
      }
    }
  }
] as MockMethod[]
