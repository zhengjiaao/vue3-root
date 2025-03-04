<template>
  <div>
    <el-button>{{ message }}</el-button>

    <!-- Table Example -->
    <el-table :data="[]">
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="age" label="Age"></el-table-column>
    </el-table>

    <!-- Progress Example -->
    <el-progress :percentage="100" :format="format" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello Element Plus')

const format = (percentage: number) =>
    percentage === 100 ? 'Full' : `${percentage}%`
</script>