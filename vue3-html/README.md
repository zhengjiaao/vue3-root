### 方法 1：使用 CDN 引入 Axios

直接在 HTML 文件中通过 `<script>` 标签引入 Axios，而不是在 `api.js` 中使用 `import`。

#### 修改后的 `api.js`

```javascript
// api.js
const baseURL = 'http://localhost:8080';

const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    // 获取用户列表
    async getUsers(page, size, name, age) {
        try {
            const response = await apiClient.get('/rest/user/page/list', {
                params: {
                    page,
                    size,
                    name,
                    age,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // 添加用户
    async addUser(userData) {
        try {
            const response = await apiClient.post('/rest/user/add', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // 更新用户
    async updateUser(userId, userData) {
        try {
            const response = await apiClient.put(`/rest/user/update/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // 删除用户
    async deleteUser(userId) {
        try {
            const response = await apiClient.delete(`/rest/user/delete/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};
```

#### 修改后的 HTML 文件

在 `<head>` 部分引入 Axios：

```html
<!-- 引入 Axios -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

运行 HTML



然后在 `<script type="module">` 中直接使用 `axios`，而不需要 `import`：

```javascript
// 在 Vue 组件中直接使用 axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});
```

------

### 方法 2：使用相对路径引入 Axios

如果你仍然希望使用 `import`，可以将 `axios` 文件下载到本地，然后通过相对路径引入。

#### 步骤：

1. 下载 `axios.min.js`：

    - 访问 [Axios CDN](https://unpkg.com/axios/dist/axios.min.js)，将文件保存到你的项目目录中，例如 `./lib/axios.min.js`。

2. 修改 `api.js`：

   ```javascript
   import axios from './lib/axios.min.js';
   
   const baseURL = 'http://localhost:8080';
   
   const apiClient = axios.create({
       baseURL,
       headers: {
           'Content-Type': 'application/json',
       },
   });
   
   export default {
       // ...（其余代码不变）
   };
   ```

3. 确保 HTML 文件中正确引入了 `api.js`：

   ```html
   <script src="./api.js" type="module"></script>
   ```

   运行 HTML



------

### 方法 3：使用构建工具（如 Vite 或 Webpack）

如果你正在使用构建工具（如 Vite 或 Webpack），可以直接通过 `npm` 安装 `axios`，然后在代码中使用 `import`。

#### 步骤：

1. 安装 `axios`：

   ```bash
   npm install axios
   ```

2. 在 `api.js` 中直接使用 `import`：

   ```javascript
   import axios from 'axios';
   
   const baseURL = 'http://localhost:8080';
   
   const apiClient = axios.create({
       baseURL,
       headers: {
           'Content-Type': 'application/json',
       },
   });
   
   export default {
       // ...（其余代码不变）
   };
   ```

3. 使用构建工具打包项目：

    - 如果你使用的是 Vite，运行 `npm run build`。
    - 如果你使用的是 Webpack，运行 `npx webpack`。

------

### 方法 4：使用 ES 模块的 CDN 版本

Axios 也提供了 ES 模块的 CDN 版本，可以直接通过 `import` 引入。

#### 修改后的 HTML 文件

```html
<script type="module">
    import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';

    const baseURL = 'http://localhost:8080';

    const apiClient = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // ...（其余代码不变）
</script>
```

运行 HTML



------

### 总结

- 如果你只是简单的项目，推荐使用 **方法 1**（通过 CDN 引入 Axios）。
- 如果你希望模块化开发，推荐使用 **方法 3**（使用构建工具）。
- 如果你不想使用构建工具，但仍然希望使用 `import`，可以使用 **方法 2** 或 **方法 4**。

根据你的项目需求选择合适的方式即可！