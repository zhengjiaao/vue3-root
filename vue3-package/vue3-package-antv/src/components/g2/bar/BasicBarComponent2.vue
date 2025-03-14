<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Chart } from '@antv/g2';

export default defineComponent({
  name: 'G2Chart',
  setup() {
    // 使用 ref 绑定 DOM 元素
    const chartContainer = ref<HTMLElement | null>(null);

    // 在组件挂载后初始化图表
    onMounted(() => {
      if (chartContainer.value) {
        // 创建图表实例
        const chart = new Chart({
          container: chartContainer.value, // 绑定容器
        });

        // 配置图表
        chart.options({
          type: 'interval',
          autoFit: true,
          data: [
            { letter: 'A', frequency: 0.08167 },
            { letter: 'B', frequency: 0.01492 },
            { letter: 'C', frequency: 0.02782 },
            { letter: 'D', frequency: 0.04253 },
            { letter: 'E', frequency: 0.12702 },
            { letter: 'F', frequency: 0.02288 },
            { letter: 'G', frequency: 0.02015 },
            { letter: 'H', frequency: 0.06094 },
            { letter: 'I', frequency: 0.06966 },
            { letter: 'J', frequency: 0.00153 },
            { letter: 'K', frequency: 0.00772 },
            { letter: 'L', frequency: 0.04025 },
            { letter: 'M', frequency: 0.02406 },
            { letter: 'N', frequency: 0.06749 },
            { letter: 'O', frequency: 0.07507 },
            { letter: 'P', frequency: 0.01929 },
            { letter: 'Q', frequency: 0.00095 },
            { letter: 'R', frequency: 0.05987 },
            { letter: 'S', frequency: 0.06327 },
            { letter: 'T', frequency: 0.09056 },
            { letter: 'U', frequency: 0.02758 },
            { letter: 'V', frequency: 0.00978 },
            { letter: 'W', frequency: 0.0236 },
            { letter: 'X', frequency: 0.0015 },
            { letter: 'Y', frequency: 0.01974 },
            { letter: 'Z', frequency: 0.00074 },
          ],
          encode: { x: 'letter', y: 'frequency' },
        });

        // 渲染图表
        chart.render();
      }
    });

    return {
      chartContainer,
    };
  },
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px; /* 设置图表容器的高度 */
}
</style>