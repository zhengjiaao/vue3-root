<template>
  <div>
    <h1>AntV-g2 示例-过度动画-柱状图</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
      <div ref="chart2" class="chart"></div>
      <div ref="chart3" class="chart"></div>
      <div ref="chart4" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {Chart} from '@antv/g2';

const chart1 = ref<HTMLDivElement | null>(null); // 图表ref
const chart2 = ref<HTMLDivElement | null>(null); // 图表ref
const chart3 = ref<HTMLDivElement | null>(null); // 图表ref
const chart4 = ref<HTMLDivElement | null>(null); // 图表ref

onMounted(() => { // 调用初始化方法
  initChart1();
  initChart2();
  initChart3();
  initChart4();
});

// 过渡动画-柱状图-闪出
const initChart1 = () => {
  if (chart1.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart1.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "interval",
      autoFit: true,
      data: [
        {genre: "Sports", sold: 275},
        {genre: "Strategy", sold: 115},
        {genre: "Action", sold: 120},
        {genre: "Shooter", sold: 350},
        {genre: "Other", sold: 150},
      ],
      encode: {x: "genre", y: "sold", color: "genre"},
      animate: {
        enter: {type: "fadeIn", duration: 1000},
        exit: {type: "fadeOut", duration: 2000},
      },
    });

    // 渲染图表
    chart.render();
  }
};

// 过渡动画-柱状图-从左至右
const initChart2 = () => {
  if (chart2.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart2.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "interval",
      autoFit: true,
      data: [
        {genre: "Sports", sold: 275},
        {genre: "Strategy", sold: 115},
        {genre: "Action", sold: 120},
        {genre: "Shooter", sold: 350},
        {genre: "Other", sold: 150},
      ],
      encode: {x: "genre", y: "sold", color: "genre"},
      animate: {
        enter: {type: "scaleInX", duration: 1000},
        exit: {type: "scaleOutX", duration: 2000},
      },
    });

    // 渲染图表
    chart.render();
  }
};

// 过渡动画-柱状图-从底至上
const initChart3 = () => {
  if (chart3.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart3.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "interval",
      autoFit: true,
      data: [
        { genre: "Sports", sold: 275 },
        { genre: "Strategy", sold: 115 },
        { genre: "Action", sold: 120 },
        { genre: "Shooter", sold: 350 },
        { genre: "Other", sold: 150 },
      ],
      encode: { x: "genre", y: "sold", color: "genre" },
      animate: {
        enter: { type: "scaleInY", duration: 1000 },
        exit: { type: "scaleOutY", duration: 2000 },
      },
    });

    // 渲染图表
    chart.render();
  }
};

// 分组动画-柱状图
const initChart4 = () => {
  if (chart4.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart4.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "interval",
      data: [
        { type: "Apple", year: "2001", value: 260 },
        { type: "Orange", year: "2001", value: 100 },
        { type: "Banana", year: "2001", value: 90 },
        { type: "Apple", year: "2002", value: 210 },
        { type: "Orange", year: "2002", value: 150 },
        { type: "Banana", year: "2002", value: 30 },
      ],
      encode: { x: "year", y: "value", color: "type" },
      transform: [{ type: "stackEnter", groupBy: "color" }, { type: "dodgeX" }],
      animate: { enter: { duration: 500 } },
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