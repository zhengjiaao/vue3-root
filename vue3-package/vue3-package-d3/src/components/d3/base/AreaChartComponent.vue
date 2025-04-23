<template>
  <!--面积图-->
  <div ref="areaChartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

interface AreaData {
  date: Date;
  value: number;
}

const areaChartContainer = ref<HTMLElement | null>(null);
const data: AreaData[] = [
  { date: new Date(2023, 0, 1), value: 30 },
  { date: new Date(2023, 1, 1), value: 80 },
  { date: new Date(2023, 2, 1), value: 45 },
  { date: new Date(2023, 3, 1), value: 60 },
];

onMounted(() => {
  if (!areaChartContainer.value) return;

  const width = 800;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };

  const svg = d3.select(areaChartContainer.value)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

  // 定义比例尺
  const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)!])
      .range([height - margin.bottom, margin.top]);

  // 定义面积生成器
  const area = d3.area<AreaData>()
      .x(d => xScale(d.date))
      .y0(yScale(0))
      .y1(d => yScale(d.value));

  // 绘制面积
  svg.append('path')
      .datum(data)
      .attr('fill', 'steelblue')
      .attr('opacity', 0.5)
      .attr('d', area);

  // 添加坐标轴
  svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

  svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
});
</script>