<template>
  <!--饼图-->
  <div ref="pieChartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

interface PieData {
  label: string;
  value: number;
}

const pieChartContainer = ref<HTMLElement | null>(null);
const data: PieData[] = [
  { label: 'A', value: 35 },
  { label: 'B', value: 25 },
  { label: 'C', value: 40 },
];

onMounted(() => {
  if (!pieChartContainer.value) return;

  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;

  const svg = d3.select(pieChartContainer.value)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2},${height/2})`);

  const color = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.label))
      .range(d3.schemeCategory10);

  const pie = d3.pie<PieData>()
      .value(d => d.value);

  const arc = d3.arc<d3.PieArcDatum<PieData>>()
      .innerRadius(0)
      .outerRadius(radius - 10);

  const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g');

  arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label))
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

  // 添加标签
  arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data.label);
});
</script>