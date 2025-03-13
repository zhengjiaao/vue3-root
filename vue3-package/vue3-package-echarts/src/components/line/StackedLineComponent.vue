<template>
  <div>
    <h1>ECharts 示例-堆叠柱状图</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
      <div ref="chart2" class="chart"></div>
      <div ref="chart3" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chart1 = ref<HTMLDivElement | null>(null); // 图表ref
const chart2 = ref<HTMLDivElement | null>(null); // 图表ref
const chart3 = ref<HTMLDivElement | null>(null); // 图表ref

onMounted(() => {
  initChart1();  // 调用初始化方法
  initChart2();  // 调用初始化方法
  initChart3();  // 调用初始化方法
});

const initChart1 = () => { // 新增的初始化方法
  if (chart1.value) {
    const myChart = echarts.init(chart1.value);
    const option = {
      title: {
        text: '图表 1-堆叠柱状图'
      },
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {},
      series: [
        {
          data: [10, 22, 28, 43, 49],
          type: 'line',
          stack: 'x'
        },
        {
          data: [5, 4, 3, 5, 10],
          type: 'line',
          stack: 'x'
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
        text: '图表 2-堆叠柱状图-使用区域填充色以表明堆叠的情况'
      },
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {},
      series: [
        {
          data: [10, 22, 28, 43, 49],
          type: 'line',
          stack: 'x',
          areaStyle: {}
        },
        {
          data: [5, 4, 3, 5, 10],
          type: 'line',
          stack: 'x',
          areaStyle: {}
        }
      ]
    };
    myChart.setOption(option);
  }
};

const initChart3 = () => { // 新增的初始化方法
  if (chart3.value) {
    const myChart = echarts.init(chart3.value);
    const option = {
      title: {
        text: 'Stacked Area Chart 堆叠面积图',
        textStyle: {
          fontSize: 20, // 设置字体大小
          fontWeight: 'bold', // 设置字体粗细
          color: '#333' // 设置字体颜色
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        top: '30px', // 调整 legend 的 top 位置, 避免和 title 重叠
        x: 'left', // 靠左
        textStyle: {
          fontSize: 8, // 设置字体大小
          fontWeight: 'bold', // 设置字体粗细
          color: '#333' // 设置字体颜色
        },
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
      },
      toolbox: {
        feature: {
          saveAsImage: {
            // show: true, // 显示保存为图片的按钮，默认true
            // iconStyle: {
            //   borderColor: '#333' // 设置保存按钮的边框颜色
            // }
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
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
