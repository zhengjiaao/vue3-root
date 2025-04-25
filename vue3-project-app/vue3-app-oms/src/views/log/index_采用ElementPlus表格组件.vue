<!--<template>-->
<!--  <div class="log-container">-->
<!--    <div class="search-bar">-->
<!--      <el-form :inline="true">-->
<!--        <el-form-item label="日志类型">-->
<!--          <el-select placeholder="请选择日志类型" v-model="searchForm.type" clearable @change="handleSelectChange" style="width: 150px;">-->
<!--            <el-option label="操作日志" value="operation" />-->
<!--            <el-option label="系统日志" value="system" />-->
<!--            <el-option label="错误日志" value="error" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="时间范围">-->
<!--          <el-date-picker-->
<!--            v-model="searchForm.startTime"-->
<!--            type="datetime"-->
<!--            placeholder="开始时间"-->
<!--          />-->
<!--          - -->
<!--          <el-date-picker-->
<!--            v-model="searchForm.endTime"-->
<!--            type="datetime"-->
<!--            placeholder="结束时间"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="fetchLogs">搜索</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </div>-->

<!--    &lt;!&ndash; 使用 Element Plus 的 el-table &ndash;&gt;-->
<!--    <el-table :data="tableData" border stripe>-->
<!--      <el-table-column prop="createTime" label="时间" width="180" />-->
<!--      <el-table-column label="类型" width="120">-->
<!--        <template #default="scope">-->
<!--          <span :style="{ color: getLogTypeColor(scope.row.type) }">-->
<!--            {{ getLogTypeLabel(scope.row.type) }}-->
<!--          </span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="username" label="操作人" />-->
<!--      <el-table-column prop="action" label="操作内容" />-->
<!--      <el-table-column prop="result" label="结果" />-->
<!--    </el-table>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref, watch } from 'vue'-->
<!--import type { LogItem } from '@/types'-->
<!--import { getLogList } from '@/api/log'-->

<!--const tableData = ref<LogItem[]>([])-->
<!--const searchForm = ref({-->
<!--  type: '', // 初始值为空字符串-->
<!--  startTime: '',-->
<!--  endTime: ''-->
<!--})-->

<!--// 日志类型映射对象-->
<!--const logTypeMap: Record<string, { label: string; color: string }> = {-->
<!--  operation: { label: '操作日志', color: '#409EFF' },-->
<!--  system: { label: '系统日志', color: '#67C23A' },-->
<!--  error: { label: '错误日志', color: '#F56C6C' }-->
<!--}-->

<!--// 根据日志类型返回对应的文本-->
<!--const getLogTypeLabel = (type: string): string => {-->
<!--  return logTypeMap[type]?.label || type-->
<!--}-->

<!--// 根据日志类型返回对应的颜色-->
<!--const getLogTypeColor = (type: string): string => {-->
<!--  return logTypeMap[type]?.color || '#909399' // 默认颜色-->
<!--}-->

<!--const fetchLogs = async () => {-->
<!--  try {-->
<!--    const res = await getLogList(searchForm.value)-->
<!--    console.log('Fetched Logs:', res.data.list); // 添加调试信息-->
<!--    tableData.value = res.data.list-->
<!--  } catch (error) {-->
<!--    console.error('Error fetching logs:', error);-->
<!--  }-->
<!--}-->

<!--watch(tableData, (newData) => {-->
<!--  console.log('Table Data Updated:', newData); // 添加调试信息-->
<!--})-->

<!--const handleSelectChange = (value: string) => {-->
<!--  console.log('Selected Type:', value);-->
<!--};-->

<!--fetchLogs()-->
<!--</script>-->

<!--<style scoped>-->
<!--.log-container {-->
<!--  padding: 20px;-->
<!--}-->

<!--.search-bar {-->
<!--  margin-bottom: 20px;-->
<!--}-->
<!--</style>-->
