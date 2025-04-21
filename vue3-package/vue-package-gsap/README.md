# vue-package-gsap

This template should help get you started developing with Vue 3 in Vite.

- [官网 | gsap](https://gsap.com/)

## 介绍

gsap 是一个前端动画库，它提供了许多功能，如动画、缓动、时间轴、补间、事件处理、TweenMax、TimelineMax 等。

#### GSAP 功能特性介绍

GSAP（GreenSock Animation Platform）核心能力：

* 高性能动画引擎
    * 60FPS流畅动画，优化浏览器重绘机制
    * 自动处理CSS硬件加速（GPU加速）
* 精准时间轴控制
    * Timeline（时间轴）实现动画序列编排
    * 支持并行/串行动画、相对/绝对时间插入
* 跨平台兼容
    * 支持React/Vue等主流框架
    * 兼容现代浏览器及IE9+
* 丰富插件生态
    * ScrollTrigger：滚动驱动动画
    * MorphSVG：SVG变形动画
    * Draggable：拖拽交互
    * Physics2D：物理运动模拟
* 高级动画控制
    * 精确进度控制（progress()）
    * 时间缩放（timeScale()）
    * 回调函数系统（onStart/onComplete）

#### Vue3 典型应用场景

* 页面过渡动画
    * 路由切换时的元素渐隐/位移
    * 组件挂载/卸载的过渡效果
* 交互反馈动画
    * 按钮点击涟漪效果
    * 表单验证错误震动提示
* 数据可视化
    * 图表元素动态加载
    * 数据变化时的平滑过渡
* 复杂序列动画
    * 产品展示的多步骤动画
    * 交互式故事讲述动画
* 滚动驱动界面
    * 视差滚动效果
    * 滚动触发动画执行

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
npm install gsap
```