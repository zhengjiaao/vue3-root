<template>
  <div>
    <h1>AntV-g2 示例-基础折线图</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
      <div ref="chart2" class="chart"></div>
      <div ref="chart3" class="chart"></div>
      <div ref="chart4" class="chart"></div>
      <div ref="chart5" class="chart"></div>
      <div ref="chart6" class="chart"></div>
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

onMounted(() => { // 调用初始化方法
  initChart1();
  initChart2();
  initChart3();
  initChart4();
  initChart5();
  initChart6();
});

// 最简单的折线图
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
        { year: "1991", value: 3 },
        { year: "1992", value: 4 },
        { year: "1993", value: 3.5 },
        { year: "1994", value: 5 },
        { year: "1995", value: 4.9 },
        { year: "1996", value: 6 },
        { year: "1997", value: 7 },
        { year: "1998", value: 9 },
        { year: "1999", value: 13 },
      ],
      encode: { x: "year", y: "value" },
      scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
      children: [
        { type: "line", labels: [{ text: "value", style: { dx: -10, dy: -12 } }] },
        { type: "point", style: { fill: "white" }, tooltip: false },
      ],
      axis: { // 设置坐标轴标题
        x: {
          title: '年份', // 设置x轴标题
        },
        y: {
          title: '值', // 设置y轴标题
        },
      },
    });

    // 渲染图表
    chart.render();
  }
};

// 曲线折线图
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
        { month: "Jan", city: "Tokyo", temperature: 7 },
        { month: "Jan", city: "London", temperature: 3.9 },
        { month: "Feb", city: "Tokyo", temperature: 6.9 },
        { month: "Feb", city: "London", temperature: 4.2 },
        { month: "Mar", city: "Tokyo", temperature: 9.5 },
        { month: "Mar", city: "London", temperature: 5.7 },
        { month: "Apr", city: "Tokyo", temperature: 14.5 },
        { month: "Apr", city: "London", temperature: 8.5 },
        { month: "May", city: "Tokyo", temperature: 18.4 },
        { month: "May", city: "London", temperature: 11.9 },
        { month: "Jun", city: "Tokyo", temperature: 21.5 },
        { month: "Jun", city: "London", temperature: 15.2 },
        { month: "Jul", city: "Tokyo", temperature: 25.2 },
        { month: "Jul", city: "London", temperature: 17 },
        { month: "Aug", city: "Tokyo", temperature: 26.5 },
        { month: "Aug", city: "London", temperature: 16.6 },
        { month: "Sep", city: "Tokyo", temperature: 23.3 },
        { month: "Sep", city: "London", temperature: 14.2 },
        { month: "Oct", city: "Tokyo", temperature: 18.3 },
        { month: "Oct", city: "London", temperature: 10.3 },
        { month: "Nov", city: "Tokyo", temperature: 13.9 },
        { month: "Nov", city: "London", temperature: 6.6 },
        { month: "Dec", city: "Tokyo", temperature: 9.6 },
        { month: "Dec", city: "London", temperature: 4.8 },
      ],
      encode: { x: "month", y: "temperature", color: "city" },
      scale: { x: { range: [0, 1] }, y: { nice: true } }, // 设置y轴nicely, 自动设置y轴最大值和最小值
      axis: { // 设置坐标轴标题
        x: {
          title: '月份', // 设置x轴标题
        },
        y: {
          title: '温度', // 设置y轴标题
          labelFormatter: (d: number) => `${d}°C`, // 设置y轴标签格式，将数值转换为°C单位
        },
      },
      children: [
        { type: "line", encode: { shape: "smooth" } }, // 使用平滑曲线
        { type: "point", encode: { shape: "point" }, tooltip: false }, // 隐藏点标记
      ],
    });

    // 渲染图表
    chart.render();
  }
};

// 普通折线图
const initChart3 = () => {
  if (chart3.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart3.value, // 绑定容器
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
    });

    // 渲染图表
    chart.render();
  }
};

// 数据样本折线图
const initChart4 = () => {
  if (chart4.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart4.value, // 绑定容器
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
      transform: [{ type: "sample", thresholds: 200, strategy: "max" }],
    });

    // 渲染图表
    chart.render();
  }
};

// 归一化折线图
const initChart5 = () => {
// 定义数据项的类型
  interface DataItem {
    Date: string; // 假设 date 是字符串格式，如 "2023-01-01"
    price: number;
    symbol: string;
  }

  if (chart5.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart5.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "line",
      autoFit: true,
      insetRight: 10,
      data: {
        type: "fetch",
        value: "https://assets.antv.antgroup.com/g2/indices.json",
      },
      encode: { x: (d: DataItem) => new Date(d.Date), y: "Close", color: "Symbol" },
      transform: [{ type: "normalizeY", basis: "first", groupBy: "color" }],
      scale: { y: { type: "log" } },
      axis: { y: { title: "↑ Change in price (%)" } },
      labels: [{ text: "Symbol", selector: "last", fontSize: 10 }],
      tooltip: { items: [{ channel: "y", valueFormatter: ".1f" }] },
    });

    // 渲染图表
    chart.render();
  }
};

// 聚合折线图
const initChart6 = () => {
// 定义数据项的类型
  interface DataItem {
    date: string; // 假设 date 是字符串格式，如 "2023-01-01"
    price: number;
    symbol: string;
  }

  if (chart6.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart6.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "line",
      autoFit: true,
      data: {
        type: "fetch",
        value:
            "https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv",
      },
      encode: {
        x: (d: DataItem) => new Date(d.date).getFullYear(),
        y: "price",
        color: "symbol",
      },
      transform: [{ type: "groupX", y: "mean" }],
      labels: [
        { text: "price", transform: [{ type: "overlapDodgeY" }], fontSize: 10 },
      ],
      tooltip: { items: [{ channel: "y", valueFormatter: ".1f" }] },
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