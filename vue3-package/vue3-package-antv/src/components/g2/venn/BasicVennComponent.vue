<template>
  <div>
    <h1>AntV-g2 示例-韦恩图</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
      <div ref="chart2" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {Chart} from '@antv/g2';

const chart1 = ref<HTMLDivElement | null>(null); // 图表ref
const chart2 = ref<HTMLDivElement | null>(null); // 图表ref

onMounted(() => { // 调用初始化方法
  initChart1();
  initChart2();
});

// 韦恩图-带底色
const initChart1 = () => {
  if (chart1.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart1.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "path",
      autoFit: true,
      data: {
        type: "fetch",
        value: "https://assets.antv.antgroup.com/g2/lastfm.json",
        transform: [
          {
            type: "venn",
            padding: 8,
            sets: "sets",
            size: "size",
            as: ["key", "path"],
          },
        ],
      },
      encode: {d: "path", color: "key"},
      style: {opacity: (d: any) => (d.sets.length > 1 ? 0.001 : 0.5)},
      state: {inactive: {opacity: 0.2}, active: {opacity: 0.8}},
      legend: false,
      labels: [
        {
          position: "inside",
          text: (d: any) => d.label || "",
          transform: [{type: "contrastReverse"}],
        },
      ],
      interaction: {elementHighlight: true},
    });

    // 渲染图表
    chart.render();
  }
};

// 韦恩图-空心韦恩图
const initChart2 = () => {
  if (chart2.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart2.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "path",
      autoFit: true,
      data: {
        type: "inline",
        value: [
          {sets: ["A"], size: 15, label: "A"},
          {sets: ["B"], size: 12, label: "B"},
          {sets: ["C"], size: 10, label: "C"},
          {sets: ["A", "B"], size: 2, label: "A&B"},
          {sets: ["A", "C"], size: 2, label: "A&C"},
          {sets: ["B", "C"], size: 1, label: "B&C"},
          {sets: ["A", "B", "C"], size: 1},
        ],
        transform: [{type: "venn"}],
      },
      encode: {d: "path", color: "key", shape: "hollow"},
      style: {opacity: 0.6, lineWidth: 8},
      labels: [{position: "inside", text: (d: any) => d.label || "", fill: "#000"}],
      tooltip: false,
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