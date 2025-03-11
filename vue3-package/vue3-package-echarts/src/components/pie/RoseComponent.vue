<template>
  <div>
    <h1>ECharts 示例-南丁格尔图（玫瑰图）</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chart1 = ref<HTMLDivElement | null>(null); // 图表ref

onMounted(() => {
  initChart1();  // 调用初始化方法
});

const initChart1 = () => { // 新增的初始化方法
  if (chart1.value) {
    const myChart = echarts.init(chart1.value);
    const option = {
      title: {
        text: '图表 1-南丁格尔图（玫瑰图）',
        // left: 'center',
        // top: 'center'
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 100,
              name: 'A'
            },
            {
              value: 200,
              name: 'B'
            },
            {
              value: 300,
              name: 'C'
            },
            {
              value: 400,
              name: 'D'
            },
            {
              value: 500,
              name: 'E'
            }
          ],
          roseType: 'area'
        }
      ]
    };
    myChart.setOption(option);
  }
};

</script>

<style>
.chart-container {
  display: flex;
  flex-wrap: wrap; /* 确保图表可以换行 */
  justify-content: space-around;
}

.chart {
  width: 400px;
  height: 300px;
  margin-bottom: 20px; /* 添加间距 */
}
</style>
