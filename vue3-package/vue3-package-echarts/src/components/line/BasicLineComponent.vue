<template>
  <div>
    <h1>ECharts 示例-基础折线图</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
      <div ref="chart2" class="chart"></div>
      <div ref="chart3" class="chart"></div>
      <div ref="chart4" class="chart"></div>
      <div ref="chart5" class="chart"></div>
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

onMounted(() => {
  initChart1();  // 调用初始化方法
  initChart2();
  initChart3();
  initChart4();
  initChart5();
});

const initChart1 = () => { // 新增的初始化方法
  if (chart1.value) {
    const myChart = echarts.init(chart1.value);
    const option = {
      title: {
        text: '图表 1-基础折线图'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['A', 'B', 'C']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150],
          type: 'line'
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
        text: '图表 2-笛卡尔坐标系中的折线图'
      },
      tooltip: {},
      xAxis: {},
      yAxis: {},
      series: [
        {
          data: [
            [20, 120],
            [50, 200],
            [40, 50]
          ],
          type: 'line'
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
        text: '图表 3-折线图样式设置-折线的样式'
      },
      tooltip: {},
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {},
      series: [
        {
          data: [10, 22, 28, 23, 19],
          type: 'line',
          lineStyle: { // 数据点的样式,指定颜色、线宽、折线类型、阴影、不透明度等
            normal: {
              color: 'green',
              width: 4,
              type: 'dashed'
            }
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
        text: '图表 4-在数据点处显示数值'
      },
      tooltip: {},
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {},
      series: [
        {
          data: [10, 22, 28, 23, 19],
          type: 'line',
          label: {
            show: true,
            position: 'bottom',
            textStyle: {
              fontSize: 20
            }
          }
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
        text: '图表 5-空数据'
      },
      tooltip: {},
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {},
      series: [
        {
          data: [0, 22, '-', 23, 19], // 注：“空”数据与取值为 0 的数据。
          type: 'line'
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
