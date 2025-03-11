<template>
  <div>
    <h1>ECharts 示例-基础饼图</h1>
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
        text: '图表 1-最简单的饼图'
      },
      tooltip: {},
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 335, // value 不需要是百分比数据，ECharts 会根据所有数据的 value ，按比例分配它们在饼图中对应的弧度。
              name: '直接访问'
            },
            {
              value: 234,
              name: '联盟广告'
            },
            {
              value: 1548,
              name: '搜索引擎'
            }
          ]
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
        text: '图表 2-饼图样式设置-饼图的半径'
      },
      tooltip: {},
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 335,
              name: '直接访问'
            },
            {
              value: 234,
              name: '联盟广告'
            },
            {
              value: 1548,
              name: '搜索引擎'
            }
          ],
          radius: '50%' // 饼图的半径，可以通过 series.radius 设置，可以是诸如 '60%' 这样相对的百分比字符串，或是 200 这样的绝对像素数值。
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
        text: '图表 3-饼图样式设置-如果数据和为 0'
      },
      tooltip: {},
      series: [
        {
          type: 'pie',
          // stillShowZeroSum: false, // 设置为 false，则饼图数据为 0 的时候，不显示饼图。
          // label: {
          //   show: false // 设置为 false，则饼图数据为 0 的时候，饼图中扇形对应的标签也不显示。
          // },
          data: [
            {
              value: 0,
              name: '直接访问'
            },
            {
              value: 0,
              name: '联盟广告'
            },
            {
              value: 0,
              name: '搜索引擎'
            }
          ]
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
        text: '图表 3-饼图样式设置-如果数据和为 0，不显示饼图'
      },
      tooltip: {},
      series: [
        {
          type: 'pie',
          stillShowZeroSum: false, // 设置为 false，则饼图数据为 0 的时候，不显示饼图。
          // label: {
          //   show: false // 设置为 false，则饼图数据为 0 的时候，饼图中扇形对应的标签也不显示。
          // },
          data: [
            {
              value: 0,
              name: '直接访问'
            },
            {
              value: 0,
              name: '联盟广告'
            },
            {
              value: 0,
              name: '搜索引擎'
            }
          ]
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
        text: '图表 4-饼图样式设置-如果数据和为 0，不显示饼图和标签'
      },
      tooltip: {},
      series: [
        {
          type: 'pie',
          // stillShowZeroSum: false, // 设置为 false，则饼图数据为 0 的时候，不显示饼图。
          label: {
            show: false // 设置为 false，则饼图数据为 0 的时候，饼图中扇形对应的标签也不显示。
          },
          data: [
            {
              value: 0,
              name: '直接访问'
            },
            {
              value: 0,
              name: '联盟广告'
            },
            {
              value: 0,
              name: '搜索引擎'
            }
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
