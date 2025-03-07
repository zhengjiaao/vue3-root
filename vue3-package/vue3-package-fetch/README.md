# vue3-package-fetch

This template should help get you started developing with Vue 3 in Vite.

fetch 是浏览器原生支持的 API，使用起来更加轻量级，但需要注意其错误处理和响应处理与 axios 有所不同。

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

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

```sh
# 安装 fetch-jsonp（可选地，默认vue3框架已含fetch组件）
npm install fetch-jsonp

# 安装 Element Plus 和它的图标库（可选）
npm install element-plus @element-plus/icons-vue
```


