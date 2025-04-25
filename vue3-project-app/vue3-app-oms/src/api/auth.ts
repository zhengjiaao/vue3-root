import axios from '@/utils/request'

interface LoginParams {
  username: string
  password: string
  captchaCode?: string // 验证码, 可选
}

interface LoginResult {
  token: string
  role: string
  id: number
  username: string
}

export const login = (data: LoginParams) =>
  axios.post<LoginResult>('/api/login', data)

export const logout = () =>
  axios.post<boolean>('/api/logout')
