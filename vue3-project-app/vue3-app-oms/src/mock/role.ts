import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

// 定义角色数据的接口
interface Role {
  id: number
  name: string
  code: string
  description: string
  createTime: string
}

// 定义查询参数接口
interface RoleListParams {
  page?: number // 当前页码
  size?: number // 每页大小
  name?: string // 角色名称模糊匹配
  code?: string // 角色编码模糊匹配
  startTime?: string // 开始时间
  endTime?: string // 结束时间
}

// 模拟角色数据
const roles = Mock.mock({
  'list|100': [{
    'id|+1': 1,
    name: '@ctitle(3,5)',
    code: '@word(3,5)',
    description: '@csentence(10,20)',
    createTime: '@datetime'
  }]
}).list as Role[]

// 按 createTime 降序排序
roles.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())

// console.log('Initial roles:', roles) // 添加日志

export default [
  // 仅支持 page 和 size 参数
  /*{
    url: '/api/roles',
    method: 'get',
    response: (options: { query: { page?: number, size?: number } }) => {
      console.log('options = ', options)
      const { page = 1, size = 10 } = options.query
      const startIndex = (page - 1) * size
      const endIndex = startIndex + size
      const paginatedRoles = roles.slice(startIndex, endIndex)

      return {
        code: 200,
        data: {
          list: paginatedRoles,
          total: roles.length
        }
      }
    }
  },*/
  // 支持模糊查询
  {
    url: '/api/roles',
    method: 'get',
    response: (options: { query: RoleListParams }) => {
      console.log('options = ', options)
      const { page = 1, size = 10, name = '', code = '', startTime = '', endTime = '' } = options.query

      // 过滤角色数据
      const filteredRoles = roles.filter(role => {
        const nameMatch = role.name.includes(name)
        const codeMatch = role.code.includes(code)
        const timeMatch = (!startTime || new Date(role.createTime) >= new Date(startTime)) &&
          (!endTime || new Date(role.createTime) <= new Date(endTime))
        return nameMatch && codeMatch && timeMatch
      })

      // 按 createTime 降序排序
      filteredRoles.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())

      const startIndex = (page - 1) * size
      const endIndex = startIndex + size
      const paginatedRoles = filteredRoles.slice(startIndex, endIndex)

      return {
        code: 200,
        data: {
          list: paginatedRoles,
          total: filteredRoles.length
        }
      }
    }
  },
  {
    url: '/api/roles',
    method: 'post',
    response: ({ body }: { body: Omit<Role, 'id' | 'createTime'> }) => {
      console.log('body = ', body)
      const newRole: Role = {
        id: roles.length + 1,
        ...body,
        createTime: new Date().toISOString()
      }
      // roles.push(newRole) // 将新角色插入到数组的结尾
      roles.unshift(newRole) // 将新角色插入到数组的开头
      return {
        code: 200,
        data: newRole
      }
    }
  },
  {
    url: '/api/roles/:id',
    method: 'patch',
    response: ({ body,query }: { body: Partial<Role>, query: Record<string, any> }) => {
      console.log('id = ', query.id)
      console.log('body = ', body)
      const role = roles.find(r => r.id === Number(query.id))
      if (role) {
        Object.assign(role, body)
        // 重新排序以确保按 createTime 降序排列
        roles.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())
        return {
          code: 200,
          data: role
        }
      }
      return {
        code: 404,
        message: 'Role not found'
      }
    }
  },
  {
    url: '/api/roles/:id',
    method: 'delete',
    response: ({ query }: { query: Record<string, any> }) => {
      console.log('delete id = ', query?.id) // 添加日志
      const index = roles.findIndex(r => r.id === Number(query.id))
      if (index !== -1) {
        roles.splice(index, 1)
        return {
          code: 200,
          message: 'Role deleted successfully'
        }
      }
      return {
        code: 404,
        message: 'Role not found'
      }
    }
  }
] as MockMethod[]
