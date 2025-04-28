# vue3-app-ai-deepseek

This template should help get you started developing with Vue 3 in Vite.

纯前端 vue3 接入 deepseek，实现智能对话，不存储会话记录及APIKey。

## 快速开始

#### 核心功能说明

1. **双栏布局**：
    - 左侧侧边栏显示对话列表
    - 右侧主区域显示聊天内容和输入框
2. **对话管理**：
    - 新建对话按钮
    - 对话列表支持切换和删除
    - 自动创建首个对话
3. **消息展示**：
    - 用户消息右对齐（蓝色背景）
    - 助手消息左对齐（白色背景+阴影）
    - 支持Markdown渲染（代码块、列表等）
    - 自动滚动到底部
    - 消息复制按钮
    - 消息发送时间显示（智能显示时间）
    - 流式实时输出响应内容
4. **输入交互**：
    - 支持回车发送（Shift+回车换行）
    - 加载状态禁用输入
    - 智能高度调整的文本域
5. **状态提示**：
    - 加载中的旋转图标
    - API Key未配置提示
    - 错误信息展示
6. **样式优化**：
    - 响应式布局
    - 对话项hover效果
    - 代码块专业样式
    - 平滑滚动动画

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
npm install vue-router pinia sass sass-loader
npm install element-plus @element-plus/icons-vue
npm install mockjs @types/mockjs

# 代码高亮
# MarkdownIt 主要用于将 Markdown 语法转换为 HTML
# dompurify 主要防御XSS攻击，保留安全的HTML标签和内容
npm install markdown-it markdown-it-highlightjs highlight.js
npm install dompurify @types/dompurify
```