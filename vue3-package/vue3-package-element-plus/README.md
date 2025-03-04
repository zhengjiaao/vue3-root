## 搭建项目

### 初始化项目结构

```text
element-demo/
├── src/
│   ├── App.vue
│   └── main.ts
├── index.html
├── package.json
└── vite.config.js
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Element Plus Modular Demo</title>
</head>
<body>
<div id="app"></div>
<script type="module" src="/src/main.ts"></script>
</body>
</html>
```

src/App.vue

```vue

<template>
  <div>
    <el-button>{{ message }}</el-button>

    <!-- Table Example -->
    <el-table :data="[]">
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="age" label="Age"></el-table-column>
    </el-table>

    <!-- Progress Example -->
    <el-progress :percentage="100" :format="format"/>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue'

  const message = ref('Hello Element Plus')

  const format = (percentage: number) =>
      percentage === 100 ? 'Full' : `${percentage}%`
</script>
```

src/main.ts

```typescript
import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

vite.config.js

```javascript
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()]
})
```

### 创建package.json文件

```shell
npm init -y
```

手动修改package.json为以下内容：

```json
{
  "name": "element-plus-demo",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "element-plus": "^2.6.3"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.4",
    "vite": "^5.2.0"
  }
}
```

### 安装项目依赖

```shell
npm install
```

### 运行项目

```shell
npm run dev
```

## 按需导入优化

1.安装unplugin-vue-components：

```shell
npm install unplugin-vue-components -D
```

2.修改vite.config.js：

```typescript
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ]
})
```

这样可以实现自动按需导入Element Plus组件并减小打包体积。

按需导入优化是Element Plus的一个重要特性，它允许开发者在运行时动态导入组件，从而减少打包后的文件体积。

