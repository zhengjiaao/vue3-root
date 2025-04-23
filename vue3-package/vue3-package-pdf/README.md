# vue-package-pdf

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
# vue-pdf-embed 支持移动端左右滑动切换页面
npm install vue-pdf-embed

# pdfobject 快速预览及安装类型声明文件
npm install --save pdfobject
npm i --save-dev @types/pdfobject
```
### 选型建议

| 场景           | 推荐方案                           | 优缺点                                                            | 
|--------------|--------------------------------|----------------------------------------------------------------|
| **Vue 2 项目** | `vue-pdf` 或 `pdfvuer`          | 缺点：vue-pdf 插件不能滚动翻页,只能手动触发上页和下页; 优点：大文件建议分页加载（如 pdfvuer 的逐页渲染） |
| **Vue 3 项目** | `vue-pdf-embed` 或 `vue-office` |                                                                |
| **多格式支持**    | `vue-office`                   |                                                                |
| **高度定制化**    | 直接集成 `PDF.js`                  | 无需 Vue 插件，直接使用 pdfjs-dist 实现高度定制化渲染。                           |
| **快速基础预览**   | `pdfobject` 或 `iframe`         |                                                                |

版本兼容性：部分插件依赖特定版本的 pdf.js，需检查文档。