# vue3-package-datav

This template should help get you started developing with Vue 3 in Vite.

## 用前必看

注：目前，DataV还不支持 Vue3 版本的兼容性，目前只支持 Vue2 版本的兼容性。仅兼容 Chrome浏览器，不支持IE，因此，强烈不推荐使用DataV。

### 兼容性

> 组件库的开发和调试都使用Chrome浏览器，没有时间和精力做其他浏览器的兼容，尤其是IE。
> 所以请使用Chrome浏览器。

### 宽高异常

> 组件的默认宽高都是100%，可以根据父容器宽高进行自适应，但在某些情况下组件宽高可能表现异常，这种情况一般是因为组件的父容器宽高发生了变化，而组件没有侦知这一变化，你可以在组件上绑定key值，在更改父容器宽高且页面完成重绘后（使用$nextTick），更新key值，使组件强制刷新，以获取正确宽高。

### 状态更新

> 避免你的组件更新了数据后，状态却不刷新，也就是没变化，请务必看这里组件props均未设置deep监听，刷新props时，请直接生成新的props对象（基础数据类型除外），或完成赋值操作后使用ES6拓展运算符生成新的props对象（this.someProps = { ...this.someProps }）。

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
# 安装 datav-vue3 还在开发中，暂不支持，所有的 API 及 Props 都可能在后续迭代中发生变化
npm install @dataview/datav-vue3
```

## 组件应用
