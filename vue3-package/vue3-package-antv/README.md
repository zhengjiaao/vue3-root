# vue3-package-antv

- [AntV 官网](https://antv.antgroup.com/)

## 组件框架兼容性

> 注：AntV 与 vue3 兼容不友好，就连官网示例都是基于 React的。总体感觉对vue框架不太好，AntV 的很多组件都是基于 React的开发的。

| 组件          | 官网文档                                       | Vue3 兼容性           | React 兼容性 | 
|-------------|--------------------------------------------|--------------------|-----------|
| AntV/G2 图表  | [AntV/G2](https://g2.antv.antgroup.com/zh) | 兼容                 | 兼容        | 
| AntV/S2 表格  | [AntV/S2](https://s2.antv.antgroup.com/zh) | **不兼容**（不推荐，需自己封装） | 兼容        |
| AntV/G6 关系图 | [AntV/G6](https://g6.antv.antgroup.com/zh) | 兼容                 | 兼容        |
| AntV/X6 流程图 | [AntV/X6](https://x6.antv.antgroup.com/zh) | 兼容(不推荐，示例都是 React) | 兼容        |
| AntV/L7 地图  | [AntV/L7](https://l7.antv.antgroup.com/zh) | 兼容                 | 兼容        |

This template should help get you started developing with Vue 3 in Vite.

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

```sh
# 安装 antv/g2 图表
npm install @antv/g2 --save

# 安装 antv/s2 表格 S2 2.0 与vue3不兼容，仅与react兼容, S2 1.0 与vue3和react兼容
# @antv/s2 默认是 S2 2.0
#npm install @antv/s2 --save
#npm install @antv/s2-vue --save

# 安装 antv/g6 关系图
npm install @antv/g6 --save

# 安装 antv/x6 流程图，注意 x6 和 x6-vue-shape 大版本要一致, React示例较多，vue3 示例较少
npm install @antv/x6 --save
# 安装 antv/x6 插件
# 使用Vue3渲染节点
npm install @antv/x6-vue-shape ant-design-vue --save
# 使用框选功能
npm install @antv/x6-plugin-selection --save
# antv/x6 流程图，可以搭配 Element UI
# 安装 Element Plus 和它的图标库（可选）
npm install element-plus @element-plus/icons-vue

# 安装 antv/l7 地图
npm install --save @antv/l7
# 安装第三方底图依赖
npm install --save @antv/l7-maps

# 安装 less 采用 less 样式
npm install -D less
```

## 组件应用

### AntV/X6 流程图

插件应用：https://x6.antv.antgroup.com/tutorial/plugins/export