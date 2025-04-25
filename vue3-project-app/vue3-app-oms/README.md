# vue3-app-oms

This template should help get you started developing with Vue 3 in Vite.

这是一个使用 Vue 3 + Vite 构建的简单版 OMS运维管理平台 应用，它包含了一些常用的组件和功能。

采用了纯前端的开发 + Mock 数据，没有后端服务。

共用 3 角色：

* 管理员：admin/pass123   角色：admin 支持所有页面访问
* 审计用户: auditor/pass123   角色：auditor 支持监控面板、日志管理
* 普通用户: user/pass123   角色：user 不支持访问OMS管理系统平台


## 功能介绍

- 登录页面
- 主页
- 系统管理
- 用户管理
- 角色管理
- 日志管理
- 监控面板
- 路由管理
- 菜单管理
- 错误页面

## 技术栈

- Vue 3 + Vite
- Axios + Mock 数据
- Element Plus
- ECharts
- TypeScript
- Pinia
- ... ...

## 快速开始

```shell
cd vue3-app-oms
npm install
npm run format
npm run dev
```

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

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 项目结构

```text
vue3-app-oms/
├── public/
├── src/
│   ├── api/                  // 接口定义
│   ├── assets/               // 静态资源
│   ├── components/           // 通用组件
│   │   ├── Layout/
│   │   ├── Charts/
│   │   ├── Table/
│   │   └── SearchBar/
│   ├── mock/                 // Mock数据
│   ├── router/               // 路由配置
│   ├── store/                // Pinia状态管理
│   ├── types/                // TS类型定义
│   ├── utils/                // 工具函数
│   ├── views/                // 页面视图
│   │   ├── system/          // 系统管理
│   │   ├── user/            // 用户管理
│   │   ├── role/            // 角色管理
│   │   ├── log/             // 日志管理
│   │   ├── monitor/         // 监控面板
│   │   └── route/           // 路由管理
│   ├── App.vue
│   └── main.ts
├── .env
├── tsconfig.json
└── vite.config.ts
```

## 安装组件

```shell
npm install axios --save
npm install element-plus @element-plus/icons-vue --save
npm install echarts @types/echarts --save
npm install hjson @types/hjson --save
npm install mockjs @types/mockjs --save
npm install vite-plugin-mock --save
npm install -D sass-embedded
```