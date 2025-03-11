<template>
  <div>
    <h1>ECharts 示例-ECharts-GL Hello World</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import * as echarts from 'echarts';
import 'echarts-gl';

const chart1 = ref<HTMLDivElement | null>(null); // 图表ref

onMounted(() => {
  initChart1();  // 调用初始化方法
});

const initChart1 = () => {
  // const ROOT_PATH = 'https://echarts.apache.org/examples'; // 会有跨域情况
  const ROOT_PATH = '/api'; // 代理解决跨域情况

  if (chart1.value) {
    const myChart = echarts.init(chart1.value);

    const option = {
      backgroundColor: '#000',
      globe: {
        baseTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
        heightTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
        displacementScale: 0.04,
        shading: 'realistic',
        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
        realisticMaterial: {
          roughness: 0.9
        },
        postEffect: {
          enable: true
        },
        light: {
          main: {
            intensity: 5,
            shadow: true
          },
          ambientCubemap: {
            texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
            diffuseIntensity: 0.2
          }
        }
      },
      series: []
    }
    myChart.setOption(option);
  }
};
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

.chart-container {
  width: 100%;
  height: 100vh; /* 使用视口高度 */
  display: flex;
  flex-wrap: wrap; /* 确保图表可以换行 */
  justify-content: space-around;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
