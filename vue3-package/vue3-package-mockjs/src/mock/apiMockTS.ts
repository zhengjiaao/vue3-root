import Mock from 'mockjs'

// 定义响应数据类型
interface MockResponse {
    type: string
}

// 拦截 GET 请求
Mock.mock(/\.json/, 'get', (): MockResponse => ({
    type: 'get mock 响应模拟数据 TS',
}))

// 拦截 POST 请求
Mock.mock(/\.json/, 'post', (): MockResponse => ({
    type: 'post mock 响应模拟数据 TS'
}))