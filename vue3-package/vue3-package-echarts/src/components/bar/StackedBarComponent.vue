<template>
  <div>
    <h1>ECharts 示例-堆叠柱状图</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>

      <!-- 控制面板 -->
      <div class="control-panel">
      <!--<div class="chart"></div>-->
      <!-- 切换背景按钮 -->
      <button @click="toggleBackgroundColor" class="control-btn">
        🎨 切换背景 (当前: {{ backgroundColor === '#fff' ? '白色' : '深色' }})
      </button>

      <!-- 格式选择器 -->
      <div class="format-selector">
        <label for="image-format">-export format:</label>
        <select id="image-format" v-model="imageFormat" class="selector">
          <option value="png">PNG</option>
          <option value="svg">SVG</option>
        </select>
      </div>

      <!-- 下载按钮 -->
      <button @click="downloadChartImage" class="control-btn download-btn">
        📸 下载图表
      </button>
    </div>
  </div>

  <div ref="chart2" class="chart"></div>
  <div ref="chart3" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import * as echarts from 'echarts';

const chart1 = ref<HTMLDivElement | null>(null);
const chart2 = ref<HTMLDivElement | null>(null);
const chart3 = ref<HTMLDivElement | null>(null);

const backgroundColor = ref<string>('#fff');
const imageFormat = ref<'png' | 'svg'>('png');

// 图表实例缓存
let chartInstance: echarts.ECharts | null = null;

onMounted(() => {
  initChart1();
  initChart2();
  initChart3();
});

const initChart1 = () => {
  if (!chart1.value) return;

  // 如果已有实例则先销毁
  if (chartInstance) {
    chartInstance.dispose();
  }

  chartInstance = echarts.init(chart1.value);
  updateChartOptions();
};

const updateChartOptions = () => {
  if (!chartInstance) return;

  const option = {
    backgroundColor: backgroundColor.value,
    title: {text: '图表 1-堆叠柱状图示例'},
    tooltip: {},
    xAxis: {data: ['A', 'B', 'C', 'D', 'E']},
    yAxis: {},
    series: [
      {
        name: '系列1',
        type: 'bar',
        stack: '总量',
        data: [10, 22, 28, 43, 49]
      },
      {
        name: '系列2',
        type: 'bar',
        stack: '总量',
        data: [5, 4, 3, 5, 10]
      }
    ]
  };

  chartInstance.setOption(option);
};

const toggleBackgroundColor = () => {
  backgroundColor.value = backgroundColor.value === '#fff' ? '#100C2A' : '#fff';
  updateChartOptions();
};

const downloadChartImage = () => {
  if (!chartInstance) return;

  const format = imageFormat.value;
  const options = {
    type: format,
    pixelRatio: 2,
    backgroundColor: backgroundColor.value
  };

  try {
    if (format === 'svg') {
      const svgUrl = chartInstance.getDataURL(options);
      const svgData = decodeURIComponent(svgUrl.split(',')[1]);
      const blob = new Blob([svgData], {type: 'image/svg+xml'});
      downloadFile(blob, 'chart.svg');
    } else {
      const pngUrl = chartInstance.getDataURL(options);
      const blob = dataUrlToBlob(pngUrl);
      downloadFile(blob, 'chart.png');
    }
  } catch (error) {
    console.error('导出失败:', error);
    alert('导出失败，请检查控制台');
  }
};

// 辅助方法：数据URL转Blob
const dataUrlToBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
};

