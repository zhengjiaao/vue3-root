<template>
  <div>
    <h1>ECharts 示例-动态排序柱状图</h1>
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
let myChart: echarts.ECharts | null = null;

interface EChartsSeries {
  realtimeSort?: boolean;
  name?: string;
  type: string;
  data: number[];
  label?: {
    show?: boolean;
    position?: string;
    valueAnimation?: boolean;
  };
}

type EChartsOption = echarts.EChartsOption & {
  series: EChartsSeries[];
};

function getOption(): EChartsOption {
  const data = Array.from({ length: 5 }, () => Math.round(Math.random() * 200));

  return {
    xAxis: {
      max: 'dataMax'
    },
    yAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E'],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 2 // only the largest 3 bars will be displayed
    },
    series: [
      {
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data: data,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        }
      }
    ],
    legend: {
      show: true
    },
    animationDuration: 3000,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  };
}

function update() {
  if (!myChart) return;

  const option = myChart.getOption() as EChartsOption;
  const data = option.series[0].data;

  for (let i = 0; i < data.length; ++i) {
    if (Math.random() > 0.9) {
      data[i] += Math.round(Math.random() * 2000);
    } else {
      data[i] += Math.round(Math.random() * 200);
    }
  }

  myChart.setOption({
    series: [
      {
        ...option.series[0],
        data
      }
    ]
  });
}

onMounted(() => {
  if (chart1.value) {
    myChart = echarts.init(chart1.value);
    myChart.setOption(getOption());
    setInterval(update, 3000);
  }
});
</script>
