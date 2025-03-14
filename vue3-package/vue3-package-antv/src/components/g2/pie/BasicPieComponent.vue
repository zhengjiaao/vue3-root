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

// 定义数据项的类型
interface DataItem {
  item: string;
  count: number;
  percent: number;
}

// 最简单的饼图
const initChart1 = () => { // 新增的初始化方法
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
        {item: "事例一", count: 40, percent: 0.4},
        {item: "事例二", count: 21, percent: 0.21},
        {item: "事例三", count: 17, percent: 0.17},
        {item: "事例四", count: 13, percent: 0.13},
        {item: "事例五", count: 9, percent: 0.09},
      ],
      encode: {y: "percent", color: "item"},
      transform: [{type: "stackY"}],
      coordinate: {type: "theta", outerRadius: 0.8},
      legend: {
        color: {position: "bottom", layout: {justifyContent: "center"}},
      },
      labels: [
        {
          position: "outside",
          // text: (data) => `${data.item}: ${data.percent * 100}%`,
          text: (data: DataItem) => `${data.item}: ${data.percent * 100}%`,
        },
      ],
      tooltip: {
        items: [
          (data) => ({
            name: data.item,
            value: `${data.percent * 100}%`,
          }),
        ],
      },
    });

    // 渲染图表
    chart.render();
  }
};

// 简单环图
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
      coordinate: {type: "theta", outerRadius: 0.8, innerRadius: 0.5},
      children: [
        {
          type: "interval",
          data: [
            {item: "事例一", count: 40, percent: 0.4},
            {item: "事例二", count: 21, percent: 0.21},
            {item: "事例三", count: 17, percent: 0.17},
            {item: "事例四", count: 13, percent: 0.13},
            {item: "事例五", count: 9, percent: 0.09},
          ],
          encode: {y: "percent", color: "item"},
          transform: [{type: "stackY"}],
          legend: {
            color: {position: "bottom", layout: {justifyContent: "center"}},
          },
          labels: [
            {
              position: "outside",
              // text: (data) => `${data.item}: ${data.percent * 100}%`,
              text: (data: DataItem) => `${data.item}: ${data.percent * 100}%`,
            },
          ],
          tooltip: {
            items: [
              (data) => ({
                name: data.item,
                value: `${data.percent * 100}%`,
              }),
            ],
          },
        },
        {
          type: "text",
          style: {
            text: "主机",
            x: "50%",
            y: "50%",
            dy: -25,
            fontSize: 34,
            fill: "#8c8c8c",
            textAlign: "center",
          },
        },
        {
          type: "text",
          style: {
            text: "200",
            x: "50%",
            y: "50%",
            dx: -25,
            dy: 25,
            fontSize: 44,
            fill: "#8c8c8c",
            textAlign: "center",
          },
        },
        {
          type: "text",
          style: {
            text: "台",
            x: "50%",
            y: "50%",
            dx: 35,
            dy: 25,
            fontSize: 34,
            fill: "#8c8c8c",
            textAlign: "center",
          },
        },
      ],
    });

    // 渲染图表
    chart.render();
  }
};

// 2018 年第一季度短视频用户性别分布
const initChart3 = () => {
  if (chart3.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart3.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "facetRect",
      autoFit: true,
      data: [
        {type: "男性", percent: 56.4, color: "#0a9afe"},
        {type: "女性", percent: 43.6, color: "#f0657d"},
      ],
      encode: {x: "type"},
      axis: false,
      legend: false,
      children: [
        {
          type: "view",
          frame: false,
          coordinate: {type: "theta", innerRadius: 0.5, outerRadius: 0.8},
          children: [
            {
              type: "interval",
              encode: {y: 100},
              scale: {y: {zero: true}},
              style: {fill: "#e8e8e8"},
              animate: false,
              tooltip: false,
            },
            {
              type: "interval",
              encode: {y: "percent", color: "color"},
              scale: {color: {type: "identity"}},
              animate: {enter: {type: "waveIn", duration: 1000}},
              tooltip: {
                items: [
                  (data) => ({
                    name: data.type,
                    value: data.percent,
                  }),
                ],
              },
            },
            {
              type: "text",
              encode: {text: "type"},
              style: {
                textAlign: "center",
                textBaseline: "middle",
                fontSize: 20,
                color: "#8c8c8c",
                x: "50%",
                y: "50%",
                dy: -20,
              },
            },
            {
              type: "text",
              encode: {text: "percent"},
              style: {
                textAlign: "center",
                textBaseline: "middle",
                fontSize: 30,
                fontWeight: 500,
                color: "#000",
                x: "50%",
                y: "50%",
                dy: 20,
              },
            },
          ],
        },
      ],
    });

    // 渲染图表
    chart.render();
  }
};

