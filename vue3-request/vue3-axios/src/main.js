import './assets/main.css'
// import './assets/base.css'
// import './assets/styles/global.css'; // 引入全局样式文件

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
