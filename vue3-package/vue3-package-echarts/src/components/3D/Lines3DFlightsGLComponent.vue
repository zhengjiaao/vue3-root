<template>
  <div>
    <h1>ECharts 示例-3D Lines3D（Flights GL）-未完成</h1>
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

interface Airport {
  [index: number]: string | number;
}

interface Route {
  [index: number]: number;
}

interface FlightData {
  airports: Airport[];
  routes: Route[];
}

const initChart1 = () => {

  // const ROOT_PATH = 'https://echarts.apache.org/examples'; // 会有跨域情况
  const myChart = echarts.init(chart1.value);
  myChart.showLoading(); // 显示加载

  const ROOT_PATH = '/api';
  fetch(ROOT_PATH + '/data-gl/asset/data/flights.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (!data || !data.airports || !data.routes) {
          console.error('Invalid data structure:', data);
          myChart.hideLoading();
          return;
        }

        myChart.hideLoading(); // 隐藏加载

        const getAirportCoord = (idx: number): [number, number] => {
          return [data.airports[idx][3] as number, data.airports[idx][4] as number];
        };

        const routes = data.routes.map((airline: Route) => {
          return [getAirportCoord(airline[1]), getAirportCoord(airline[2])];
        });

        if (chart1.value) {
          const option = {
            geo3D: {
              map: 'world',
              shading: 'realistic',
              silent: true,
              environment: '#333',
              realisticMaterial: {
                roughness: 0.8,
                metalness: 0
              },
              postEffect: {
                enable: true
              },
              groundPlane: {
                show: false
              },
              light: {
                main: {
                  intensity: 1,
                  alpha: 30
                },
                ambient: {
                  intensity: 0
                }
              },
              viewControl: {
                distance: 70,
                alpha: 89,
                panMouseButton: 'left',
                rotateMouseButton: 'right'
              },
              itemStyle: {
                color: '#000'
              },
              regionHeight: 0.5
            },
            series: [
              {
                type: 'lines3D',
                coordinateSystem: 'geo3D',
                effect: {
                  show: true,
                  trailWidth: 1,
                  trailOpacity: 0.5,
                  trailLength: 0.2,
                  constantSpeed: 5
                },
                blendMode: 'lighter',
                lineStyle: {
                  width: 0.2,
                  opacity: 0.05
                },
                data: routes
              }
            ]
          };
          window.addEventListener('keydown', function () {
            myChart.dispatchAction({
              type: 'lines3DToggleEffect',
              seriesIndex: 0
            });
          });
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
