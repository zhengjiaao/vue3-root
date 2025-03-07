<script setup lang="ts">
// 用户管理组件实现 (TypeScript + <script setup>)
import {ref, reactive} from 'vue'
import {api} from './api'

// ================= 类型定义 =================
interface User {
  id: string
  name: string
  email: string
  age?: number
  createTime: string
}

type UserForm = Omit<User, 'id' | 'createTime'>

// ================= 响应式数据 =================
const users = ref<User[]>([])
const formState = reactive<UserForm>({
  name: '',
  email: '',
  age: undefined
})

// ================= API 操作 =================
// API 请求示例，使用 axios 发起 GET 请求
const fetchUsers = async () => {
  try {
    // const data = await api.get<User[]>('/rest/user/list')
    // or
    // const data = await fetch('http://localhost:8080/rest/user/list').then(response => response.json())
    // or
    // const  data  = await fetch('https://your-api-endpoint.com/rest/user/list', {
    //   headers: {
    //     Authorization: `Bearer ${yourToken}`
    //   }
    // })
    // or
    // const response = await axios.get<User[]>('http://localhost:8080/rest/user/list', {
    // const {data} = await axios.get<User[]>('http://localhost:8080/rest/user/list', {
      const data = await fetch('http://localhost:8080/rest/user/list', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
        }
    });
    console.log('Fetched users:', data); // 调试日志
    users.value = await data.json()
  } catch (error) {
    handleApiError(error as Error);
  }
}

const createUser = async () => {
  console.log('createUser 被调用'); // 确认函数是否被触发
  if (!validateForm()) {
    console.warn('表单验证未通过');
    return;
  }

  try {
    const data = await api.post<User>('/rest/user/add', formState);
    users.value.push(data);
    resetForm();
  } catch (error) {
    handleApiError(error as Error);
  }
};


const deleteUser = async (id: string) => {
  try {
    await api.delete(`/rest/user/delete/${id}`);
    users.value = users.value.filter((user) => user.id !== id);
  } catch (error) {
    handleApiError(error as Error);
  }
};

// ================= 工具方法 =================
const validateForm = (): boolean => {
  return formState.name.length > 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)
}

const formatDate = (isoString: string): string => {
  return new Date(isoString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const resetForm = () => {
  Object.assign(formState, {
    name: '',
    email: '',
    age: undefined
  })
}

const handleApiError = (error: Error) => {
  console.error('API Error:', error.message);
};

// 初始化加载数据
fetchUsers()
</script>

<template>
  <div class="user-manager">
    <!-- 用户表单-->
    <!-- id、name 可选地-->
    <form @submit.prevent="createUser">
      <input
          id="name"
          name="name"
          v-model="formState.name"
          placeholder="姓名"
          required
          minlength="3"
      >
      <input
          v-model="formState.email"
          type="email"
          placeholder="邮箱"
          required
      >
      <input
          v-model.number="formState.age"
          type="number"
          min="0"
          placeholder="年龄（可选）"
      >
      <button type="submit">添加用户</button>
    </form>

    <!-- 用户列表 -->
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">
        <div class="user-info">
          <h3>{{ user.name }}</h3>
          <p>邮箱: {{ user.email }}</p>
          <p v-if="user.age">年龄: {{ user.age }}</p>
          <small>注册时间: {{ formatDate(user.createTime) }}</small>
        </div>
        <button @click="deleteUser(user.id)">删除</button>
      </li>
    </ul>
    <p v-else>暂无用户数据</p>
  </div>
</template>

<style scoped>
/* 样式保持不变 */
</style>