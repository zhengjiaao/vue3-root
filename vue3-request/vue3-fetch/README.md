# vue3-fetch

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
npm install fetch-jsonp

#or
cnpm install fetch-jsonp # 区别就是国内的淘宝镜像
```

## 组件应用

引用（mian.js）

> （fetch-jsonp：在哪文件用就在哪文件引入）

```js
import FetchJsonp from "fetch.jsonp"

fetchJsonp('/users.jsonp')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
```