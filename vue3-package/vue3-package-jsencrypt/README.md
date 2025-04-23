# vue-package-jsencrypt

This template should help get you started developing with Vue 3 in Vite.

## jsencrypt 功能说明

**加密限制**

数据长度限制：RSA 加密的明文长度受密钥长度限制

* 1024 位密钥：最多加密 117 字节
* 2048 位密钥：最多加密 245 字节

长文本处理：需要分段加密或结合 AES 使用

## 与后端交互的典型流程

````text
sequenceDiagram
    Frontend->>Backend: 请求公钥
    Backend-->>Frontend: 返回PUBLIC_KEY
    Frontend->>Frontend: 用jsencrypt加密数据
    Frontend->>Backend: 发送加密后的数据
    Backend->>Backend: 用PRIVATE_KEY解密
````
永远不要在前端直接使用私钥，因为私钥是敏感信息，需要严格保密。

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
# 加解密：支持RSA 非对称加密
npm install jsencrypt
```
