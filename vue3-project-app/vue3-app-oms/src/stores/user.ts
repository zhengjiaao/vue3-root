import {defineStore} from 'pinia'

interface UserState {
  token: string | null
  role: string | null
  roles: string[] | null
  id: number | null
  username: string | null
  avatar: string | null
  isAuthenticated: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    roles: parseRoles(localStorage.getItem('role')), // 调用辅助函数解析 roles
    id: Number(localStorage.getItem('id')),
    username: localStorage.getItem('username'),
    avatar: localStorage.getItem('avatar'),
    isAuthenticated: !!localStorage.getItem('token')
  }),
  actions: {
    login(payload: { id: number; token: string; role: string; username: string }) {
      this.setUser(payload)
    },
    logout() {
      this.removeUser()
    },
    setUser(payload: { id: number; token: string; role: string; username: string; avatar?: string }) {
      this.token = payload.token
      this.role = payload.role
      this.roles = parseRoles(payload.role)
      this.id = payload.id
      this.username = payload.username
      this.avatar = payload.avatar || null
      this.isAuthenticated = true

      localStorage.setItem('token', payload.token) // 更新 token
      localStorage.setItem('role', payload.role) // 更新 role
      localStorage.setItem('id', String(payload.id))
      localStorage.setItem('username', payload.username)
      if (payload.avatar) {
        localStorage.setItem('avatar', payload.avatar)
      }
    },
    updateUser(payload: { id: number; token: string; role: string; username: string; avatar?: string }) {
      console.log('updateUser', payload)
      this.setUser(payload)
    },
    getUser() {
      return {
        token: this.token,
        role: this.role,
        roles: this.roles,
        id: this.id,
        username: this.username,
        avatar: this.avatar
      }
    },
    removeUser() {
      this.token = null
      this.role = null
      this.roles = null
      this.id = null
      this.username = null
      this.avatar = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('id')
      localStorage.removeItem('username')
      localStorage.removeItem('avatar')
    },
    /*logout() {
      this.$reset()
      localStorage.clear()
    }*/
  }
})

// 辅助函数：将字符串解析为字符串数组
/*function parseRoles(roleString: string | null): string[] | null {
  if (!roleString) return null
  try {
    const roles = JSON.parse(roleString)
    return Array.isArray(roles) ? roles : null
  } catch {
    console.error('Failed to parse roles:', roleString)
    return null // 如果解析失败，返回 null
  }
}*/

function parseRoles(roleString: string | null): string[] | null {
  if (!roleString) return null
  try {
    return Array.of(roleString)
  } catch {
    console.error('Failed to parse roles:', roleString)
    return null // 如果解析失败，返回 null
  }
}
