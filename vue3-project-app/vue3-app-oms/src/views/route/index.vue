<script setup lang="ts">
import { ref } from 'vue'
import type { RouteItem } from '@/types'
import { getRouteList } from '@/api/route'
// 引入 CommonTable 组件
import CommonTable from '@/components/Table/index.vue' // 确保路径正确

const tableData = ref<RouteItem[]>([])

const fetchRoutes = async () => {
  const res = await getRouteList()
  tableData.value = res.data.list
}

fetchRoutes()
</script>

<template>
  <div class="route-container">
    <CommonTable :data="tableData" :columns="[
      { prop: 'path', label: '路径' },
      { prop: 'name', label: '名称' },
      { prop: 'component', label: '组件' },
      { prop: 'meta.title', label: '标题' }
    ]">
      <template #actions>
        <el-button size="small">编辑</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </template>
    </CommonTable>
  </div>
</template>
