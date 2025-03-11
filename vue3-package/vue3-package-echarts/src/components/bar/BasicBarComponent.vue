<template>
  <div>
    <h1>ECharts 示例-基础柱状图</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
      <div ref="chart2" class="chart"></div>
      <div ref="chart3" class="chart"></div>
      <div ref="chart4" class="chart"></div>
      <div ref="chart5" class="chart"></div>
      <div ref="chart6" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chart1 = ref<HTMLDivElement | null>(null); // 图表ref
const chart2 = ref<HTMLDivElement | null>(null);
const chart3 = ref<HTMLDivElement | null>(null);
const chart4 = ref<HTMLDivElement | null>(null);
const chart5 = ref<HTMLDivElement | null>(null);
const chart6 = ref<HTMLDivElement | null>(null);

onMounted(() => {
  initChart1();  // 调用初始化方法
  initChart2();
  initChart3();
  initChart4();
  initChart5();
  initChart6();
});

const initChart1 = () => { // 新增的初始化方法
  if (chart1.value) {
    const myChart = echarts.init(chart1.value);
    const option = {
      title: {
        text: '图表 1-最简单的柱状图'
      },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [23, 24, 18, 25, 27, 28, 25]
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
        text: '图表 2-多系列的柱状图'
      },
      tooltip: {},
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [23, 24, 18, 25, 27, 28, 25]
        },
        {
          type: 'bar',
          data: [26, 24, 18, 22, 23, 20, 27]
        }
      ]
    };
    myChart.setOption(option);
  }
};

const initChart3 = () => {
  if (chart3.value) {
    const myChart = echarts.init(chart3.value);
    const option = {
      title: {
        text: '图表 3-柱状图样式设置-柱条样式'
      },
      tooltip: {},
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [
            10,
            22,
            28,
            {
              value: 43,
              // 设置单个柱子的样式
              itemStyle: {
                color: '#91cc75',
                shadowColor: '#91cc75',
                borderType: 'dashed',
                opacity: 0.5
              }
            },
            49
          ],
          itemStyle: {
            barBorderRadius: 5,
            borderWidth: 1,
            borderType: 'solid',
            borderColor: '#73c0de',
            shadowColor: '#5470c6',
            shadowBlur: 3
          }
        }
      ]
    };
    myChart.setOption(option);
  }
};

const initChart4 = () => {
  if (chart4.value) {
    const myChart = echarts.init(chart4.value);
    const option = {
      title: {
        text: '图表 4-多系列的柱状图-柱条宽度和高度'
      },
      tooltip: {},
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [10, 22, 28, 43, 49],
          barWidth: '20%'
        }
      ]
    };
    myChart.setOption(option);
  }
};

const initChart5 = () => {
  if (chart5.value) {
    const myChart = echarts.init(chart5.value);
    const option = {
      title: {
        text: '图表 5-多系列的柱状图-柱条间距'
      },
      tooltip: {},
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [23, 24, 18, 25, 18],
          barGap: '20%',
          barCategoryGap: '40%'
        },
        {
          type: 'bar',
          data: [12, 14, 9, 9, 11]
        }
      ]
    };
    myChart.setOption(option);
  }
};

const initChart6 = () => {
  if (chart6.value) {
    const myChart = echarts.init(chart6.value);
    const option = {
      title: {
        text: '图表 6-多系列的柱状图-为柱条添加背景色'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
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
