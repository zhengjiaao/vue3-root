<template>
  <div id="mapContainer" ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {PolygonLayer, LineLayer, PointLayer, Scene} from '@antv/l7';
import {GaodeMap} from '@antv/l7-maps';
import data from "@/components/l7/layers/data/中国各省GeoJSON数据.json" // 导入本地JSON数据

const mapContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (mapContainer.value) {
    // 初始化 L7 场景
    const scene = new Scene({
      id: 'mapContainer', // 使用元素的 id
      // 初始化高德地图，同样你也可以初始化一个 Mapbox 地图
      map: new GaodeMap({
        pitch: 35.210526315789465,
        style: 'dark',
        center: [104.288144, 31.239692],
        zoom: 4.4,
        token: '29c1f7514535014b47fa45360fff8963', // 替换为你的高德地图 API Key
      }),
      logoVisible: false, // 隐藏 L7 的 logo
    });

    // 场景加载完成后执行的操作
    /*scene.on('loaded', () => {
      console.log('地图加载完成');
    });*/

    // 场景加载完成后执行的操作-添加面图层 示例，也可以添加其他图层，添加点、线或面等数据可视化层
    scene.on('loaded', () => {
      console.log('地图加载完成');

      // 添加面图层
      const chinaPolygonLayer = new PolygonLayer({})
          .source(data)
          .color('name', [
            'rgb(239,243,255)',
            'rgb(189,215,231)',
            'rgb(107,174,214)',
            'rgb(49,130,189)',
            'rgb(8,81,156)',
          ]);

      // 添加描边图层
      const chinaLineLayer = new LineLayer({})
          .source(data)
          .color('#ffffff') // 描边颜色
          .size(1); // 描边宽度

      // 添加文字标注图层
      const chinaPointLayer = new PointLayer({})
          .source(data, {
            parser: {
              type: 'geojson',
              coordinates: 'center', // 假设每个要素有一个 center 属性作为标注点
            },
          })
          .shape('name', 'text')
          .size(16)
          .color('#ffffff')
          .style({
            textAnchor: 'center', // 文本对齐方式
            textOffset: [0, 0], // 文本偏移量
            padding: [2, 2, 2, 2], // 文本背景 padding
            stroke: '#000', // 文本描边颜色
            strokeWidth: 1, // 文本描边宽度
            fill: '#fff', // 文本背景颜色
          });

      // 将图层添加到场景中
      scene.addLayer(chinaPolygonLayer);
      scene.addLayer(chinaLineLayer);
      scene.addLayer(chinaPointLayer);
      console.log('添加图层完成');
    });
  }
});
</script>

<style scoped>
.map-container {
  /*width: 100%;*/
  /*height: 500px;*/ /* 设置地图容器的高度 */
  min-height: 500px;
  justify-content: center;
  position: relative
}
</style>
