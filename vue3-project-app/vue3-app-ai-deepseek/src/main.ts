import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

// 全局引入 element-plus 的图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
// import './mock'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component) // 全局注册 element-plus 的图标
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
