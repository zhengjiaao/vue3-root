<script setup lang="ts">
import {ref, reactive} from 'vue'
import axios, {type AxiosError} from 'axios'
import {api} from './api'
import {ElMessage, ElMessageBox} from 'element-plus'
import 'element-plus/dist/index.css'
import {ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn} from 'element-plus'

interface User {
  id: string
  name: string
  email: string
  age?: number
  createTime: string
}

type UserForm = Omit<User, 'id' | 'createTime'>

const users = ref<User[]>([])
const formState = reactive<UserForm & { editingUserId: string | null }>({
  name: '',
  email: '',
  age: undefined,
  editingUserId: null
})

const fetchUsers = async () => {
  try {
    const {data} = await api.get<User[]>('/rest/user/list')
    users.value = data
  } catch (error) {
    handleApiError(error as AxiosError)
  }
}

const createUser = async () => {
  if (!validateForm()) {
    ElMessage.warning('表单验证未通过')
    return
  }

  try {
    const {data} = await api.post<User>('/rest/user/add', formState)
    users.value.push(data)
    resetForm()
    ElMessage.success('用户添加成功')
  } catch (error) {
    handleApiError(error as AxiosError)
  }
}

const editUser = async (id: string) => {
  const user = users.value.find(user => user.id === id)
  if (user) {
    formState.name = user.name
    formState.email = user.email
    formState.age = user.age
    formState.editingUserId = user.id
  }
}

const updateUser = async () => {
  if (!validateForm()) {
    ElMessage.warning('表单验证未通过')
    return
  }

  if (!formState.editingUserId) {
    ElMessage.warning('未找到要编辑的用户')
    return
  }

  try {
    const { data } = await api.put<User>(`/rest/user/update/${formState.editingUserId}`, {
      name: formState.name,
      age: formState.age
    })
    const index = users.value.findIndex(user => user.id === formState.editingUserId)
    if (index !== -1) {
      users.value[index] = data
    }
    resetForm()
    ElMessage.success('用户更新成功')
  } catch (error) {
    handleApiError(error as AxiosError)
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
      handleApiError(error as AxiosError)
    }
  }
}

const validateForm = (): boolean => {
  return formState.name.length > 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)
}

const formatDate = (isoString: string): string => {
  if (!isoString) return '无'
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
    age: undefined,
    editingUserId: null
  })
}

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    ElMessage.error(`API Error ${error.response.status}: ${error.response.data}`)
  } else {
    ElMessage.error(`Network Error: ${error.message}`)
  }
}

const onSubmit = async () => {
  if (formState.editingUserId) {
    await updateUser()
  } else {
    await createUser()
  }
}

fetchUsers()
</script>

<template>
  <div class="user-manager">
    <el-form :model="formState" label-width="80px" @submit.prevent="onSubmit">
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
        <el-button type="primary" native-type="submit">
          {{ formState.editingUserId ? '更新用户' : '添加用户' }}
        </el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

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
          <div style="display: flex; gap: 8px;">
            <el-button type="primary" @click="editUser(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
          </div>
          <!--<div class="action-buttons">-->
          <!--  <el-button type="primary" @click="editUser(scope.row.id)">编辑</el-button>-->
          <!--  <el-button type="danger" @click="deleteUser(scope.row.id)">删除</el-button>-->
          <!--</div>-->
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

.action-buttons {
  display: flex;
  gap: 8px;
}
</style>