// 饼图, 蜘蛛布局标签
const initChart4 = () => {
  // 定义数据项的类型
  interface DataItem {
    id: string; // 假设 id 是字符串格式
    value: number;
  }

  if (chart4.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart4.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "interval",
      width: 500,
      height: 400,
      data: [
        {id: "c", value: 526},
        {id: "sass", value: 220},
        {id: "php", value: 325},
        {id: "elixir", value: 561},
        {id: "rust", value: 54},
      ],
      encode: {y: "value", color: "id"},
      transform: [{type: "stackY"}],
      scale: {
        color: {range: ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb"]},
      },
      coordinate: {type: "theta", innerRadius: 0.25, outerRadius: 0.8},
      style: {radius: 4, stroke: "#fff", lineWidth: 2},
      animate: {enter: {type: "waveIn"}},
      legend: false,
      labels: [
        {text: "value", fontWeight: "bold", offset: 14},
        {
          text: "id",
          position: "spider",
          connectorDistance: 0,
          fontWeight: "bold",
          textBaseline: "bottom",
          textAlign: (d: DataItem) => (["c", "sass"].includes(d.id) ? "end" : "start"),
          dy: -4,
        },
      ],
    });

    // 渲染图表
    chart.render();
  }
};

// 饼图, 蜘蛛布局标签-主题为 暗色风格
const initChart5 = () => {
  // 定义数据项的类型
  interface DataItem {
    id: string; // 假设 id 是字符串格式
    value: number;
  }

  if (chart5.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart5.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "interval",
      theme: {type: "classicDark", view: {viewFill: "#141414"}},
      width: 500,
      height: 400,
      data: [
        {id: "c", value: 526},
        {id: "sass", value: 220},
        {id: "php", value: 325},
        {id: "elixir", value: 561},
        {id: "rust", value: 54},
      ],
      encode: {y: "value", color: "id"},
      transform: [{type: "stackY"}],
      coordinate: {type: "theta", innerRadius: 0.25, outerRadius: 0.8},
      style: {radius: 4, inset: 1},
      animate: {enter: {type: "waveIn", duration: 1000}},
      legend: false,
      labels: [
        {text: "value", offset: 14, fontWeight: "bold"},
        {
          text: "id",
          position: "spider",
          connectorDistance: 0,
          fontWeight: "bold",
          textBaseline: "bottom",
          textAlign: (d: any) => (["c", "sass"].includes(d.id) ? "end" : "start"),
          dy: -4,
        },
      ],
    });

    // 渲染图表
    chart.render();
  }
};


// 调整蜘蛛布局
const initChart6 = () => {
  // 定义数据项的类型
  interface DataItem {
    id: string; // 假设 id 是字符串格式
    type: string;
    value: number;
  }

  if (chart6.value) {
    // 创建图表实例
    const chart = new Chart({
      container: chart6.value, // 绑定容器
    });

    // 配置图表
    chart.options({
      type: "interval",
      data: [
        {type: "微博", value: 93.33},
        {type: "其他", value: 6.67},
        {type: "论坛", value: 4.77},
        {type: "网站", value: 1.44},
        {type: "微信", value: 1.12},
        {type: "客户端", value: 1.05},
        {type: "新闻", value: 0.81},
        {type: "视频", value: 0.39},
        {type: "博客", value: 0.37},
        {type: "报刊", value: 0.17},
      ],
      encode: {y: "value", color: "type"},
      transform: [{type: "stackY"}],
      coordinate: {type: "theta"},
      animate: {enter: {type: "waveIn"}},
      legend: false,
      labels: [{position: "spider", text: (d: DataItem) => `${d.type} (${d.value})`}],
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