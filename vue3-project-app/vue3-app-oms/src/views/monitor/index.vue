<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'

onMounted(() => {
  const chart = echarts.init(document.getElementById('chart'))
  chart.setOption({
    title: { text: '系统监控' },
    tooltip: {},
    xAxis: { data: ['CPU', '内存', '磁盘', '网络'] },
    yAxis: {},
    series: [{
      name: '使用率',
      type: 'bar',
      data: [65, 45, 30, 78]
    }]
  })
})
</script>

<template>
  <div class="monitor-container">
    <div id="chart" style="width: 600px; height: 400px;"></div>
  </div>
</template>
