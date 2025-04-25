import axios from '@/utils/request'
import type { User } from '@/types'

// 定义用户列表请求参数接口
interface UserListParams {
  page?: number
  size?: number
  username?: string
  role?: string
  status?: number
}

// 定义创建用户请求体接口
interface CreateUserBody {
  username: string
  password: string
  role: string
  status: number
}

// 定义更新用户请求体接口
interface UpdateUserBody {
  id: number
  username?: string
  role?: string
  status?: number
}

// 定义更新用户信息请求体接口
interface UpdateUserProfileBody {
  id: number
  username?: string
  email?: string
  phone?: string
  // department?: string
  // position?: string
  // role?: string
}

// 定义修改密码请求体接口
interface ChangePasswordBody {
  id: number
  oldPassword: string
  newPassword: string
}

// 获取用户列表
export const getUserList = (params: UserListParams) =>
  axios.get<{ total: number; list: User[] }>('/api/users', { params })

// 创建用户
export const createUser = (data: CreateUserBody) =>
  axios.post<User>('/api/users', data)

// 更新用户
export const updateUser = (id: number, data: UpdateUserBody) =>
  axios.patch<User>(`/api/users/${id}`, data)

// 删除用户
export const deleteUser = (id: number) =>
  axios.delete(`/api/users/${id}`)

// 更新用户信息
export const updateUserProfile = (data: UpdateUserProfileBody) =>
  axios.patch<User>('/api/user/profile', data)

// 修改密码
export const changePassword = (data: ChangePasswordBody) =>
  axios.post<{ message: string }>('/api/user/change-password', data)

// 上传头像
export const uploadAvatar = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return axios.post<{ data: { avatarUrl: string; avatarBase64: string }; message: string }>('/api/user/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
