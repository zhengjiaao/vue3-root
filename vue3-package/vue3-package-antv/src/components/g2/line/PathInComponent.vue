<template>
  <div>
    <h1>AntV-g2 示例-过度动画-折线图</h1>
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

// 过渡动画-折线图
const initChart1 = () => {
  if (chart1.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart1.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "line",
      autoFit: true,
      data: {
        type: "fetch",
        value:
            "https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv",
      },
      encode: { x: "date", y: "close" },
      animate: { enter: { type: "pathIn", duration: 1000 } },
    });

    // 渲染图表
    chart.render();
  }
};

// 分组动画-折线图
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
      data: {
        type: "fetch",
        value: "https://assets.antv.antgroup.com/g2/doughnut-purchases.json",
      },
      children: [
        {
          type: "line",
          encode: { x: "year", y: "count", color: "year", shape: "smooth" },
          scale: { y: { zero: true, nice: true } },
          style: { gradient: "x", gradientColor: "start" },
          animate: { enter: { type: "pathIn", duration: 3000 } },
          axis: { y: { labelFormatter: "~s" } },
        },
        {
          type: "point",
          encode: { x: "year", y: "count", color: "year", shape: "point" },
          transform: [{ type: "stackEnter" }],
          animate: { enter: { duration: 300 } },
        },
        {
          type: "text",
          encode: { x: "year", y: "count", text: "year" },
          transform: [{ type: "stackEnter" }],
          style: { lineWidth: 5, stroke: "#fff", textAlign: "center", dy: -8 },
          animate: { enter: { duration: 300 } },
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