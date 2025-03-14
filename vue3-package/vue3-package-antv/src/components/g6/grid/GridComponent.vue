<template>
  <div>
    <h1>AntV-g6 示例 - Grid 网格布局</h1>
    <div class="graph-container">
      <div>力导向图布局-Grid 网格布局</div>
      <div id="graph1" class="graph"></div>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import {Graph} from "@antv/g6";

onMounted(() => { // 调用初始化方法
  initGraph1();
});

// Force 聚类
const initGraph1 = () => { // 新增的初始化方法
  fetch('https://assets.antv.antgroup.com/g6/cluster.json')
      .then((res) => res.json())
      .then((data) => {
        const graph = new Graph({
          container: 'graph1',
          data,
          node: {
            style: {
              labelText: (d) => d.id,
              labelBackground: true,
            },
            palette: {
              type: 'group',
              field: 'cluster',
            },
          },
          layout: {
            type: 'grid',
            sortBy: 'id',
            nodeSize: 32,
          },
          behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
        });

        graph.render();

        window.addPanel((gui) => {
          gui.add({sortBy: 'id'}, 'sortBy', ['id', 'cluster']).onChange((type) => {
            graph.setLayout({
              type: 'grid',
              sortBy: type,
            });
            graph.layout();
          });
        });
      });
};

</script>

<style scoped>
.graph-container {
  display: flex;
  flex-direction: column; /* 确保图表垂直排列 */
  justify-content: space-around;
}

.graph {
  width: 100%; /* 设置图表容器的宽度为100% */
  height: 400px; /* 设置图表容器的高度 */
  margin-bottom: 20px; /* 添加间距 */
}
</style>
