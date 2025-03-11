<template>
  <div>
    <h1>ECharts 示例-堆叠柱状图</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>

      <!-- 控制面板 -->
      <div class="control-panel">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chart1 = ref<HTMLDivElement | null>(null);
const backgroundColor = ref<string>('#fff');
const imageFormat = ref<'png' | 'svg'>('png');

// 图表实例缓存
let chartInstance: echarts.ECharts | null = null;

onMounted(() => {
  initChart();
});

const initChart = () => {
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
    title: { text: '堆叠柱状图示例' },
    tooltip: {},
    xAxis: { data: ['A', 'B', 'C', 'D', 'E'] },
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
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
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
  return new Blob([u8arr], { type: mime });
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

</script>

<style>
.chart-container {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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