// 辅助方法：通用文件下载
const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const initChart2 = () => {
  // There should not be negative values in rawData
  const rawData = [
    [100, 302, 301, 334, 390, 330, 320],
    [320, 132, 101, 134, 90, 230, 210],
    [220, 182, 191, 234, 290, 330, 310],
    [150, 212, 201, 154, 190, 330, 410],
    [820, 832, 901, 934, 1290, 1330, 1320]
  ];
  const totalData: number[] = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) {
      sum += rawData[j][i];
    }
    totalData.push(sum);
  }
  const grid = {
    left: 100,
    right: 100,
    top: 50,
    bottom: 50
  };
  const series = [
    'Direct',
    'Mail Ad',
    'Affiliate Ad',
    'Video Ad',
    'Search Engine'
  ].map((name, sid) => {
    return {
      name,
      type: 'bar',
      stack: 'total',
      barWidth: '60%',
      label: {
        show: true,
        formatter: (params: any) =>
            Math.round(params.value * 1000) / 10 + '%'
      },
      data: rawData[sid].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
      )
    };
  });


  if (chart2.value) {
    const myChart = echarts.init(chart2.value);
    const option = {
      title: {
        text: '图表 2-堆叠柱状图的归一化'
      },
      tooltip: {},
      legend: {
        selectedMode: false,
        top: '30px', // 调整 legend 的 top 位置, 避免和 title 重叠
        x: 'left', // 靠左
        textStyle: {
          fontSize: 8, // 设置字体大小
          fontWeight: 'bold', // 设置字体粗细
          color: '#333' // 设置字体颜色
        },
      },
      grid,
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      series
    };
    myChart.setOption(option);
  }
};

const initChart3 = () => {
  const myChart = echarts.init(chart3.value);

// There should not be negative values in rawData
  const rawData = [
    [100, 302, 301, 334, 390, 330, 320],
    [320, 132, 101, 134, 90, 230, 210],
    [220, 182, 191, 234, 290, 330, 310],
    [150, 212, 201, 154, 190, 330, 410],
    [820, 832, 901, 934, 1290, 1330, 1320]
  ];
  const totalData: number[] = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) {
      sum += rawData[j][i];
    }
    totalData.push(sum);
  }
  const grid = {
    left: 100,
    right: 100,
    top: 50,
    bottom: 50
  };
  const gridWidth = myChart.getWidth() - grid.left - grid.right;
  const gridHeight = myChart.getHeight() - grid.top - grid.bottom;
  const categoryWidth = gridWidth / rawData[0].length;
  const barWidth = categoryWidth * 0.6;
  const barPadding = (categoryWidth - barWidth) / 2;
  const series = [
    'Direct',
    'Mail Ad',
    'Affiliate Ad',
    'Video Ad',
    'Search Engine'
  ].map((name, sid) => {
    return {
      name,
      type: 'bar',
      stack: 'total',
      barWidth: '60%',
      label: {
        show: true,
        formatter: (params: any) =>
            Math.round(params.value * 1000) / 10 + '%'
      },
      data: rawData[sid].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
      )
    };
  });
  const color = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];
  const elements = [];
  for (let j = 1, jlen = rawData[0].length; j < jlen; ++j) {
    const leftX = grid.left + categoryWidth * j - barPadding;
    const rightX = leftX + barPadding * 2;
    let leftY = grid.top + gridHeight;
    let rightY = leftY;
    for (let i = 0, len = series.length; i < len; ++i) {
      const points = [];
      const leftBarHeight = (rawData[i][j - 1] / totalData[j - 1]) * gridHeight;
      points.push([leftX, leftY]);
      points.push([leftX, leftY - leftBarHeight]);
      const rightBarHeight = (rawData[i][j] / totalData[j]) * gridHeight;
      points.push([rightX, rightY - rightBarHeight]);
      points.push([rightX, rightY]);
      points.push([leftX, leftY]);
      leftY -= leftBarHeight;
      rightY -= rightBarHeight;
      elements.push({
        type: 'polygon',
        shape: {
          points
        },
        style: {
          fill: color[i],
          opacity: 0.25
        }
      });
    }
  }

  if (chart3.value) {
    const option = {
      title: {
        text: '图表 3-堆叠柱状图的归一化'
      },
      tooltip: {},
      legend: {
        selectedMode: false,
        top: '30px', // 调整 legend 的 top 位置, 避免和 title 重叠
        x: 'left', // 靠左
        textStyle: {
          fontSize: 8, // 设置字体大小
          fontWeight: 'bold', // 设置字体粗细
          color: '#333' // 设置字体颜色
        },
      },
      grid,
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      series,
      graphic: {
        elements
      }
    };
    myChart.setOption(option);
  }
};

</script>

<style>
.chart-container {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.chart {
  width: 800px;
  height: 600px;
  margin: 0 auto 20px;
}

.control-panel {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.control-btn {
  background: #4CAF50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn:hover {
  background: #45a049;
  transform: translateY(-1px);
}

.selector {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
  margin-left: 10px;
}

.download-btn {
  background: #2196F3;
}

.format-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>