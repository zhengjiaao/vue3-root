<template>
  <div>
    <h1>AntV-g2 示例-堆叠柱形图</h1>
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

// 简单堆叠柱形图
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
        {name: "London", month: "Jan.", rainfall: 18.9},
        {name: "London", month: "Feb.", rainfall: 28.8},
        {name: "London", month: "Mar.", rainfall: 39.3},
        {name: "London", month: "Apr.", rainfall: 81.4},
        {name: "London", month: "May", rainfall: 47},
        {name: "London", month: "Jun.", rainfall: 20.3},
        {name: "London", month: "Jul.", rainfall: 24},
        {name: "London", month: "Aug.", rainfall: 35.6},
        {name: "Berlin", month: "Jan.", rainfall: 12.4},
        {name: "Berlin", month: "Feb.", rainfall: 23.2},
        {name: "Berlin", month: "Mar.", rainfall: 34.5},
        {name: "Berlin", month: "Apr.", rainfall: 99.7},
        {name: "Berlin", month: "May", rainfall: 52.6},
        {name: "Berlin", month: "Jun.", rainfall: 35.5},
        {name: "Berlin", month: "Jul.", rainfall: 37.4},
        {name: "Berlin", month: "Aug.", rainfall: 42.4},
      ],
      encode: {x: "month", y: "rainfall", color: "name"},
      transform: [{type: "stackY"}], // 堆叠柱形图
      interaction: {elementHighlight: {background: true}},
      axis: {
        x: {
          title: '月份', // 设置x轴标题
        },
        y: {
          title: '月均降雨量', // 设置y轴标题
        },
      },
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