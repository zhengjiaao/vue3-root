<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
<!--import { ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus'-->
<!--import type { User } from '@/types'-->
<!--import { getUserList, createUser } from '@/api/user'-->
<!--// 引入 CommonTable 组件-->
<!--import CommonTable from '@/components/Table/index.vue' // 确保路径正确-->

<!--const tableData = ref<User[]>([])-->
<!--const dialogVisible = ref(false)-->
<!--const searchForm = ref({-->
<!--  username: '',-->
<!--  status: ''-->
<!--})-->

<!--const formData = ref<Partial<User>>({-->
<!--  username: '',-->
<!--  password: '',-->
<!--  role: 'user',-->
<!--  status: 1-->
<!--})-->

<!--// 获取用户列表-->
<!--const fetchUsers = async () => {-->
<!--  const res = await getUserList(searchForm.value)-->
<!--  tableData.value = res.data.list-->
<!--}-->

<!--// 提交表单-->
<!--const submitForm = async () => {-->
<!--  await createUser(formData.value)-->
<!--  dialogVisible.value = false-->
<!--  fetchUsers()-->
<!--}-->

<!--fetchUsers()-->
<!--</script>-->

<!--<template>-->
<!--  <div class="user-container">-->
<!--    <div class="search-bar">-->
<!--      <el-form :inline="true" :model="searchForm">-->
<!--        <el-form-item label="用户名">-->
<!--          <el-input v-model="searchForm.username" placeholder="请输入用户名" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="状态">-->
<!--          <el-select v-model="searchForm.status" clearable>-->
<!--            <el-option label="启用" value="1" />-->
<!--            <el-option label="禁用" value="0" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="fetchUsers">搜索</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </div>-->

<!--    <div class="operation-bar">-->
<!--      <el-button type="primary" @click="dialogVisible = true">新增用户</el-button>-->
<!--    </div>-->

<!--    &lt;!&ndash; 表格组件使用之前定义的通用Table组件 &ndash;&gt;-->
<!--    <CommonTable :data="tableData" :columns="[-->
<!--      { prop: 'username', label: '用户名' },-->
<!--      { prop: 'role', label: '角色' },-->
<!--      { prop: 'status', label: '状态', formatter: row => row.status ? '启用' : '禁用' }-->
<!--    ]" />-->

<!--    <el-dialog v-model="dialogVisible" title="用户管理">-->
<!--      <el-form :model="formData" label-width="80px">-->
<!--        <el-form-item label="用户名">-->
<!--          <el-input v-model="formData.username" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="密码">-->
<!--          <el-input v-model="formData.password" type="password" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="角色">-->
<!--          <el-select v-model="formData.role">-->
<!--            <el-option label="管理员" value="admin" />-->
<!--            <el-option label="普通用户" value="user" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="状态">-->
<!--          <el-select v-model="formData.status">-->
<!--            <el-option :value="1" label="启用" />-->
<!--            <el-option :value="0" label="禁用" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <template #footer>-->
<!--        <el-button @click="dialogVisible = false">取消</el-button>-->
<!--        <el-button type="primary" @click="submitForm">确认</el-button>-->
<!--      </template>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->
