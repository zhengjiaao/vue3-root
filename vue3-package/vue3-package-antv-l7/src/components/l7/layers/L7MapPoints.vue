<template>
  <div id="mapContainer" ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {PolygonLayer, LineLayer, PointLayer, Scene} from '@antv/l7';
import {GaodeMap} from '@antv/l7-maps';

const mapContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (mapContainer.value) {
    // 初始化 L7 场景
    const scene = new Scene({
      id: 'mapContainer', // 使用元素的 id
      // 初始化高德地图，同样你也可以初始化一个 Mapbox 地图
      map: new GaodeMap({
        center: [121.472644, 31.231706], // 设置地图中心点
        zoom: 8.15, // 设置地图缩放级别
        style: 'dark', // 设置地图样式
        token: '29c1f7514535014b47fa45360fff8963', // 替换为你的高德地图 API Key
      }),
      logoVisible: false, // 隐藏 L7 的 logo
    });

    // 场景加载完成后执行的操作
    /*scene.on('loaded', () => {
      console.log('地图加载完成');
    });*/

    // 场景加载完成后执行的操作-添加线图层 示例，也可以添加其他图层，添加点、线或面等数据可视化层
    scene.on('loaded', () => {
      // 上海公交线路图，从服务器获取数据，示例数据为 GeoJSON 数据
      fetch('https://gw.alipayobjects.com/os/bmw-prod/0290a972-eedd-42f6-b69e-50a35e8a0824.json')
          .then((res) => res.json())
          .then((data) => {
            const layer = new LineLayer({})
                .source(data, {
                  parser: {
                    type: 'json',
                    coordinates: 'coordinates',
                  },
                })
                .size(0.5)
                .shape('line')
                .active(true)
                .color('length', [
                  '#0A3663',
                  '#1558AC',
                  '#3771D9',
                  '#4D89E5',
                  '#64A5D3',
                  '#72BED6',
                  '#83CED6',
                  '#A6E1E0',
                  '#B8EFE2',
                  '#D7F9F0',
                ]);

            // 将图层添加到场景中
            scene.addLayer(layer);
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
