<template>
  <h1> 使用 Vue3 组件渲染节点-自定义示例</h1>
  <div class="vue-shape-app">
    <div class="app-content" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Graph } from '@antv/x6'
import { register, getTeleport } from '@antv/x6-vue-shape'
import CustomComponent from './VueShapeCustomComponent.vue'

// 注册自定义节点
register({
  shape: 'custom-vue-node',
  width: 100,
  height: 40,
  component: CustomComponent,
})

const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'custom-vue-node',
      x: 40,
      y: 40,
      width: 80,
      height: 20,
      label: 'hello',
    },
    {
      id: 'node2',
      shape: 'custom-vue-node',
      x: 160,
      y: 180,
      width: 80,
      height: 20,
      label: 'world',
    },
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      label: 'x6',
      attrs: {
        line: {
          // stroke: '#8f8f8f', // 连接线的颜色
          stroke: '#1046e4',
          strokeWidth: 1,
        },
      },
    },
  ],
}

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (container.value) {
    const graph = new Graph({
      container: container.value,
      background: {
        color: '#F2F7FA', // 画布背景颜色
      },
    })

    graph.fromJSON(data)
    graph.centerContent()
  }
})
</script>

<!--通过 <style> 标签引入 .less 文件，并使用 scoped 属性限制样式的作用范围仅限于当前组件-->
<style lang="less" scoped>
// 引入样式
@import "./styles/index.less";
</style>
