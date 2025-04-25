<template>
  <div class="user-container">
    <div class="search-bar">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable style="width: 150px;">
            <el-option label="启用" value="1"/>
            <el-option label="禁用" value="-1"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchUsers">搜索</el-button>
          <el-button @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="operation-bar">
      <el-button type="primary" @click="showAddUserDialog">新增用户</el-button>
    </div>

    <!-- 使用 Element Plus 的 el-table -->
    <el-table :data="tableData" border stripe style="width: 100%" fit>
      <el-table-column prop="username" label="用户名" min-width="120"/>
      <el-table-column prop="role" label="角色" min-width="80"/>
      <el-table-column prop="createTime" label="创建时间" min-width="120"/>
      <el-table-column label="状态" min-width="80">
        <template #default="scope">
          <span :style="{ color: scope.row.status === 1 ? '#67C23A' : '#F56C6C' }">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150" fixed="right">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            :disabled="scope.row.isBuiltIn"
            @click="showChangePasswordDialog(scope.row)"
          >
            修改密码
          </el-button>
          <el-button
            size="small"
            type="primary"
            :disabled="scope.row.isBuiltIn"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            :disabled="scope.row.isBuiltIn"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEditing ? '编辑用户' : '新增用户'">
      <el-form :model="formData" :rules="rules" label-width="80px" ref="userForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username"/>
        </el-form-item>
        <el-form-item label="密码" v-if="!isEditing" prop="password">
          <el-input v-model="formData.password" type="password"/>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formData.role">
            <el-option label="管理员" value="admin"/>
            <el-option label="普通用户" value="user"/>
            <el-option label="审计用户" value="auditor"/>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formData.status">
            <el-option :value="1" label="启用"/>
            <el-option :value="-1" label="禁用"/>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false; resetForm()">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="changePasswordDialogVisible" title="修改密码">
      <el-form :model="changePasswordForm" :rules="changePasswordRules" label-width="100px" ref="changePasswordFormRef">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="changePasswordForm.oldPassword" type="password"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="changePasswordForm.newPassword" type="password"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="changePasswordDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleChangePassword">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import {
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElMessageBox
} from 'element-plus'
import type { User } from '@/types'
import { getUserList, createUser, updateUser, deleteUser, changePassword } from '@/api/user'

const tableData = ref<User[]>([])
const dialogVisible = ref(false)
const isEditing = ref(false)
const searchForm = ref({
  username: '',
  status: ''
})

const formData = ref<Partial<User>>({
  id: 0,
  username: '',
  password: '',
  role: 'user',
  status: 1
})

const changePasswordDialogVisible = ref(false)
const changePasswordForm = ref({
  id: 0,
  oldPassword: '',
  newPassword: ''
})

const changePasswordRules = ref({
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
  ]
})

const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, message: '用户名长度至少为6位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
  ]
})

const userForm = ref<InstanceType<typeof ElForm>>()

// 获取用户列表
const fetchUsers = async () => {
  const res = await getUserList(searchForm.value)
  tableData.value = res.data.list
}

// 提交表单
const submitForm = async () => {
  try {
    await userForm.value?.validate()
    if (isEditing.value) {
      await updateUser(formData.value.id, formData.value)
    } else {
      await createUser(formData.value)
    }
    dialogVisible.value = false
    fetchUsers()
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 重置表单
const resetForm = () => {
  formData.value = {
    id: 0,
    username: '',
    password: '',
    role: 'user',
    status: 1
  }
  isEditing.value = false
}

// 重置搜索表单
const resetSearchForm = () => {
  searchForm.value = {
    username: '',
    status: ''
  }
  fetchUsers()
}

// 显示新增用户对话框
const showAddUserDialog = () => {
  resetForm()
  userForm.value?.resetFields() // 重置表单，否则会保留上次表单规则验证状态及填写的数据
  dialogVisible.value = true
}

// 编辑用户
const handleEdit = (row: User) => {
  if (row.isBuiltIn) {
    ElMessageBox.alert('内置用户不能编辑', '提示', {
      confirmButtonText: '确定',
      type: 'warning'
    })
    return
  }
  formData.value = { ...row }
  isEditing.value = true
  dialogVisible.value = true
}

// 删除用户
const handleDelete = (row: User) => {
  if (row.isBuiltIn) {
    ElMessageBox.alert('内置用户不能删除', '提示', {
      confirmButtonText: '确定',
      type: 'warning'
    })
    return
  }
  ElMessageBox.confirm('确定要删除该用户吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await deleteUser(row.id)
      fetchUsers()
      ElMessageBox.alert('删除成功', '提示', {
        confirmButtonText: '确定',
        type: 'success'
      })
    } catch (error) {
      console.error('删除用户失败:', error)
      ElMessageBox.alert('删除失败', '提示', {
        confirmButtonText: '确定',
        type: 'error'
      })
    }
  }).catch(() => {
    ElMessageBox.alert('已取消删除', '提示', {
      confirmButtonText: '确定',
      type: 'info'
    })
  })
}

const changePasswordFormRef = ref<InstanceType<typeof ElForm>>()

// 显示修改密码对话框
const showChangePasswordDialog = (row: User) => {
  if (row.isBuiltIn) {
    ElMessageBox.alert('内置用户不能修改密码', '提示', {
      confirmButtonText: '确定',
      type: 'warning'
    })
    return
  }
  changePasswordForm.value = {
    id: row.id,
    oldPassword: '',
    newPassword: ''
  }
  changePasswordFormRef.value?.resetFields() // 重置表单，否则会保留上次表单规则验证状态及填写的数据
  changePasswordDialogVisible.value = true
}


// 处理修改密码
const handleChangePassword = async () => {

  await changePasswordFormRef.value?.validate()

  if (!changePasswordForm.value.oldPassword || !changePasswordForm.value.newPassword) {
    ElMessageBox.alert('请输入旧密码和新密码', '提示', {
      confirmButtonText: '确定',
      type: 'warning'
    })
    return
  }

  try {
    await changePassword({
      id: changePasswordForm.value.id,
      oldPassword: changePasswordForm.value.oldPassword,
      newPassword: changePasswordForm.value.newPassword
    })
    changePasswordDialogVisible.value = false
    ElMessageBox.alert('密码修改成功', '提示', {
      confirmButtonText: '确定',
      type: 'success'
    })
  } catch (error) {
    const err = error as Error
    const errMsg = '修改密码失败：' + err.message || '未知错误'
    console.error(errMsg)
    ElMessageBox.alert(errMsg, '提示', {
      confirmButtonText: '确定',
      type: 'error'
    })
  }
}

fetchUsers()
</script>


<style scoped>
.user-container {
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar .el-form-item {
  margin-bottom: 10px;
}

.operation-bar {
  margin-bottom: 20px;
}

.el-dialog {
  width: 400px;
}

.el-dialog .el-form-item {
  margin-bottom: 20px;
}
</style>
