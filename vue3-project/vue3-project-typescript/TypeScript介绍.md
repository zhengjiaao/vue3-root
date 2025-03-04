在 Vue 3 的 Composition API 中，`<script setup lang="ts">` 和 `<script setup>` 的核心区别体现在 **TypeScript 支持** 上。以下是详细对比：

------

### 1. `<script setup>` (纯 JavaScript 模式)

```vue
<script setup>
// 纯 JavaScript 写法
const count = ref(0)
const increment = () => count.value++
</script>
```

**特点**：

- 仅支持 JavaScript 语法
- 不需要任何额外配置
- 无法使用类型检查
- 适合小型项目或快速原型开发

------

### 2. `<script setup lang="ts">` (TypeScript 模式)

```vue
<script setup lang="ts">
// TypeScript 写法
const count = ref<number>(0) // 显式类型标注
const increment = (step: number): void => {
  count.value += step
}
</script>
```

**特点**：

- 支持完整的 TypeScript 语法
- 需要 TypeScript 开发环境
- 提供类型检查和智能提示
- 适合中大型项目和企业级应用

------

### 关键差异对照表

| 特性                | `<script setup>` | `<script setup lang="ts">` |
| :------------------ | :--------------- | :------------------------- |
| 类型检查            | ❌ 不支持         | ✅ 支持                     |
| 泛型支持            | ❌ 不支持         | ✅ 支持                     |
| 接口/类型定义       | ❌ 不支持         | ✅ 支持                     |
| 组件 Props 类型声明 | 使用运行时校验   | 编译时类型校验             |
| IDE 智能提示        | 基础提示         | 完整类型推导               |
| 代码可维护性        | 一般             | 更优                       |

------

### 使用 TypeScript 的必备配置

1. 安装依赖：

```bash
npm install -D typescript @vue/tsconfig
```

1. `tsconfig.json` 示例：

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "strict": true,
    "moduleResolution": "Bundler",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "types": ["vite/client"],
    "jsx": "preserve"
  },
  "vueCompilerOptions": {
    "target": 3.4
  }
}
```

1. Vite 配置 (`vite.config.ts`):

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue({
    script: {
      defineModel: true,
      propsDestructure: true
    }
  })]
})
```

------

### 最佳实践建议

1. **混合使用场景**：

```vue
<script>
// 非 setup 的 TypeScript 逻辑
interface User {
  id: number
  name: string
}
</script>

<script setup lang="ts">
// Setup 区域
const user = ref<User>({ id: 1, name: 'Alice' })
</script>
```

1. **类型导入技巧**：

```typescript
// 单独的类型文件 types/user.d.ts
export interface User {
  id: number
  name: string
  email?: string
}

// 组件中使用
import type { User } from '../types/user'
```

1. **Props 类型声明**：

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  items: Array<{ id: number; text: string }>
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})
</script>
```

------

### 常见问题解决

1. **TS2307错误** (找不到模块)：

```bash
npm install -D @types/node
```

1. **TS类型扩展** (增强 Vue 类型)：

```typescript
// vue.d.ts
declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: {
      currency: (value: number) => string
    }
  }
}
```

1. **全局类型定义**：

```typescript
// components.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
```

选择是否使用 `lang="ts"` 主要取决于项目类型：

- 快速原型开发 → 纯 JavaScript
- 长期维护项目 → TypeScript
- 团队协作项目 → 强制 TypeScript
