<!--<script setup lang="ts">-->
<!--import { ref, watch } from 'vue'-->
<!--import type { LogItem } from '@/types'-->
<!--import { getLogList } from '@/api/log'-->
<!--// 引入 CommonTable 组件-->
<!--import CommonTable from '@/components/Table/index.vue' // 确保路径正确-->

<!--const tableData = ref<LogItem[]>([])-->
<!--const searchForm = ref({-->
<!--  type: '', // 初始值为空字符串-->
<!--  startTime: '',-->
<!--  endTime: ''-->
<!--})-->

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

<!--<template>-->
<!--  <div class="log-container">-->
<!--    <div class="search-bar">-->
<!--      <el-form :inline="true">-->
<!--        <el-form-item label="日志类型">-->
<!--          &lt;!&ndash;<el-select v-model="searchForm.type" clearable :key="searchForm.type" @change="handleSelectChange" style="width: 200px; border: 1px solid red;">&ndash;&gt;-->
<!--          <el-select placeholder="请选择日志类型" v-model="searchForm.type" clearable :key="searchForm.type" @change="handleSelectChange" style="width: 150px;">-->
<!--            &lt;!&ndash;<el-option label="请选择日志类型" :disabled="true" value="" /> &lt;!&ndash; 默认选项 &ndash;&gt;&ndash;&gt;-->
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

<!--    &lt;!&ndash; 使用已导入的 CommonTable 组件 &ndash;&gt;-->
<!--    <CommonTable :data="tableData" :columns="[-->
<!--      { prop: 'createTime', label: '时间', width: 180 },-->
<!--      { prop: 'type', label: '类型' },-->
<!--      { prop: 'username', label: '操作人' },-->
<!--      { prop: 'action', label: '操作内容' },-->
<!--      { prop: 'result', label: '结果' }-->
<!--    ]" />-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--.log-container {-->
<!--  padding: 20px;-->
<!--}-->

<!--.search-bar {-->
<!--  margin-bottom: 20px;-->
<!--}-->
<!--</style>-->
