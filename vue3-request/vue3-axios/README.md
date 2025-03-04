# vue3-axios

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
# 安装依赖包
npm install
```

### Compile and Hot-Reload for Development

```sh
# 本地运行
npm run dev
```

### Compile and Minify for Production

```sh
# 生成生产环境代码
npm run build
# 快速预览
npm run preview
```


## 安装组件

```sh
npm install axios --save

# or
cnpm install axios --save # 区别就是国内的淘宝镜像
```

## 组件应用

引用（mian.js）

> （axios：在哪文件用就在哪文件引入）

```js
// const axios = require('axios');
import axios from "axios";

var api = "http://test.ruiyanghj.com:9098/api/1.0/useraccount/........";
      axios
        .get(api)
        .then((res) => {
          console.log(res);
        })
        .catch((er) => {
          console.log(er);
        });
```