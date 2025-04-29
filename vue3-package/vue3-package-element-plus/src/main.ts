import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 全局引入 element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// 全局引入 element-plus 的图标，推荐在组件中单独引入，这样不会将所有图标引入，而是按需引入，提高性能
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component) // 全局注册 element-plus 的图标
// }

app.use(router)
// app.use(ElementPlus)

app.mount('#app')
