# Vue3 项目结构

以下是 Vue3 项目结构的详细解释（基于 Vite 构建工具 + TypeScript 的现代项目结构）：

## 标准项目结构

```bash
my-vue3-project/
├── public/                  # 静态资源 (直接复制，不经过构建)
│   └── favicon.ico         
├── src/
│   ├── assets/             # 需要构建的静态资源 (图片/字体等)
│   ├── components/         # 公共组件
│   ├── composables/        # 组合式函数 (替代 mixins)
│   ├── layouts/            # 布局组件
│   ├── router/             # 路由配置
│   │   └── index.ts        
│   ├── stores/             # Pinia 状态管理
│   │   └── counter.ts      
│   ├── styles/             # 全局样式
│   │   ├── main.scss       
│   │   └── variables.scss  
│   ├── types/              # 类型定义
│   ├── utils/              # 工具函数
│   ├── views/              # 页面级组件
│   ├── App.vue             # 根组件
│   └── main.ts             # 入口文件
├── .env                    # 环境变量
├── .eslintrc.js            # ESLint 配置
├── .prettierrc             # Prettier 配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
└── package.json
```

### 核心目录详解

#### 1. **src/main.ts** - 应用入口

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 初始化 Vue 实例
const app = createApp(App)

// 注册插件
app.use(router)

// 挂载应用
app.mount('#app')
```

#### 2. **src/App.vue** - 根组件

```vue
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>
```

#### 3. **router/** - 路由管理

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/About.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
```

#### 4. **stores/** - Pinia 状态管理

```typescript
// src/stores/counter.ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    }
  }
})
```

------

## 高级目录结构（企业级项目）

```bash
src/
├── apis/                # API 请求封装
│   ├── user.api.ts      
│   └── product.api.ts   
├── features/            # 功能模块 (按业务划分)
│   ├── auth/            # 认证模块
│   │   ├── components/  
│   │   ├── hooks/       
│   │   └── store.ts     
│   └── dashboard/       # 仪表盘模块
├── config/              # 项目配置
│   ├── constants.ts     # 常量配置
│   └── settings.ts      # 应用设置
├── directives/          # 自定义指令
├── plugins/             # 插件系统
└── tests/               # 单元测试
    └── components/
        └── __tests__/
```

------

### 关键配置文件说明

#### 1. **vite.config.ts** (构建配置)

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 路径别名
    }
  },
  server: {
    port: 8080, // 开发服务器端口
    open: true  // 自动打开浏览器
  }
})
```

#### 2. **tsconfig.json** (TypeScript 配置)

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["vite/client"],
    "strict": true
  }
}
```

------

## 不同规模项目的结构建议

#### 小型项目（SPA）

```bash
src/
├── components/  # 所有组件
├── views/       # 简单页面
└── utils/       # 工具函数
```

#### 中型项目（模块化）

```bash
src/
├── modules/     # 业务模块
│   ├── user/
│   └── order/
├── shared/      # 共享资源
└── core/        # 核心逻辑
```

#### 大型项目（微前端架构）

```bash
packages/
├── main-app/    # 主应用
├── sub-app1/    # 子应用1
├── sub-app2/    # 子应用2
└── shared-libs/ # 共享库
```

------

## 最佳实践原则

1. **组件组织策略**

    - 原子设计原则：`atoms > molecules > organisms > templates > pages`
    - 组件命名：`<ButtonPrimary>` 优于 `<MyButton>`
    - 目录结构：按功能而非类型划分

2. **代码分割规范**

   ```typescript
   // 动态导入实现代码分割
   const UserProfile = defineAsyncComponent(() =>
     import('@/features/user/UserProfile.vue')
   )
   ```

3. **样式管理方案**

   ```scss
   // 使用 BEM 命名规范
   .user-card {
     &__header { /* ... */ }
     &--highlighted { /* ... */ }
   }
   ```

4. **类型安全实践**

   ```typescript
   // 强类型路由配置
   declare module 'vue-router' {
     interface RouteMeta {
       requiresAuth?: boolean
       roles?: string[]
     }
   }
   ```

------

## 常见问题解决

1. **循环引用问题**

    - 使用 `import type` 进行类型导入
    - 重构代码结构避免双向依赖

2. **全局类型扩展**

   ```typescript
   // src/types/vue.d.ts
   declare module 'vue' {
     interface ComponentCustomProperties {
       $filters: {
         currency: (value: number) => string
       }
     }
   }
   ```

3. **环境变量管理**

   ```bash
   .env                # 所有环境
   .env.local          # 本地覆盖
   .env.development    # 开发环境
   .env.production     # 生产环境
   ```

这种结构设计既保持了灵活性，又能适应不同规模项目的需求，同时遵循了 Vue 3 的最佳实践和现代前端工程化规范。