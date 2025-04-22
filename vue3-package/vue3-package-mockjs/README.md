# vue3-package-mockjs

This template should help get you started developing with Vue 3 in Vite.

- [官网 | mockjs](http://mockjs.com/)
- [官网 用法示例 | mockjs](http://mockjs.com/examples.html)
- [github | mockjs](https://github.com/nuysoft/Mock/)

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
# 安装axios 拦截请求，并返回 mock模拟数据（这里是拦截axios请求示例）
npm install axios @types/axios

# mockjs 模拟数据
npm install mockjs @types/mockjs

# vue 3 vite 插件（推荐,dev环境可用）
npm install vite-plugin-mock --save-dev
# vue 3 vite 插件（推荐,支持生产环境可用）
npm install vite-plugin-mock --save

```

## 组件示例

#### 方式一： mockjs+ axios 实现拦截请求返回模拟数据（手动注册）

参考：

```text
/src/main.ts  配置 apiMockTS.ts
/src/mock/apiMockTS.ts or apiMockJS.ts
/src/components/mock/ApiExample.vue
```

main.ts 配置

```ts
import './mock/apiMockTS' // 引入 Mock.js 或 Mock.ts 配置
// import './mock/apiMockJS' // 引入 Mock.js 或 Mock.ts 配置
```

#### 方式二： vite-plugin-mock 实现拦截请求返回模拟数据（自动注册）

vite 的数据模拟插件，是基于 vite.js 开发的，并同时支持本地环境和生产环境。

参考：

```text
vite.config.ts 配置 Vite 插件，在 vite.config.ts 中引入并配置 viteMockServe，根据开发/生产环境动态启用 Mock 功能
/src/mock/userMockTS.ts
/src/components/mock/UserExample.vue
```

vite.config.ts 配置

```ts
import {viteMockServe} from 'vite-plugin-mock'

export default ({command}: ConfigEnv) => {
    return defineConfig({
        plugins: [
            viteMockServe({
                enable: true,
                mockPath: './src/mock',          // Mock 数据文件存放路径, 指定 Mock 文件的存储目录（默认为 mock）
                watchFiles: true,          // 监听文件变化自动更新
            }),
        ],
    })
}
```

另外，可以根据环境选址配置：

```shell
# 用于跨平台设置环境变量的工具
npm install cross-env --save-dev
```

package.json 配置
默认

```json
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
  },
```

变更为：

```json
"scripts": {
"dev": "NODE_ENV=development vite", // 开发环境变量设置为 development
"build": "NODE_ENV=production vite build", // 生产环境变量设置为 production
"serve": "vite preview" // 预览生产构建版本，通常不需要设置环境变量，但可以根据需要调整脚本以包含环境变量设置。
}
```