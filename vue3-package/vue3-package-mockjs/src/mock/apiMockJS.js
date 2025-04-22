import Mock from 'mockjs';

// 拦截 GET 请求
Mock.mock(/\.json/, 'get', () => ({
    type: 'get mock 响应模拟数据 JS',
}));

// 拦截 POST 请求
Mock.mock(/\.json/, 'post', () => ({
    type: 'post mock 响应模拟数据 JS',
}));
