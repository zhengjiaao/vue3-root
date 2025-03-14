<template>
  <div>
    <h1>AntV-g2 示例-基础雷达图</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
      <div ref="chart2" class="chart"></div>
      <div ref="chart3" class="chart"></div>
      <div ref="chart5" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {Chart} from '@antv/g2';

const chart1 = ref<HTMLDivElement | null>(null); // 图表ref
const chart2 = ref<HTMLDivElement | null>(null);
const chart3 = ref<HTMLDivElement | null>(null);

onMounted(() => { // 调用初始化方法
  initChart1();
  initChart2();
  initChart3();
});

// 雷达图
const initChart1 = () => { // 新增的初始化方法
  if (chart1.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart1.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "view",
      autoFit: true,
      data: [
        { item: "Design", type: "a", score: 70 },
        { item: "Design", type: "b", score: 30 },
        { item: "Development", type: "a", score: 60 },
        { item: "Development", type: "b", score: 70 },
        { item: "Marketing", type: "a", score: 50 },
        { item: "Marketing", type: "b", score: 60 },
        { item: "Users", type: "a", score: 40 },
        { item: "Users", type: "b", score: 50 },
        { item: "Test", type: "a", score: 60 },
        { item: "Test", type: "b", score: 70 },
        { item: "Language", type: "a", score: 70 },
        { item: "Language", type: "b", score: 50 },
        { item: "Technology", type: "a", score: 50 },
        { item: "Technology", type: "b", score: 40 },
        { item: "Support", type: "a", score: 30 },
        { item: "Support", type: "b", score: 40 },
        { item: "Sales", type: "a", score: 60 },
        { item: "Sales", type: "b", score: 40 },
        { item: "UX", type: "a", score: 50 },
        { item: "UX", type: "b", score: 60 },
      ],
      scale: { x: { padding: 0.5, align: 0 }, y: { tickCount: 5, domainMax: 80 } },
      coordinate: { type: "polar" },
      axis: {
        x: { grid: true, gridLineWidth: 1, tick: false, gridLineDash: [0, 0] },
        y: {
          zIndex: 1,
          title: false,
          gridConnect: "line",
          gridLineWidth: 1,
          gridLineDash: [0, 0],
        },
      },
      interaction: { tooltip: { crosshairsLineDash: [4, 4] } },
      children: [
        {
          type: "area",
          encode: { x: "item", y: "score", color: "type" },
          style: { fillOpacity: 0.5 },
        },
        {
          type: "line",
          encode: { x: "item", y: "score", color: "type" },
          style: { lineWidth: 2 },
        },
        {
          type: "point",
          encode: { x: "item", y: "score", color: "type", shape: "point", size: 3 },
          tooltip: null,
        },
      ],
    });

    // 渲染图表
    chart.render();
  }
};

// 雷达图(带网格)
const initChart2 = () => {
  if (chart2.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart2.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "view",
      autoFit: true,
      data: [
        { item: "Design", type: "a", score: 70 },
        { item: "Design", type: "b", score: 30 },
        { item: "Development", type: "a", score: 60 },
        { item: "Development", type: "b", score: 70 },
        { item: "Marketing", type: "a", score: 50 },
        { item: "Marketing", type: "b", score: 60 },
        { item: "Users", type: "a", score: 40 },
        { item: "Users", type: "b", score: 50 },
        { item: "Test", type: "a", score: 60 },
        { item: "Test", type: "b", score: 70 },
        { item: "Language", type: "a", score: 70 },
        { item: "Language", type: "b", score: 50 },
        { item: "Technology", type: "a", score: 50 },
        { item: "Technology", type: "b", score: 40 },
        { item: "Support", type: "a", score: 30 },
        { item: "Support", type: "b", score: 40 },
        { item: "Sales", type: "a", score: 60 },
        { item: "Sales", type: "b", score: 40 },
        { item: "UX", type: "a", score: 50 },
        { item: "UX", type: "b", score: 60 },
      ],
      scale: { x: { padding: 0.5, align: 0 }, y: { tickCount: 5, domainMax: 80 } },
      coordinate: { type: "polar" },
      axis: {
        x: { grid: true, gridLineWidth: 1, tick: false, gridLineDash: [0, 0] },
        y: {
          zIndex: 1,
          title: false,
          gridConnect: "line",
          gridLineWidth: 1,
          gridLineDash: [0, 0],
        },
      },
      interaction: { tooltip: { crosshairsLineDash: [4, 4] } },
      children: [
        {
          type: "area",
          encode: { x: "item", y: "score", color: "type" },
          style: { fillOpacity: 0.5 },
        },
        {
          type: "line",
          encode: { x: "item", y: "score", color: "type" },
          style: { lineWidth: 2 },
        },
        {
          type: "point",
          encode: { x: "item", y: "score", color: "type", shape: "point", size: 3 },
          tooltip: null,
        },
      ],
    });

    // 渲染图表
    chart.render();
  }
};

// 雷达图(带底色)
const initChart3 = () => {
  if (chart3.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart3.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "view",
      autoFit: true,
      data: [
        { item: "Design", type: "a", score: 70 },
        { item: "Design", type: "b", score: 30 },
        { item: "Development", type: "a", score: 60 },
        { item: "Development", type: "b", score: 70 },
        { item: "Marketing", type: "a", score: 50 },
        { item: "Marketing", type: "b", score: 60 },
        { item: "Users", type: "a", score: 40 },
        { item: "Users", type: "b", score: 50 },
        { item: "Test", type: "a", score: 60 },
        { item: "Test", type: "b", score: 70 },
        { item: "Language", type: "a", score: 70 },
        { item: "Language", type: "b", score: 50 },
        { item: "Technology", type: "a", score: 50 },
        { item: "Technology", type: "b", score: 40 },
        { item: "Support", type: "a", score: 30 },
        { item: "Support", type: "b", score: 40 },
        { item: "Sales", type: "a", score: 60 },
        { item: "Sales", type: "b", score: 40 },
        { item: "UX", type: "a", score: 50 },
        { item: "UX", type: "b", score: 60 },
      ],
      scale: {
        x: { padding: 0.5, align: 0 },
        y: { tickCount: 5, domainMin: 0, domainMax: 80 },
      },
      coordinate: { type: "polar" },
      axis: {
        x: { grid: true, gridLineWidth: 1, tick: false, gridLineDash: [0, 0] },
        y: {
          zIndex: 1,
          title: false,
          gridLineWidth: 1,
          gridLineDash: [0, 0],
          gridAreaFill: (dataum : any, index : number, data : any) => {
            return index % 2 === 1 ? "rgba(0, 0, 0, 0.04)" : "";
          },
        },
      },
      interaction: { tooltip: { crosshairsLineDash: [4, 4] } },
      children: [
        {
          type: "line",
          encode: { x: "item", y: "score", color: "type" },
          style: { lineWidth: 2 },
        },
        {
          type: "point",
          encode: { x: "item", y: "score", color: "type", shape: "point", size: 3 },
          tooltip: null,
        },
      ],
    });

    // 渲染图表
    chart.render();
  }
};

</script>

<style scoped>
.chart-container {
  display: flex;
  flex-wrap: wrap; /* 确保图表可以换行 */
  justify-content: space-around;
}

.chart {
  width: 400px; /* 设置图表容器的宽度 */
  /*width: 100%;*/
  height: 400px; /* 设置图表容器的高度 */
  margin-bottom: 20px; /* 添加间距 */
}

</style>