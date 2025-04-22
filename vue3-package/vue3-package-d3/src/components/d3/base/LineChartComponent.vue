<template>
  <!--折线图-->
  <div ref="lineChartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

interface LineData {
  date: Date;
  value: number;
}

const lineChartContainer = ref<HTMLElement | null>(null);
const data: LineData[] = [
  { date: new Date(2023, 0, 1), value: 50 },
  { date: new Date(2023, 1, 1), value: 75 },
  { date: new Date(2023, 2, 1), value: 25 },
];

onMounted(() => {
  if (!lineChartContainer.value) return;

  const width = 800;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };

  const svg = d3.select(lineChartContainer.value)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

  const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)!])
      .range([height - margin.bottom, margin.top]);

  const line = d3.line<LineData>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));

  svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('d', line);

  // 坐标轴
  svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

  svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
});
</script>