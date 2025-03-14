<template>
  <h1>初始化画布</h1>
  <div class="helloworld-app">
    <div class="app-content" ref="container1"></div>
  </div>

  <h1>渲染节点</h1>
  <div class="helloworld-app">
    <div class="app-content" ref="container2"></div>
  </div>

  <h1>渲染节点和边</h1>
  <div class="helloworld-app">
    <div class="app-content" ref="container3"></div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {Graph} from '@antv/x6'

const container1 = ref<HTMLDivElement | null>(null)
const container2 = ref<HTMLDivElement | null>(null)
const container3 = ref<HTMLDivElement | null>(null)

const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect',
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: 'hello',
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
      },
    },
    {
      id: 'node2',
      shape: 'rect',
      x: 160,
      y: 180,
      width: 100,
      height: 40,
      label: 'world',
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
      },
    },
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      label: 'x6',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
  ],
}

onMounted(() => {
      // 初始化画布
      if (container1.value) {
        const graph = new Graph({
          container: container1.value,
          // width: 800,
          // height: 600,
          background: {
            color: '#F2F7FA',
          },
        })
      }

      // 渲染节点
      if (container2.value) {
        const graph = new Graph({
          container: container2.value,
          // 设置画布背景颜色
          background: {
            color: '#F2F7FA',
          },
        })

        graph.addNode({
          x: 100,
          y: 100,
          width: 100,
          height: 40,
          label: 'hello',
          attrs: {
            body: {
              stroke: '#8f8f8f',
            }
          }
        })
      }

      // 渲染元素-渲染节点和边
      if (container3.value) {
        const graph = new Graph({
          container: container3.value,
          // 设置画布背景颜色
          background: {
            color: '#F2F7FA',
          },
        })

        graph.fromJSON(data) // 渲染元素
        graph.centerContent() // 居中显示
      }
    }
)
</script>

<style scoped>
.helloworld-app {
  display: flex;
  width: 100%;
  padding: 0;
  font-family: sans-serif;
}

.app-content {
  flex: 1;
  height: 280px;
  margin-right: 8px;
  margin-left: 8px;
  border-radius: 5px;
  box-shadow: 0 12px 5px -10px rgb(0 0 0 / 10%), 0 0 4px 0 rgb(0 0 0 / 10%);
}
</style>