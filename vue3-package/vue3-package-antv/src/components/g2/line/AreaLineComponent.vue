<template>
  <div>
    <h1>AntV-g2 示例-区域面积图</h1>
    <div class="chart-container">
      <!-- 图表容器 -->
      <div ref="chart1" class="chart"></div>
      <div ref="chart2" class="chart"></div>
      <div ref="chart3" class="chart"></div>
      <div ref="chart4" class="chart"></div>
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
const chart4 = ref<HTMLDivElement | null>(null);
const chart5 = ref<HTMLDivElement | null>(null);

onMounted(() => { // 调用初始化方法
  initChart1();
  initChart2();
  initChart3();
  initChart4();
  initChart5();
});

// 简单面积图
const initChart1 = () => { // 新增的初始化方法
  // 定义数据项的类型
  interface DataItem {
    year: string; // 假设 date 是字符串格式，如 "2023-01-01"
    price: number;
    symbol: string;
  }

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
        {year: "1991", value: 15468},
        {year: "1992", value: 16100},
        {year: "1993", value: 15900},
        {year: "1994", value: 17409},
        {year: "1995", value: 17000},
        {year: "1996", value: 31056},
        {year: "1997", value: 31982},
        {year: "1998", value: 32040},
        {year: "1999", value: 33233},
      ],
      children: [
        {
          type: "area",
          encode: {x: (d: DataItem) => d.year, y: "value", shape: "area"},
          style: {opacity: 0.2},
          axis: {y: {labelFormatter: "~s", title: false}},
        },
        {type: "line", encode: {x: "year", y: "value", shape: "line"}},
      ],
    });

    // 渲染图表
    chart.render();
  }
};

// 面积图
const initChart2 = () => {
  // 定义数据项的类型
  interface DataItem {
    date: string; // 假设 date 是字符串格式，如 "2023-01-01"
    price: number;
    symbol: string;
  }

  if (chart2.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart2.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "area",
      autoFit: true,
      data: {
        type: "fetch",
        value: "https://assets.antv.antgroup.com/g2/aapl.json",
      },
      encode: {x: (d: DataItem) => new Date(d.date), y: "close"},
    });

    // 渲染图表
    chart.render();
  }
};

// 百分比堆叠面积图
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
        {country: "Asia", year: "1750", value: 502},
        {country: "Asia", year: "1800", value: 635},
        {country: "Asia", year: "1850", value: 809},
        {country: "Asia", year: "1900", value: 947},
        {country: "Asia", year: "1950", value: 1402},
        {country: "Asia", year: "1999", value: 3634},
        {country: "Asia", year: "2050", value: 5268},
        {country: "Africa", year: "1750", value: 106},
        {country: "Africa", year: "1800", value: 107},
        {country: "Africa", year: "1850", value: 111},
        {country: "Africa", year: "1900", value: 133},
        {country: "Africa", year: "1950", value: 221},
        {country: "Africa", year: "1999", value: 767},
        {country: "Africa", year: "2050", value: 1766},
        {country: "Europe", year: "1750", value: 163},
        {country: "Europe", year: "1800", value: 203},
        {country: "Europe", year: "1850", value: 276},
        {country: "Europe", year: "1900", value: 408},
        {country: "Europe", year: "1950", value: 547},
        {country: "Europe", year: "1999", value: 729},
        {country: "Europe", year: "2050", value: 628},
      ],
      encode: {x: "year", y: "value", color: "country"},
      transform: [{type: "stackY"}, {type: "normalizeY"}],
      axis: {x: {title: false}, y: {title: false, labelFormatter: ".0%"}},
      children: [
        {
          type: "area",
          style: {fillOpacity: 0.3},
          tooltip: {items: [{channel: "y0", valueFormatter: ".0%"}]},
        },
        {type: "line", tooltip: false},
      ],
    });

    // 渲染图表
    chart.render();
  }
};

// 堆叠面积图
const initChart4 = () => {
  // 定义数据项的类型
  interface DataItem {
    date: string; // 假设 date 是字符串格式，如 "2023-01-01"
    price: number;
    symbol: string;
  }

  if (chart4.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart4.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "area",
      autoFit: true,
      data: {
        type: "fetch",
        value: "https://assets.antv.antgroup.com/g2/unemployment-by-industry.json",
      },
      encode: {
        x: (d: DataItem) => new Date(d.date),
        y: "unemployed",
        color: "industry",
        shape: "smooth",
      },
      transform: [{type: "stackY"}],
    });

    // 渲染图表
    chart.render();
  }
};

// 出现顺序堆叠面积图
const initChart5 = () => {
  // 定义数据项的类型
  interface DataItem {
    date: string; // 假设 date 是字符串格式，如 "2023-01-01"
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
      type: "area",
      autoFit: true,
      data: {
        type: "fetch",
        value: "https://assets.antv.antgroup.com/g2/unemployment-by-industry.json",
      },
      encode: {x: (d: DataItem) => new Date(d.date), y: "unemployed", color: "industry"},
      transform: [{type: "stackY"}, {type: "normalizeY"}],
      tooltip: {items: [{channel: "y0", valueFormatter: ".3f"}]},
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