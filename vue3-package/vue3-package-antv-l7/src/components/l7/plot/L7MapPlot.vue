<template>
  <div id="mapContainer" ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {PolygonLayer, LineLayer, PointLayer, Scene} from '@antv/l7';
import {GaodeMap} from '@antv/l7-maps';
import { Choropleth } from '@antv/l7plot';

const mapContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (mapContainer.value) {
    // 初始化 L7 场景
    const scene = new Scene({
      id: 'mapContainer', // 使用元素的 id
      // 初始化高德地图，同样你也可以初始化一个 Mapbox 地图
      map: new GaodeMap({
        style: 'blank',
        center: [120.19382669582967, 30.258134],
        zoom: 3,
        token: '29c1f7514535014b47fa45360fff8963', // 替换为你的高德地图 API Key
      }),
      logoVisible: false, // 隐藏 L7 的 logo
    });

    // 场景加载完成后执行的操作
    /*scene.on('loaded', () => {
      console.log('地图加载完成');
    });*/

    interface AreaItem {
      level: string;
      parent: number;
      adcode: number;
      name: string;
    }

    // 场景加载完成后执行的操作
    scene.on('loaded', () => {
      console.log('地图加载完成');

      fetch('https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.1/administrative-data/area-list.json')
          .then((response) => response.json())
          .then((list) => {
            const data = list
                .filter(({ level, parent }: AreaItem) => level === 'city' && parent === 330000)
                .map((item: AreaItem) => ({ ...item, value: Math.random() * 5000 }));

            const choropleth = new Choropleth({
              source: {
                data,
                joinBy: {
                  sourceField: 'adcode',
                  geoField: 'adcode',
                },
              },
              viewLevel: {
                level: 'province',
                adcode: 330000,
              },
              autoFit: true,
              color: {
                field: 'value',
                value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
                scale: { type: 'quantize' },
              },
              style: {
                opacity: 1,
                stroke: '#ccc',
                lineWidth: 0.6,
                lineOpacity: 1,
              },
              label: {
                visible: true,
                field: 'name',
                style: {
                  fill: '#000',
                  opacity: 0.8,
                  fontSize: 10,
                  stroke: '#fff',
                  strokeWidth: 1.5,
                  textAllowOverlap: false,
                  padding: [5, 5],
                },
              },
              state: {
                active: { stroke: 'black', lineWidth: 1 },
              },
              tooltip: {
                items: ['name', 'adcode', 'value'],
              },
              zoom: {
                position: 'bottomright',
              },
              legend: {
                position: 'bottomleft',
              },
            });

            choropleth.addToScene(scene);
            console.log('添加图层完成');
          });
    });
  }
});
</script>

<style scoped>
.map-container {
  /*width: 100%;*/  /*宽度设置为 100%，以适应父容器的宽度*/
  /*height: 500px;*/ /* 设置地图容器的高度 */
  /*min-height: 500px;*/ /*设置最小高度，保证地图不会被压缩*/
  height: 80vh; /*设置地图容器的高度为80vh，以适应视口高度*/
  justify-content: center; /*垂直居中, 默认为flex-start*/
  position: relative /*设置地图容器为相对定位，以允许子元素绝对定位*/
}
</style>
