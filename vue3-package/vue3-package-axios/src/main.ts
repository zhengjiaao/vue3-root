import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 全局引入 element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const app = createApp(App)

// app.use(ElementPlus)
app.use(router)


app.mount('#app')
