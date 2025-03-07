<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { api } from './api'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'
import { ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn, ElPagination } from 'element-plus'

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
const fetchUsers = async () => {
  try {
    const data = await api.get<User[]>('/rest/user/list')
    console.log('Fetched users:', data)
    users.value = data
  } catch (error) {
    handleApiError(error as Error)
  }
}

const createUser = async () => {
  console.log('createUser 被调用')
  if (!validateForm()) {
    console.warn('表单验证未通过')
    ElMessage.warning('表单验证未通过')
    return
  }

  try {
    const data = await api.post<User>('/rest/user/add', formState)
    users.value.push(data)
    resetForm()
    ElMessage.success('用户添加成功')
  } catch (error) {
    handleApiError(error as Error)
  }
}

const deleteUser = async (id: string) => {
  try {
    await ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await api.delete(`/rest/user/delete/${id}`)
    users.value = users.value.filter(user => user.id !== id)
    ElMessage.success('用户删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      handleApiError(error as Error)
    }
  }
}

// ================= 工具方法 =================
const validateForm = (): boolean => {
  return formState.name.length > 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)
}

const formatDate = (isoString: string): string => {
  if (!isoString) return '无' // 处理空值
  const date = new Date(isoString)
  return isNaN(date.getTime()) ? '无效日期' : date.toLocaleDateString('zh-CN', {
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
  ElMessage.error(`Error: ${error.message}`)
}

// 初始化加载数据
fetchUsers()
</script>

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
      <el-table-column prop="age" label="年龄">
        <template #default="{ row }">
          {{ row.age || '无' }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="注册时间">
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p v-else>暂无用户数据</p>
  </div>
</template>

<style scoped>
.user-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>