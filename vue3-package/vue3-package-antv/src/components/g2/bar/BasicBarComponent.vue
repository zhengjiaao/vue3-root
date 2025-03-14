<template>
  <div>
    <h1>AntV-g2 示例-基础柱状图</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
      <div ref="chart2" class="chart"></div>
      <div ref="chart3" class="chart"></div>
      <div ref="chart4" class="chart"></div>
      <div ref="chart5" class="chart"></div>
      <div ref="chart6" class="chart"></div>
      <div ref="chart7" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {Chart} from '@antv/g2';

const chart1 = ref<HTMLDivElement | null>(null); // 图表ref
const chart2 = ref<HTMLDivElement | null>(null);
const chart3 = ref<HTMLDivElement | null>(null);
const chart4 = ref<HTMLDivElement | null>(null);
const chart5 = ref<HTMLDivElement | null>(null);
const chart6 = ref<HTMLDivElement | null>(null);
const chart7 = ref<HTMLDivElement | null>(null);

onMounted(() => { // 调用初始化方法
  initChart1();
  initChart2();
  initChart3();
  initChart4();
  initChart5();
  initChart6();
  initChart7();
});

// 最简单的柱状图
const initChart1 = () => { // 新增的初始化方法
  if (chart1.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart1.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: 'interval', // 设置图表类型为柱状图
      autoFit: true, // 自动适配图表容器大小
      data: [
        {letter: 'A', frequency: 0.08167},
        {letter: 'B', frequency: 0.01492},
        {letter: 'C', frequency: 0.02782},
        {letter: 'D', frequency: 0.04253},
        {letter: 'E', frequency: 0.12702},
        {letter: 'F', frequency: 0.02288},
        {letter: 'G', frequency: 0.02015},
        {letter: 'H', frequency: 0.06094},
        {letter: 'I', frequency: 0.06966},
        {letter: 'J', frequency: 0.00153},
        {letter: 'K', frequency: 0.00772},
        {letter: 'L', frequency: 0.04025},
        {letter: 'M', frequency: 0.02406},
        {letter: 'N', frequency: 0.06749},
        {letter: 'O', frequency: 0.07507},
        {letter: 'P', frequency: 0.01929},
        {letter: 'Q', frequency: 0.00095},
        {letter: 'R', frequency: 0.05987},
        {letter: 'S', frequency: 0.06327},
        {letter: 'T', frequency: 0.09056},
        {letter: 'U', frequency: 0.02758},
        {letter: 'V', frequency: 0.00978},
        {letter: 'W', frequency: 0.0236},
        {letter: 'X', frequency: 0.0015},
        {letter: 'Y', frequency: 0.01974},
        {letter: 'Z', frequency: 0.00074},
      ],
      encode: {x: 'letter', y: 'frequency'}, // 设置 x 轴和 y 轴的编码，默认也是坐标轴标题
      axis: { // 设置坐标轴标题
        x: {
          title: '字母', // 设置x轴标题
        },
        y: {
          title: '频率', // 设置y轴标题
        },
      },
    });

    // 渲染图表
    chart.render();
  }
};

// 简单条形图
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
        {year: "1951 年", sales: 38},
        {year: "1952 年", sales: 52},
        {year: "1956 年", sales: 61},
        {year: "1957 年", sales: 145},
        {year: "1958 年", sales: 48},
        {year: "1959 年", sales: 38},
        {year: "1960 年", sales: 38},
        {year: "1962 年", sales: 38},
      ],
      encode: {x: "year", y: "sales"}, // 设置 x 轴和 y 轴的编码
      coordinate: {transform: [{type: "transpose"}]}, // 转置坐标系, 将 x 轴和 y 轴交换
    });

    // 渲染图表
    chart.render();
  }
};

// 简单堆叠柱形图
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

// 简单分组柱形图
const initChart4 = () => {
  if (chart4.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart4.value, // 绑定容器
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
      transform: [{ type: "dodgeX" }], // 柱形图分组
      interaction: { elementHighlight: { background: true } },
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

// 水平条形图
const initChart5 = () => {
  // 定义数据项的类型
  interface DataItem {
    letter: string;
    frequency: number;
  }

  if (chart5.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart5.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "interval",
      autoFit: true,
      data: {
        type: "fetch",
        value:
            "https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv",
        format: "csv",
      },
      encode: { x: "letter", y: "frequency" },
      transform: [{ type: "sortX", reverse: true }],
      coordinate: { transform: [{ type: "transpose" }] },
      axis: { y: { labelFormatter: ".0%" } },
      labels: [
        {
          text: "frequency",
          formatter: ".1%",
          textAlign: (d: DataItem) => (+d.frequency > 0.008 ? "right" : "start"),
          fill: (d: DataItem) => (+d.frequency > 0.008 ? "#fff" : "#000"),
          dx: (d: DataItem) => (+d.frequency > 0.008 ? -5 : 5),
        },
      ],
    });

    // 渲染图表
    chart.render();
  }
};

// 直方图
const initChart6 = () => {
  // 定义数据项的类型
  interface DataItem {
    letter: string;
    frequency: number;
  }

  if (chart6.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart6.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "interval",
      autoFit: true,
      height: 500,
      data: [
        { value: [0, 2], count: 1 },
        { value: [2, 4], count: 2 },
        { value: [4, 6], count: 3 },
        { value: [6, 8], count: 6 },
        { value: [8, 10], count: 8 },
        { value: [10, 12], count: 11 },
        { value: [12, 14], count: 7 },
        { value: [14, 16], count: 6 },
        { value: [16, 18], count: 5 },
        { value: [18, 20], count: 2 },
        { value: [20, 22], count: 2 },
        { value: [22, 24], count: 1 },
      ],
      encode: { x: "value", y: "count" },
      scale: { value: { min: 0, tickInterval: 2 }, count: { max: 14, nice: true } },
    });

    // 渲染图表
    chart.render();
  }
};

// 双轴条形图
const initChart7 = () => {
  if (chart7.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart7.value, // 绑定容器
    });

    // 创建图表实例
    chart.options({
      type: "view",
      autoFit: true,
      data: [
        { time: "10:10", call: 4, waiting: 2, people: 2 },
        { time: "10:15", call: 2, waiting: 6, people: 3 },
        { time: "10:20", call: 13, waiting: 2, people: 5 },
        { time: "10:25", call: 9, waiting: 9, people: 1 },
        { time: "10:30", call: 5, waiting: 2, people: 3 },
        { time: "10:35", call: 8, waiting: 2, people: 1 },
        { time: "10:40", call: 13, waiting: 1, people: 2 },
      ],
      children: [
        {
          type: "interval",
          encode: {
            x: "time",
            y: "waiting",
            color: () => "waiting",
            series: () => "waiting",
          },
          axis: { y: { title: "Waiting" } },
        },
        {
          type: "interval",
          encode: {
            x: "time",
            y: "people",
            color: () => "people",
            series: () => "people",
          },
          scale: { y: { independent: true } },
          axis: { y: { position: "right", grid: null, title: "People" } },
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