import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

export interface ApiError {
    code: number
    message: string
    details?: Record<string, unknown>
}

export const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // 默认是前端的baseURL，也可以通过环境变量设置
    // baseURL: 'http://localhost:8080', // 后端的baseURL，通过环境变量设置
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
})

// 响应拦截器
api.interceptors.response.use(
    // 日志输出响应数据
    (response: AxiosResponse) => {
        console.log('Response:', response)
        return response
    },
    // (response: AxiosResponse) => response.data,
    (error) => {
        const err: ApiError = {
            code: error.response?.status || 500,
            message: error.response?.data?.message || 'Unknown Error',
            details: error.response?.data?.details
        }
        return Promise.reject(err)
    }
)