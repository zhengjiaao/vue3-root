<script setup lang="ts">
import { ref } from 'vue'
import type { Role } from '@/types'
import { getRoleList, createRole, updateRole, deleteRole } from '@/api/role'
import { ElTable, ElTableColumn, ElPagination, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElDatePicker, ElSelect, ElOption } from 'element-plus'

const tableData = ref<Role[]>([])
const dialogVisible = ref(false)
const isEditing = ref(false)
const currentRole = ref<Partial<Role>>({
  id: 0,
  name: '',
  code: '',
  description: '',
  createTime: ''
})

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 搜索相关
const searchParams = ref({
  name: '',
  code: '',
  startTime: '',
  endTime: ''
})

// 获取角色列表
const fetchRoles = async () => {
  try {
    const res = await getRoleList({
      page: currentPage.value,
      size: pageSize.value,
      name: searchParams.value.name,
      code: searchParams.value.code,
      startTime: searchParams.value.startTime,
      endTime: searchParams.value.endTime
    });
    console.log('接口返回数据:', res); // 调试日志
    if (res && res.data) {
      tableData.value = res.data.list;
      total.value = res.data.total;
    } else {
      console.error('角色列表数据格式不正确:', res);
    }
  } catch (error) {
    console.error('获取角色列表失败:', error);
  }
};

// 提交表单
const submitForm = async () => {
  try {
    if (isEditing.value) {
      await updateRole(currentRole.value.id, currentRole.value)
    } else {
      await createRole(currentRole.value)
    }
    dialogVisible.value = false
    fetchRoles()
  } catch (error) {
    console.error('提交表单失败:', error)
  }
}

// 重置表单
const resetForm = () => {
  currentRole.value = {
    id: 0,
    name: '',
    code: '',
    description: '',
    createTime: ''
  }
  isEditing.value = false
}

// 定义编辑方法
const handleEdit = (row: Role) => {
  currentRole.value = { ...row }
  isEditing.value = true
  dialogVisible.value = true
}

// 定义删除方法
const handleDelete = async (row: Role) => {
  try {
    console.log('删除角色:', row.id)
    await deleteRole(row.id)
    fetchRoles()
  } catch (error) {
    console.error('删除角色失败:', error)
  }
}

// 分页改变事件
const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchRoles()
}

// 搜索事件
const handleSearch = () => {
  currentPage.value = 1 // 重置页码
  fetchRoles()
}

// 重置搜索
const resetSearch = () => {
  searchParams.value = {
    name: '',
    code: '',
    startTime: '',
    endTime: ''
  }
  currentPage.value = 1 // 重置页码
  fetchRoles()
}

fetchRoles()
</script>

<template>
  <div class="role-container">
    <div class="search-bar">
      <el-form :model="searchParams" inline>
        <el-form-item label="角色名称" class="search-item">
          <el-input v-model="searchParams.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" class="search-item">
          <el-input v-model="searchParams.code" placeholder="请输入角色编码" />
        </el-form-item>
        <el-form-item label="创建时间" class="search-item">
          <el-date-picker
            v-model="searchParams.startTime"
            type="datetime"
            placeholder="开始时间"
            value-format="YYYY-MM-DDTHH:mm:ss"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="结束时间" class="search-item">
          <el-date-picker
            v-model="searchParams.endTime"
            type="datetime"
            placeholder="结束时间"
            value-format="YYYY-MM-DDTHH:mm:ss"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item class="search-item">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="dialogVisible = true; resetForm()" class="add-role-button">新增角色</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="角色名称" width="180" />
      <el-table-column prop="code" label="角色编码" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="200">
        <template #default="{ row }">
          {{ new Date(row.createTime).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="prev, pager, next, jumper"
      @current-change="handlePageChange"
      style="margin-top: 20px; text-align: right;"
    />

    <el-dialog v-model="dialogVisible" :title="isEditing ? '编辑角色' : '新增角色'">
      <el-form :model="currentRole" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="currentRole.name" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="currentRole.code" />
        </el-form-item>
        <el-form-item label="创建时间" v-if="isEditing">
          <el-input v-model="currentRole.createTime" disabled />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="currentRole.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false; resetForm()">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.role-container {
  padding: 20px;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
}

.search-bar .el-form-item {
  margin-bottom: 10px;
}

.search-bar .search-item {
  width: 300px; /* 统一表单项宽度 */
}

.add-role-button {
  margin-top: 20px;
}
</style>


