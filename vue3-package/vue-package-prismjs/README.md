# vue-package-prismjs

This template should help get you started developing with Vue 3 in Vite.

- [官网 | prismjs](https://prismjs.com/)
- [github | prismjs](https://github.com/PrismJS/prism)

## prismjs 主要功能说明

静态代码高亮：

* 使用 language-{语言名称} 类指定代码语言
* 调用 Prism.highlightAll() 进行初始化高亮
* 支持行号显示（需要 line-numbers 插件）

动态语言切换：

* 使用响应式变量控制当前语言
* 监听语言变化后重新高亮
* 需要动态加载对应的语言组件

异步加载代码：

* 使用 fetch API 加载外部代码文件
* 更新内容后需要调用 nextTick() 等待 DOM 更新
* 重新执行高亮

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

```shell
# prismjs 支持代码高亮、语法提示、错误提示等
npm install prismjs @types/prismjs
## 自定义主题插件配置 可选的
npm install vite-plugin-prismjs
## 格式化html 可选的
npm install js-beautify @types/js-beautify
```
