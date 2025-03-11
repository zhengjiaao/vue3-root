<template>
  <div>
    <h1>ECharts 示例</h1>
    <div class="chart-container">
      <div ref="chart1" class="chart"></div>
      <div ref="chart2" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chart1 = ref<HTMLDivElement | null>(null);
const chart2 = ref<HTMLDivElement | null>(null);

onMounted(() => {
  initChart1();
  initChart2();
});

const initChart1 = () => {
  if (chart1.value) {
    const myChart = echarts.init(chart1.value);
    const option = {
      title: {
        text: '示例图表 1'
      },
      tooltip: {},
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10]
        }
      ]
    };
    myChart.setOption(option);
  }
};

const initChart2 = () => {
  if (chart2.value) {
    const myChart = echarts.init(chart2.value);
    const option = {
      title: {
        text: '示例图表 2'
      },
      tooltip: {},
      xAxis: {
        data: ['X', 'Y', 'Z', 'W', 'V']
      },
      yAxis: {},
      series: [
        {
          name: '数量',
          type: 'line',
          data: [15, 25, 30, 45, 50]
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
  justify-content: space-around;
}

.chart {
  width: 400px;
  height: 300px;
}
</style>
