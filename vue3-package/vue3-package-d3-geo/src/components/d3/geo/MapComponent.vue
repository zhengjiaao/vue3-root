<template>
  <!--Map 地图-->
  <div ref="mapContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';
import type { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
// vue3 + ts 的 json-loader 方式，可以避免跨域问题
// 方法1：静态导入
// import worldData from '@/assets/world-110m.json';
// 方法2：动态请求
// const worldData = await fetch('/public/world-110m.json').then(res => res.json());

const mapContainer = ref<HTMLElement | null>(null);

onMounted(async () => {
  if (!mapContainer.value) return;

  const width = 800;
  const height = 500;

  // 加载地理数据并进行类型检查
  const worldData: FeatureCollection<Geometry, GeoJsonProperties> | undefined = await d3.json('/world-110m.json');
  if (!worldData) {
    console.error('missing world data.');
    return;
  }

  if (!Array.isArray(worldData.features)) {
    console.error('Invalid world data.');
    return;
  }

  const svg = d3.select(mapContainer.value)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

  // 定义投影
  const projection = d3.geoNaturalEarth1()
      .fitSize([width, height], worldData);

  // 路径生成器
  const path = d3.geoPath().projection(projection);

  // 绘制地图
  svg.selectAll('path')
      .data(worldData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', '#69b3a2')
      .attr('stroke', 'white')
      .attr('stroke-width', 0.5);
});
</script>