<template>
  <div class="mock-demo">
    <h1>Mock.js 示例</h1>

    <div class="section">
      <button @click="getUsers">获取用户列表</button>
      <ul v-if="users.length">
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.age }}岁 - {{ user.address }}
        </li>
      </ul>
    </div>

    <div class="section">
      <input v-model="userId" placeholder="输入用户ID">
      <button @click="getUserDetail">获取用户详情</button>
      <div v-if="userDetail">
        <p>姓名: {{ userDetail.name }}</p>
        <p>年龄: {{ userDetail.age }}</p>
        <p>部门: {{ userDetail.department }}</p>
      </div>
    </div>

    <div class="section">
      <button @click="createUser">创建新用户</button>
      <div v-if="newUserId">新用户ID: {{ newUserId }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

interface User {
  id: number
  name: string
  age: number
  address: string
}

interface UserDetail {
  id: string
  name: string
  age: number
  department: string
  joinDate: string
  salary: number
}

const users = ref<User[]>([])
const userDetail = ref<UserDetail | null>(null)
const newUserId = ref<string>('')
const userId = ref<string>('1')

const getUsers = async () => {
  try {
    const res = await axios.get('/api/users')
    users.value = res.data.list
  } catch (error) {
    console.error('获取用户列表失败:', error)
  }
}

const getUserDetail = async () => {
  try {
    const res = await axios.get(`/api/users/${userId.value}`)
    userDetail.value = res.data
  } catch (error) {
    console.error('获取用户详情失败:', error)
  }
}

const createUser = async () => {
  try {
    const res = await axios.post('/api/users', {
      name: 'New User',
      age: 25
    })
    newUserId.value = res.data.data.id
  } catch (error) {
    console.error('创建用户失败:', error)
  }
}
</script>

<style scoped>
.mock-demo {
  padding: 20px;
}
.section {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
}
button {
  margin-right: 10px;
  padding: 8px 15px;
}
input {
  padding: 8px;
  margin-right: 10px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}
</style>