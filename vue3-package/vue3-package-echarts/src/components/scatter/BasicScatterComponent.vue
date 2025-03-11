<template>
  <div>
    <h1>ECharts 示例-基础散点图</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
      <div ref="chart2" class="chart"></div>
      <div ref="chart3" class="chart"></div>
      <div ref="chart4" class="chart"></div>
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

onMounted(() => {
  initChart1();  // 调用初始化方法
  initChart2();
  initChart3();
  initChart4();
});

const initChart1 = () => { // 新增的初始化方法
  if (chart1.value) {
    const myChart = echarts.init(chart1.value);
    const option = {
      title: {
        text: '图表 1-最简单的散点图' // 横坐标为类目轴、纵坐标为数值轴的最简单的散点图配置
      },
      tooltip: {},
      xAxis: {
        data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      },
      yAxis: {},
      series: [
        {
          type: 'scatter',
          data: [220, 182, 191, 234, 290, 330, 310]
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
        text: '图表 2-笛卡尔坐标系下的散点图'
      },
      tooltip: {},
      xAxis: {},
      yAxis: {},
      series: [
        {
          type: 'scatter',
          data: [
            [10, 5],
            [0, 8],
            [6, 10],
            [2, 12],
            [8, 9]
          ]
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
        text: '图表 3-散点图样式设置-图形的形状' // 将图形设置为矢量爱心形状的方式
      },
      tooltip: {},
      xAxis: {
        data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      },
      yAxis: {},
      series: [
        {
          type: 'scatter',
          data: [220, 182, 191, 234, 290, 330, 310],
          symbolSize: 20,
          symbol:
              'path://M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014 C52.216,18.553,51.97,16.611,51.911,16.242z'
        } // 设置为矢量爱心形状的方式, 使用矢量图形的好处是，图片不会因为缩放而产生锯齿或模糊，并且通常而言比图片形式的文件大小更小。
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
        text: '图表 3-散点图样式设置-图形的大小'
      },
      tooltip: {},
      xAxis: {
        data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      },
      yAxis: {},
      series: [
        {
          type: 'scatter',
          data: [220, 182, 191, 234, 290, 330, 310],
          // symbolSize: function(value) {
          //   return value / 10; // 根据数据值设置大小
          // }
          symbolSize: function() {
            return 20; // 设置为固定大小
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
