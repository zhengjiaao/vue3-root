import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

// 定义请求参数的类型
interface RequestParams {
    query?: Record<string, any>; // query 参数类型
    body?: Record<string, any>;  // body 参数类型（如果需要）
}

export default [
    // 用户列表
    {
        url: '/api/users',
        method: 'get',
        response: () => {
            return Mock.mock({
                'list|10': [{
                    'id|+1': 1,
                    'name': '@cname + mockProd',
                    'age|18-60': 1,
                    'gender|1': ['男', '女'],
                    'email': '@email',
                    'address': '@county(true)',
                    'avatar': Mock.Random.image('100x100')
                }]
            })
        }
    },

    // 用户详情
    {
        url: '/api/users/:id',
        method: 'get',
        response: (params: RequestParams) => { // 显式声明参数类型
            const { query } = params;
            return Mock.mock({
                id: query?.id || '@guid', // 防止 query.id 未定义
                name: '@cname',
                age: '@integer(18,60)',
                department: '@ctitle(3,5)',
                joinDate: '@date("yyyy-MM-dd")',
                salary: '@float(10000, 50000, 0, 2)'
            })
        }
    },

    // 创建用户
    {
        url: '/api/users',
        method: 'post',
        timeout: 1000,
        response: {
            code: 200,
            message: 'success',
            data: {
                id: '@guid'
            }
        }
    }
] as MockMethod[]
