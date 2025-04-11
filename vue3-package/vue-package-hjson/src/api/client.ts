// src/api/client.ts
// 前后端数据交互: 场景：处理包含 HJSON 的 HTTP 请求响应
import HJSON from 'hjson'

interface APIResponse<T> {
    data: T
    status: number
}

export const apiClient = {
    async get<T>(url: string): Promise<APIResponse<T>> {
        const response = await fetch(url)
        const text = await response.text()
        return {
            data: HJSON.parse(text),
            status: response.status
        }
    },

    async post<T>(url: string, body: object): Promise<APIResponse<T>> {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/hjson'  // 自定义 Content-Type
            },
            body: HJSON.stringify(body)
        })
        return {
            data: await response.json(),
            status: response.status
        }
    }
}