<template>
  <div>
    <h1>AntV-g2 示例-Canvas 渲染器</h1>
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

// Canvas 渲染器
const initChart1 = () => { // 新增的初始化方法
  if (chart1.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart1.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "spaceFlex",
      autoFit: true,
      ratio: [1, 1],
      direction: "col",
      data: {
        type: "fetch",
        value: "https://assets.antv.antgroup.com/g2/seattle-weather.json",
      },
      children: [
        {
          type: "spaceFlex",
          ratio: [1, 1],
          direction: "row",
          children: [
            {
              type: "interval",
              encode: {
                x: (d: any) => new Date(d.date).getUTCMonth(),
                y: "precipitation",
              },
              transform: [{type: "groupX", y: "mean"}],
            },
            {
              type: "line",
              encode: {
                x: (d: any) => new Date(d.date).getUTCMonth(),
                y: "wind",
                shape: "smooth",
              },
              transform: [{type: "groupX", y: "mean"}],
            },
          ],
        },
        {
          type: "spaceFlex",
          ratio: [1, 1],
          direction: "row",
          children: [
            {
              type: "area",
              encode: {
                x: (d: any) => new Date(d.date).getUTCMonth(),
                y: ["temp_min", "temp_max"],
                shape: "smooth",
              },
              transform: [{type: "groupX", y: "mean"}],
            },
            {
              type: "point",
              encode: {x: "temp_min", y: "temp_max", shape: "point"},
              transform: [{type: "groupX", y: "mean"}],
            },
          ],
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