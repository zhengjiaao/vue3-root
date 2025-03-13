<template>
  <div>
    <h1>ECharts 示例-自定义雷达图</h1>
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
        text: '图表 1-自定义的雷达图'
      },
      legend: {
        selectedMode: false,
        top: '30px', // 调整 legend 的 top 位置, 避免和 title 重叠
        x: 'left', // 靠左
        data: ['Allocated Budget', 'Actual Spending']
      },
      color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
      radar: [
        {
          indicator: [
            { text: 'Indicator1' },
            { text: 'Indicator2' },
            { text: 'Indicator3' },
            { text: 'Indicator4' },
            { text: 'Indicator5' }
          ],
          center: ['25%', '50%'],
          radius: 120,
          startAngle: 90,
          splitNumber: 4,
          shape: 'circle',
          axisName: {
            formatter: '【{value}】',
            color: '#428BD4'
          },
          splitArea: {
            areaStyle: {
              color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(211, 253, 250, 0.8)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(211, 253, 250, 0.8)'
            }
          }
        },
        {
          indicator: [
            { text: 'Indicator1', max: 150 },
            { text: 'Indicator2', max: 150 },
            { text: 'Indicator3', max: 150 },
            { text: 'Indicator4', max: 120 },
            { text: 'Indicator5', max: 108 },
            { text: 'Indicator6', max: 72 }
          ],
          center: ['75%', '50%'],
          radius: 120,
          axisName: {
            color: '#fff',
            backgroundColor: '#666',
            borderRadius: 3,
            padding: [3, 5]
          }
        }
      ],
      series: [
        {
          type: 'radar',
          emphasis: {
            lineStyle: {
              width: 4
            }
          },
          data: [
            {
              value: [100, 8, 0.4, -80, 2000],
              name: 'Data A'
            },
            {
              value: [60, 5, 0.3, -100, 1500],
              name: 'Data B',
              areaStyle: {
                color: 'rgba(255, 228, 52, 0.6)'
              }
            }
          ]
        },
        {
          type: 'radar',
          radarIndex: 1,
          data: [
            {
              value: [120, 118, 130, 100, 99, 70],
              name: 'Data C',
              symbol: 'rect',
              symbolSize: 12,
              lineStyle: {
                type: 'dashed'
              },
              label: {
                show: true,
                formatter: function (params: any) {
                  return params.value as string;
                }
              }
            },
            {
              value: [100, 93, 50, 90, 70, 60],
              name: 'Data D',
              areaStyle: {
                color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                  {
                    color: 'rgba(255, 145, 124, 0.1)',
                    offset: 0
                  },
                  {
                    color: 'rgba(255, 145, 124, 0.9)',
                    offset: 1
                  }
                ])
              }
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap; /* 确保图表可以换行 */
  justify-content: space-around;
}

.chart {
  width: 800px;
  height: 600px;
  margin-bottom: 20px; /* 添加间距 */
}
</style>
