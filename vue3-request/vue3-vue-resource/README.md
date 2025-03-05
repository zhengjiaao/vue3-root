# vue3-vue-resource

# 注意版本兼容问题

> 在 Vue 3 中，官方推荐不再使用 Vue Resource 这个库，因为 Vue Resource 没有针对 Vue 3 进行更新和兼容。

1. 检查 Vue 版本兼容性： 确认你使用的 Vue 版本与 Vue Resource 兼容。Vue Resource 主要用于 Vue 2.x，如果你使用的是 Vue 3.x，建议使用其他 HTTP 请求库，如 Axios。
2. 使用 Axios 替代 Vue Resource（推荐）： 如果你使用的是 Vue 3.x，推荐使用 Axios 进行 HTTP 请求。

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

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

### Compile and Minify for Production

```sh
npm run build
```


## 安装组件

```sh
npm install vue-resource --save

# or
cnpm install vue-resource --save   # 区别就是国内的淘宝镜像
```

## 组件应用

引用（mian.js）

> vue-resource 全局引用 or 局部引用

```js
// 引入VueResource官方插件，并使用
import VueResource from 'vue-resource'
Vue.use(VueResource);

```