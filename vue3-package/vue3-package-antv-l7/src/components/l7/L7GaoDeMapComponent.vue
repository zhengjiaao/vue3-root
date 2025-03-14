<template>
  <div id="mapContainer" ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Scene } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';

const mapContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (mapContainer.value) {
    // 初始化 L7 场景
    const scene = new Scene({
      id: 'mapContainer', // 使用元素的 id
      // 初始化高德地图，同样你也可以初始化一个 Mapbox 地图
      map: new GaodeMap({
        style: 'dark', // 地图样式
        center: [120.19382669582967, 30.258134], // 初始中心点坐标，替换为实际的坐标
        zoom: 10, // 初始缩放级别
        pitch: 0, // 倾斜角度
        token: '29c1f7514535014b47fa45360fff8963', // 替换为你的高德地图 API Key
      }),
      logoVisible: false, // 隐藏 L7 的 logo
    });

    // 场景加载完成后执行的操作
    scene.on('loaded', () => {
      console.log('地图加载完成');
    });
  }
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px; /* 设置地图容器的高度 */
}
</style>
