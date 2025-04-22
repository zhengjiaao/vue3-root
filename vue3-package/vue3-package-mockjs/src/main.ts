import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './mock/apiMockTS' // 引入 Mock.js 或 Mock.ts 配置
// import './mock/apiMockJS' // 引入 Mock.js 或 Mock.ts 配置

const app = createApp(App)

app.use(router)

app.mount('#app')
