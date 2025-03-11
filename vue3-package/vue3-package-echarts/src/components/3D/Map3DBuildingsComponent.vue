<template>
  <div>
    <h1>ECharts 示例-3D 地图 map3D-Buildings</h1>
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
import type {Feature} from 'geojson';

const chart1 = ref<HTMLDivElement | null>(null); // 图表ref

onMounted(() => {
  initChart1();  // 调用初始化方法
});

const initChart1 = () => {
  // const ROOT_PATH = 'https://echarts.apache.org/examples'; // 会有跨域情况
  const myChart = echarts.init(chart1.value);

  const ROOT_PATH = '/api';
  fetch(ROOT_PATH + '/data-gl/asset/data/buildings.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
      .then(response => response.json())
      .then(data => {
        const buildingsGeoJSON = data;
        echarts.registerMap('buildings', buildingsGeoJSON); // 绑定数据 buildingsGeoJSON
        const regions = buildingsGeoJSON.features.map((feature: Feature) => {
          return {
            name: feature.properties?.name || 'Unknown',
            value: Math.random(),
            height: (feature.properties?.height || 0) / 10
          };
        });
        if (chart1.value) {
          const option = {
            visualMap: {
              show: false,
              min: 0.4,
              max: 1,
              inRange: {
                color: [
                  '#313695',
                  '#4575b4',
                  '#74add1',
                  '#abd9e9',
                  '#e0f3f8',
                  '#ffffbf',
                  '#fee090',
                  '#fdae61',
                  '#f46d43',
                  '#d73027',
                  '#a50026'
                ]
              }
            },
            series: [
              {
                type: 'map3D',
                map: 'buildings',
                shading: 'realistic',
                environment: '#000',
                realisticMaterial: {
                  roughness: 0.6,
                  textureTiling: 20
                },
                postEffect: {
                  enable: true,
                  SSAO: {
                    enable: true,
                    intensity: 1.3,
                    radius: 5
                  },
                  screenSpaceReflection: {
                    enable: false
                  },
                  depthOfField: {
                    enable: true,
                    blurRadius: 4,
                    focalDistance: 30
                  }
                },
                light: {
                  main: {
                    intensity: 3,
                    alpha: 40,
                    shadow: true,
                    shadowQuality: 'high'
                  },
                  ambient: {
                    intensity: 0
                  },
                  ambientCubemap: {
                    texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
                    exposure: 1,
                    diffuseIntensity: 0.5,
                    specularIntensity: 1
                  }
                },
                groundPlane: {
                  show: false,
                  color: '#333'
                },
                viewControl: {
                  minBeta: -360,
                  maxBeta: 360,
                  alpha: 50,
                  center: [50, 0, -10],
                  distance: 30,
                  minDistance: 5,
                  panMouseButton: 'left',
                  rotateMouseButton: 'middle',
                  zoomSensitivity: 0.5
                },
                itemStyle: {
                  areaColor: '#666'
                  // borderColor: '#222',
                  // borderWidth: 1
                },
                label: {
                  color: 'white'
                },
                silent: true,
                instancing: true,
                boxWidth: 200,
                boxHeight: 1,
                data: regions
              }
            ]
          }
          myChart.setOption(option);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        myChart.hideLoading();
      });
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
