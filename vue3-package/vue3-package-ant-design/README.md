# vue3-package-ant-design

- [Ant Design Vue 官网](https://www.antdv.com/)
- [Ant Design Vue 快速开始-组件](https://www.antdv.com/components/overview)

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for
type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the
TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## 安装组件

```shell
npm install ant-design-vue --save

# 其他组件(测试所需)
npm install vue-request --save
npm install axios --save
```

## 组件应用

全局注册所有组件：

```ts
// main.ts
import {createApp} from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app.use(Antd);
app.mount('#app');
```

全局注册一些组件:

```ts
import {createApp} from 'vue';
import App from './App';
import {Button, message} from 'ant-design-vue';

const app = createApp(App);

/* Automatically register components under Button, such as Button.Group */
app.use(Button).mount('#app');

app.config.globalProperties.$message = message;
```

组件内引用：

```vue

<template>
  <a-button>Add</a-button>
</template>
<script>
  import {Button} from 'ant-design-vue';

  const ButtonGroup = Button.Group;

  export default {
    components: {
      AButton: Button,
      AButtonGroup: ButtonGroup,
    },
  };
</script>
```

按需引用（推荐）：

```js
// main.ts
import {createApp} from 'vue';
import App from './App.vue';
import {Button, message, Modal} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);

// 按需注册组件
app.use(Button);
app.config.globalProperties.$message = message;
app.config.globalProperties.$modal = Modal;

app.mount('#app');
```

### 主题定制

在 vite.config.ts 中配置：

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#1DA57A',
                    'link-color': '#1DA57A',
                    'border-radius-base': '2px',
                },
                javascriptEnabled: true,
            },
        },
    },
});
```

### 国际化配置

在 main.ts 中配置：

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn'); // 设置 dayjs 语言

const app = createApp(App);

// 全局配置中文
app.use(ConfigProvider, {
  locale: zhCN,
});

app.mount('#app');
```