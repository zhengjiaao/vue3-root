<template>
  <div>
    <h1>ECharts 示例-全量引入ECharts</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// 全量引入ECharts
import * as echarts from 'echarts';

const chart1 = ref<HTMLDivElement | null>(null); // 图表ref

onMounted(() => {
  initChart1();  // 调用初始化方法
});

const initChart1 = () => { // 新增的初始化方法
  if (chart1.value) {
    const myChart = echarts.init(chart1.value); // 默认使用 canvas 渲染
    // var myChart = echarts.init(chart1.value, null, {
    //   useDirtyRect: true // canvas 启用脏矩形渲染
    // });
    // const myChart = echarts.init(chart1.value, null, {
    //   renderer: 'svg' // 使用svg渲染
    // });

    // ECharts Getting Started Example
    const option = {
      title: {
        text: '图表 1-全量引入ECharts'
      },
      tooltip: {},
      legend: {
        data: ['sales'],
        top: '30px', // 调整 legend 的 top 位置,
        left: 'center' // 调整 legend 的 left 位置 , 避免被图表title.text遮挡
      },
      xAxis: {
        data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
      },
      yAxis: {},
      series: [
        {
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
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
  height: 400px;
  margin-bottom: 20px; /* 添加间距 */
}
</style>
