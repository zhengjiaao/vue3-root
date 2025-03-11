<template>
  <div>
    <h1>ECharts 示例-圆环图</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
      <div ref="chart2" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chart1 = ref<HTMLDivElement | null>(null); // 图表ref
const chart2 = ref<HTMLDivElement | null>(null); // 图表ref

onMounted(() => {
  initChart1();  // 调用初始化方法
  initChart2();  // 调用初始化方法
});

const initChart1 = () => { // 新增的初始化方法
  if (chart1.value) {
    const myChart = echarts.init(chart1.value);
    const option = {
      title: {
        text: '图表 1-基础圆环图',
        left: 'center',
        top: 'center'
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 335,
              name: 'A'
            },
            {
              value: 234,
              name: 'B'
            },
            {
              value: 1548,
              name: 'C'
            }
          ],
          radius: ['40%', '70%']
        }
      ]
    };
    myChart.setOption(option);
  }
};

const initChart2 = () => { // 新增的初始化方法
  if (chart2.value) {
    const myChart = echarts.init(chart2.value);
    const option = {
      title: {
        text: '图表 2-在圆环图中间显示高亮扇形对应的文字'
      },
      legend: {
        orient: 'vertical', // 垂直
        top: '30px', // 调整 legend 的 top 位置, 避免和 title 重叠
        x: 'left', // 靠左
        // left: 'center', // 居中
        data: ['A', 'B', 'C', 'D', 'E']
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'], // 设置圆环大小
          avoidLabelOverlap: false, // 避免标签重叠
          label: {
            show: false, // 不显示标签
            position: 'center' // 标签位置在圆心
          },
          labelLine: {
            show: false
          },
          emphasis: {
            label: {
              show: true, // 显示标签
              fontSize: '30',
              fontWeight: 'bold' // 显示的标签字体加粗
            }
          },
          data: [
            { value: 335, name: 'A' },
            { value: 310, name: 'B' },
            { value: 234, name: 'C' },
            { value: 135, name: 'D' },
            { value: 1548, name: 'E' }
          ]
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
