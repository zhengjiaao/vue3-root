<template>
  <div>Use G6 in Vue-完整配置-关系图</div>
  <div id="container"></div>
</template>

<script setup>
import {onMounted} from "vue";
import {Graph} from "@antv/g6";

onMounted(() => {
  // 创建图实例
  const graph = new Graph({
    // 基础配置
    container: 'container',
    width: 800,
    height: 600,
    autoResize: true,

    // 视口配置
    zoom: 0.8,
    autoFit: 'view',
    padding: 20,

    // 主题配置
    theme: 'dark',

    // 节点配置
    node: {
      style: {
        fill: '#7FFFD4',
        stroke: '#5CACEE',
        lineWidth: 2,
      },
    },

    // 边配置
    edge: {
      style: {
        stroke: '#A4D3EE',
        lineWidth: 1.5,
        endArrow: true,
      },
    },

    // 布局配置
    layout: {
      type: 'force',
      preventOverlap: true,
      linkDistance: 100,
    },

    // 交互行为
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],

    // 初始数据
    data: {
      nodes: [
        {id: 'node1', data: {label: '节点1'}},
        {id: 'node2', data: {label: '节点2'}},
      ],
      edges: [{source: 'node1', target: 'node2', data: {label: '关系'}}],
    },
  });

  // 渲染图
  graph.render();
});
</script>
