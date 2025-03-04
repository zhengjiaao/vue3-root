# vue3-root

- [vue3-英文-官网](https://vuejs.org/)
- [vue3-中文-快速开始](https://cn.vuejs.org/guide/quick-start.html)
- [vue3-英文-快速开始](https://vuejs.org/guide/quick-start.html)

本项目是基于 **`vue3`** 框架集成各种前端组件示例。

## 基础环境

- 确保你安装了最新版本的 [Node.js](https://nodejs.org/)

验证环境：

```
node -v
npm -v
```

## 快速开始

进入某个项目模块，安装依赖包:

```shell
# 进入某个项目
cd <your-project-name>
# 安装依赖包
npm install
```

本地运行：

```shell
npm run dev
```

当你准备将应用发布到生产环境时，请运行：

```shell
# 生成生产环境代码
npm run build
```

本地快速预览：

```shell
# 本地预览-生成的生产环境代码
npm run preview
```

## IDE 支持 (推荐 VS Code)

- 强烈推荐 [Visual Studio Code](https://code.visualstudio.com/) (VS Code)，因为它对 TypeScript 有着很好的内置支持。

    - [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (之前是 Volar) 是官方的 VS Code
      扩展，提供了 Vue 单文件组件中的 TypeScript 支持，还伴随着一些其他非常棒的特性。

      注意：

      Vue - Official 扩展取代了我们之前为 Vue 2 提供的官方 VS Code
      扩展 [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)。如果你之前已经安装了 Vetur，请确保在
      Vue 3 的项目中禁用它。

- [WebStorm](https://www.jetbrains.com/webstorm/) 对 TypeScript 和 Vue 也都提供了开箱即用的支持。其他的 JetBrains IDE
  也同样可以通过一个[免费插件](https://plugins.jetbrains.com/plugin/9442-vue-js)支持。从 2023.2 版开始，WebStorm 和 Vue
  插件内置了对 Vue 语言服务器的支持。你可以在设置 > 语言和框架 > TypeScript > Vue 下将 Vue 服务设置为在所有 TypeScript
  版本上使用 Volar 集成。默认情况下，Volar 将用于 TypeScript 5.0 及更高版本。

## 快速搭建项目示例

- 参考官网-[快手上手](https://cn.vuejs.org/guide/quick-start.html)

### 创建一个 Vue 应用

#### 步骤 1: 安装 Node.js 和 npm

同样，确保你的系统上已经安装了 Node.js 和 npm。可以通过以下命令检查：

```bash
node -v
npm -v
```

如果没有安装，请前往 [Node.js 官网 ](https://nodejs.org/)下载并安装最新版本。

#### 步骤 2: 使用 Vite 搭建 Vue 3 项目

```shell
# For npm 
npm create vue@latest

# For pnpm 
pnpm create vue@latest

# For Yarn Modern (v2+)
yarn create vue@latest
```

![project.png](./project.png)

#### 步骤3：运行项目

```bash
cd <your-project-name>
npm install
npm run dev
```

你现在应该已经运行起来了你的第一个 Vue
项目！请注意，生成的项目中的示例组件使用的是[组合式 API](https://cn.vuejs.org/guide/introduction.html#composition-api) 和
`<script setup>`，而非[选项式 API](https://cn.vuejs.org/guide/introduction.html#options-api)。下面是一些补充提示：

- 推荐的 IDE
  配置是 [Visual Studio Code](https://code.visualstudio.com/) + [Vue - Official 扩展](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  。如果使用其他编辑器，参考 [IDE 支持章节](https://cn.vuejs.org/guide/scaling-up/tooling.html#ide-support)。
- 更多工具细节，包括与后端框架的整合，我们会在[工具链指南](https://cn.vuejs.org/guide/scaling-up/tooling.html)进行讨论。
- 要了解构建工具 Vite 更多背后的细节，请查看 [Vite 文档](https://cn.vitejs.dev/)。
- 如果你选择使用 TypeScript，请阅读 [TypeScript 使用指南](https://cn.vuejs.org/guide/typescript/overview.html)。

#### 步骤四：发布项目到生成环境

```bash
npm run build

pnpm run build

yarn build
```

此命令会在 `./dist`
文件夹中为你的应用创建一个生产环境的构建版本。关于将应用上线生产环境的更多内容，请阅读[生产环境部署指南](https://cn.vuejs.org/guide/best-practices/production-deployment.html)。

### 通过 CDN 使用 Vue

#### 使用全局构建版本

这里我们使用了 [unpkg](https://unpkg.com/)，但你也可以使用任何提供 npm 包服务的
CDN，例如 [jsdelivr](https://www.jsdelivr.com/package/npm/vue) 或 [cdnjs](https://cdnjs.com/libraries/vue)
。当然，你也可以下载此文件并自行提供服务。

下面的链接使用了*全局构建版本*的 Vue，该版本的所有顶层 API 都以属性的形式暴露在了全局的 `Vue` 对象上。这里有一个使用全局构建版本的例子：

```html

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
    const {createApp, ref} = Vue

    createApp({
        setup() {
            const message = ref('Hello vue!')
            return {
                message
            }
        }
    }).mount('#app')
</script>
```

#### 使用 ES 模块构建版本

在本文档的其余部分我们使用的主要是 [ES 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)
语法。现代浏览器大多都已原生支持 ES 模块。因此我们可以像这样通过 CDN 以及原生 ES 模块使用 Vue：

```html

<div id="app">{{ message }}</div>

<script type="module">
    import {createApp, ref} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

    createApp({
        setup() {
            const message = ref('Hello Vue!')
            return {
                message
            }
        }
    }).mount('#app')
</script>
```

注意我们使用了 `<script type="module">`，且导入的 CDN URL 指向的是 Vue 的 **ES 模块构建版本**。

## 项目创建-示例

```
npm create vue@latest
```

![project.png](./project.png)

如果不确定是否要开启某个功能，你可以直接按下回车键选择 `No`。在项目被创建后，通过以下步骤安装依赖。

运行项目:

```shell
cd <your-project-name>
npm install
npm run dev
```

当你准备将应用发布到生产环境时，请运行：

```shell
npm run build
```

## 项目组件管理-示例

```shell
# 安装组件
npm install vue-router@4

# 卸载组件
npm uninstall vue-router

# 更新组件
npm update vue-router

# 搜索组件
npm search vue-router

# 查看组件信息
npm view vue-router

# 查看组件版本
npm view vue-router versions

# 查看组件依赖
npm view vue-router dependencies

# 查看组件依赖树
npm view vue-router dependencies --json | jq .dependencies
```



