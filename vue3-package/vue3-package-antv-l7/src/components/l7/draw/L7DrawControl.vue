<template>
  <div id="mapContainer" ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {Scene} from '@antv/l7';
import {DrawEvent, DrawCircle, ControlEvent, DrawControl} from '@antv/l7-draw';
import {GaodeMap} from '@antv/l7-maps';
import type {FeatureCollection, Feature as GeoJSONFeature} from 'geojson'; // 使用 geojson 类型

const mapContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (mapContainer.value) {
    // 初始化 L7 场景
    const scene = new Scene({
      id: 'mapContainer', // 使用元素的 id
      // 初始化高德地图，同样你也可以初始化一个 Mapbox 地图
      map: new GaodeMap({
        // center: [121.472644, 31.231706], // 设置地图中心点
        // zoom: 8.15, // 设置地图缩放级别
        // style: 'dark', // 设置地图样式
        style: 'light',
        center: [116.1608, 40.1119],
        zoom: 15,
        token: '29c1f7514535014b47fa45360fff8963', // 替换为你的高德地图 API Key
      }),
      logoVisible: false, // 隐藏 L7 的 logo
    });

    // 场景加载完成后执行的操作
    /*scene.on('loaded', () => {
      console.log('地图加载完成');
    });*/

    // 绘制控件
    scene.on('loaded', () => {
      console.log('地图加载完成');

      // 添加绘制控件
      const drawControl = new DrawControl(scene, {});
      scene.addControl(drawControl);

      // 监听绘制控件变化事件
      drawControl.on(ControlEvent.DrawChange, (changeType) => {
        console.log('changeType:', changeType);
      });

      // 监听绘制要素变化事件 - todo 无法输出控件绘制的 GeoJSON
      /*drawControl.on(ControlEvent.Change, (allFeatures: GeoJSONFeature[]) => {
        console.log('绘制的 Features:', allFeatures);

        const geoJSON: FeatureCollection = {
          type: 'FeatureCollection',
          features: allFeatures.map((feature) => feature), // 直接映射为 GeoJSONFeature
        };

        console.log('绘制的 GeoJSON:', geoJSON);
      });*/

      // 定时输出缩放级别和中心点
      setInterval(() => {
        console.log(scene.getZoom(), scene.getCenter());
      }, 2000);

    });
  }
});
</script>

<style scoped>
.map-container {
  /*width: 100%;*/ /*宽度设置为 100%，以适应父容器的宽度*/
  /*height: 500px;*/ /* 设置地图容器的高度 */
  /*min-height: 500px;*/ /*设置最小高度，保证地图不会被压缩*/
  height: 80vh; /*设置地图容器的高度为80vh，以适应视口高度*/
  justify-content: center; /*垂直居中, 默认为flex-start*/
  position: relative /*设置地图容器为相对定位，以允许子元素绝对定位*/
}
</style>
