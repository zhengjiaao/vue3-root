# vue3-package-d3

This template should help get you started developing with Vue 3 in Vite.

- [官网 | d3](https://d3js.org/)
- [github | d3](https://github.com/d3/d3)

## D3 介绍

#### 功能介绍

D3.js (Data-Driven Documents) 是一个基于数据操作文档的 JavaScript 库，主要用于动态数据可视化。核心功能包括：

* 数据绑定：将数据与 DOM 元素绑定，实现数据驱动视图。
* DOM 操作：高效操作 SVG、HTML、Canvas 元素。
* 数据转换：提供丰富的数学、统计、时间序列处理方法。
* 动画过渡：支持平滑的动画效果。
* 比例尺与坐标轴：灵活处理数据到视觉元素的映射。

#### 常用场景

* 折线图/面积图：展示趋势变化。
* 柱状图/条形图：对比分类数据。
* 饼图/环形图：显示比例分布。
* 散点图/气泡图：分析多维数据关系。
* 力导向图：可视化复杂网络关系。
* 地图可视化：地理数据渲染。

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
npm install d3 @types/d3 --save
```
