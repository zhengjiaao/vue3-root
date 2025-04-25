import axios from '@/utils/request'
import type { Role } from '@/types'

interface RoleListParams {
  page?: number
  size?: number
  name?: string
  code?: string
  startTime?: string
  endTime?: string
}

export const getRoleList = (params: RoleListParams = {}) =>
  axios.get<{ list: Role[], total: number }>('/api/roles', { params })

export const createRole = (data: Omit<Role, 'id'>) =>
  axios.post<Role>('/api/roles', data)

export const updateRole = (id: number, data: Partial<Role>) =>
  axios.patch<Role>(`/api/roles/${id}`, data)

export const deleteRole = (id: number) =>
  axios.delete<{ message: string }>(`/api/roles/${id}`)
