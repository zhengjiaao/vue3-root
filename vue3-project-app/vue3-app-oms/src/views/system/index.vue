<script setup lang="ts">
import { ref } from 'vue'
import { ElCard, ElDescriptions, ElDescriptionsItem } from 'element-plus'

const systemInfo = ref({
  name: 'OMS运维系统',
  version: '1.0.0',
  os: 'CentOS 7.9',
  nodeVersion: 'v18.12.1',
  lastBootTime: '2023-07-20 14:30:00',
  status: '正常'
})
</script>

<template>
  <div class="system-container">
    <el-card header="系统信息">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="系统名称">{{ systemInfo.name }}</el-descriptions-item>
        <el-descriptions-item label="系统版本">{{ systemInfo.version }}</el-descriptions-item>
        <el-descriptions-item label="操作系统">{{ systemInfo.os }}</el-descriptions-item>
        <el-descriptions-item label="Node版本">{{ systemInfo.nodeVersion }}</el-descriptions-item>
        <el-descriptions-item label="最后启动时间">{{ systemInfo.lastBootTime }}</el-descriptions-item>
        <el-descriptions-item label="运行状态">
          <el-tag type="success">{{ systemInfo.status }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>
