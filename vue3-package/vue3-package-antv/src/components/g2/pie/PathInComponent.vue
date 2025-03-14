<template>
  <div>
    <h1>AntV-g2 示例-过度动画-饼图</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {Chart} from '@antv/g2';

const chart1 = ref<HTMLDivElement | null>(null); // 图表ref

onMounted(() => { // 调用初始化方法
  initChart1();
});

// 过渡动画-饼图
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
        { genre: "Sports", sold: 275 },
        { genre: "Strategy", sold: 115 },
        { genre: "Action", sold: 120 },
        { genre: "Shooter", sold: 350 },
        { genre: "Other", sold: 150 },
      ],
      encode: { color: "genre", y: "sold" },
      transform: [{ type: "stackY" }],
      coordinate: { type: "theta" },
      animate: { enter: { type: "waveIn", duration: 1000 } },
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