<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
<!--import type { Role } from '@/types'-->
<!--import { getRoleList, createRole, updateRole, deleteRole } from '@/api/role'-->
<!--// 引入 CommonTable 组件-->
<!--import CommonTable from '@/components/Table/index.vue' // 确保路径正确-->

<!--const tableData = ref<Role[]>([])-->
<!--const dialogVisible = ref(false)-->
<!--const isEditing = ref(false)-->
<!--const currentRole = ref<Partial<Role>>({-->
<!--  id: 0,-->
<!--  name: '',-->
<!--  code: '',-->
<!--  description: ''-->
<!--})-->

<!--// 获取角色列表-->
<!--const fetchRoles = async () => {-->
<!--  try {-->
<!--    const res = await getRoleList();-->
<!--    console.log('接口返回数据:', res); // 调试日志-->
<!--    if (res && Array.isArray(res.data.list)) {-->
<!--      tableData.value = res.data.list;-->
<!--    } else {-->
<!--      console.error('角色列表数据格式不正确:', res);-->
<!--    }-->
<!--  } catch (error) {-->
<!--    console.error('获取角色列表失败:', error);-->
<!--  }-->
<!--};-->

<!--// 提交表单-->
<!--const submitForm = async () => {-->
<!--  try {-->
<!--    if (isEditing.value) {-->
<!--      await updateRole(currentRole.value.id, currentRole.value)-->
<!--    } else {-->
<!--      await createRole(currentRole.value)-->
<!--    }-->
<!--    dialogVisible.value = false-->
<!--    fetchRoles()-->
<!--  } catch (error) {-->
<!--    console.error('提交表单失败:', error)-->
<!--  }-->
<!--}-->

<!--// 重置表单-->
<!--const resetForm = () => {-->
<!--  currentRole.value = {-->
<!--    id: 0,-->
<!--    name: '',-->
<!--    code: '',-->
<!--    description: ''-->
<!--  }-->
<!--  isEditing.value = false-->
<!--}-->

<!--// 定义编辑方法-->
<!--const handleEdit = (row: Role) => {-->
<!--  currentRole.value = { ...row }-->
<!--  isEditing.value = true-->
<!--  dialogVisible.value = true-->
<!--}-->

<!--// 定义删除方法-->
<!--const handleDelete = async (row: Role) => {-->
<!--  try {-->
<!--    await deleteRole(row.id)-->
<!--    fetchRoles()-->
<!--  } catch (error) {-->
<!--    console.error('删除角色失败:', error)-->
<!--  }-->
<!--}-->

<!--fetchRoles()-->
<!--</script>-->

<!--<template>-->
<!--  <div class="role-container">-->
<!--    <div class="operation-bar">-->
<!--      <el-button type="primary" @click="dialogVisible = true; resetForm()">新增角色</el-button>-->
<!--    </div>-->

<!--    <CommonTable :data="tableData" :columns="[-->
<!--      { prop: 'name', label: '角色名称' },-->
<!--      { prop: 'code', label: '角色编码' },-->
<!--      { prop: 'description', label: '描述' }-->
<!--    ]">-->
<!--      &lt;!&ndash; 使用正确的插槽名称和 row 参数 &ndash;&gt;-->
<!--      <template #actions="{ row }">-->
<!--        <el-button size="small" @click="handleEdit(row)">编辑</el-button>-->
<!--        <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>-->
<!--      </template>-->
<!--    </CommonTable>-->

<!--    <el-dialog v-model="dialogVisible" :title="isEditing ? '编辑角色' : '新增角色'">-->
<!--      <el-form :model="currentRole" label-width="80px">-->
<!--        <el-form-item label="角色名称">-->
<!--          <el-input v-model="currentRole.name" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="角色编码">-->
<!--          <el-input v-model="currentRole.code" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="描述">-->
<!--          <el-input v-model="currentRole.description" type="textarea" />-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <template #footer>-->
<!--        <el-button @click="dialogVisible = false; resetForm()">取消</el-button>-->
<!--        <el-button type="primary" @click="submitForm">确认</el-button>-->
<!--      </template>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--.role-container {-->
<!--  padding: 20px;-->
<!--}-->

<!--.operation-bar {-->
<!--  margin-bottom: 20px;-->
<!--}-->
<!--</style>-->
