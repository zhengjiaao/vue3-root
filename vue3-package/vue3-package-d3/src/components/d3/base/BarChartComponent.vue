<template>
  <!--柱状图-->
  <div ref="barChartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

interface BarData {
  label: string;
  value: number;
}

const barChartContainer = ref<HTMLElement | null>(null);
const data: BarData[] = [
  { label: 'A', value: 30 },
  { label: 'B', value: 80 },
  { label: 'C', value: 45 },
];

onMounted(() => {
  if (!barChartContainer.value) return;

  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 40, left: 40 };

  const svg = d3.select(barChartContainer.value)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

  const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)!])
      .nice()
      .range([height - margin.bottom, margin.top]);

  // 绘制柱形
  svg.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => xScale(d.label)!)
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(0) - yScale(d.value))
      .attr('fill', 'steelblue');

  // 添加坐标轴
  svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

  svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
});
</script>

<style scoped>
.chart-container {
  padding: 20px;
  border: 1px solid #eee;
}
</style>