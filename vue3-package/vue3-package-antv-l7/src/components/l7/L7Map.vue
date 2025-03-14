<template>
  <div id="mapContainer" ref="mapContainer" class="map-container"></div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {PointLayer, Scene} from '@antv/l7';
import {GaodeMap} from '@antv/l7-maps';

// 点数据
const pointData = [
  {lng: 120.19382669582967, lat: 30.258134, value: 10},
  {lng: 120.2, lat: 30.3, value: 20},
];

export default defineComponent({
  name: 'L7Map',
  setup() {
    const mapContainer = ref<HTMLElement | null>(null);

    onMounted(() => {
      if (mapContainer.value) {
        // 初始化 L7 场景
        const scene = new Scene({
          // id: mapContainer.value, // 指定容器 ref
          id: 'mapContainer', // 使用元素的 id
          // 初始化高德地图，同样你也可以初始化一个 Mapbox 地图
          map: new GaodeMap({
            style: 'dark', // 地图样式
            center: [120.19382669582967, 30.258134], // 初始中心点坐标
            zoom: 10, // 初始缩放级别
            pitch: 0, // 倾斜角度
            // key: '你的高德地图API Key', // 替换为你的高德地图 API Key
            token: '29c1f7514535014b47fa45360fff8963', // 替换为你的高德地图 API Key
          }),
          logoVisible: false, // 隐藏 L7 的 logo
        });

        // 场景加载完成后执行的操作
        /*scene.on('loaded', () => {
          console.log('地图加载完成');
        });*/

        // 场景加载完成后执行的操作-添加点图层 示例，也可以添加其他图层，添加点、线或面等数据可视化层
        scene.on('loaded', () => {
          console.log('地图加载完成');

          // 添加点图层
          const pointLayer = new PointLayer()
              .source(pointData, {
                parser: {
                  type: 'json',
                  x: 'lng',
                  y: 'lat',
                },
              })
              .shape('circle')
              .size('value', [10, 50]) // 根据 value 动态调整点的大小
              .color('value', ['#f00', '#0f0']) // 根据 value 动态调整颜色
              .style({
                opacity: 0.8,
              });

          // 将图层添加到场景中
          scene.addLayer(pointLayer);
        });

      }
    });

    return {
      mapContainer,
    };
  },
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px; /* 设置地图容器的高度 */
}
</style>