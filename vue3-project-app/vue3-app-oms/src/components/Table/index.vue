<script setup lang="ts">
import type {PropType, VNodeChild} from 'vue'

defineProps({
  data: {
    type: Array as PropType<unknown[]>,
    required: true
  },
  columns: {
    type: Array as PropType<TableColumn[]>,
    required: true
  },
  loading: Boolean
})

interface TableColumn {
  prop: string
  label: string
  width?: number
  formatter?: (row: unknown) => string
  // render?: (row: any) => VNodeChild; // 自定义渲染
}
</script>

<template>
  <el-table :data="data" v-loading="loading">
    <template v-for="col in columns" :key="col.prop">
      <el-table-column v-bind="col">
        <template #default="{ row }" v-if="col.formatter">
          {{ col.formatter(row) }}
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
