# vue3-package-element

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
# 安装 Element Plus 和它的图标库（可选）
npm install element-plus @element-plus/icons-vue

# 安装 axios
npm install axios --save
```

## 组件应用

### 引入 Element Plus 并注册组件

#### 全局引用

可以在项目的入口文件（如 main.ts 或 main.js）中全局引入 Element Plus：

```ts
// main.ts
import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')
```

在其他组件中使用：
UserComponent.vue

```js
import {ElMessage, ElMessageBox} from 'element-plus'

// 原有代码...
```

#### 在 setup() 中按需引入

或者在当前文件中按需引入所需组件：

```js
import {ElMessage, ElMessageBox} from 'element-plus'
import 'element-plus/dist/index.css'
import {ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn} from 'element-plus'

// 原有代码...
```

#### 模板中使用

确保模板中的组件标签与引入的组件一致：

```html

<template>
    <div class="user-manager">
        <!-- 用户表单 -->
        <el-form :model="formState" label-width="80px" @submit.prevent="createUser">
            <el-form-item label="姓名" prop="name" required>
                <el-input v-model="formState.name" placeholder="请输入姓名" minlength="3"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" required>
                <el-input v-model="formState.email" type="email" placeholder="请输入邮箱"/>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model.number="formState.age" type="number" min="0" placeholder="请输入年龄"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">添加用户</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 用户列表 -->
        <el-table :data="users" v-if="users.length" style="width: 100%">
            <el-table-column prop="name" label="姓名"/>
            <el-table-column prop="email" label="邮箱"/>
            <el-table-column prop="age" label="年龄"/>
            <el-table-column prop="createTime" label="注册时间" :formatter="(row) => formatDate(row.createTime)"/>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <p v-else>暂无用户数据</p>
    </div>
</template>

```