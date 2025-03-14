<!-- DAG.vue -->
<template>
  <h1>使用 Vue3 组件渲染节点-自定义示例-未完成</h1>
  <div class="vue-shape-app">
    <div class="app-content" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {Graph} from '@antv/x6'
import {register} from '@antv/x6-vue-shape'
import AlgoNode from './AlgoNode.vue'
import {Selection} from '@antv/x6-plugin-selection'

import data from './data.json' // 导入本地 JSON 文件

// 注册自定义节点
register({
  shape: 'dag-node',
  width: 180,
  height: 36,
  component: AlgoNode,
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
    },
  },
})

Graph.registerEdge(
    'dag-edge',
    {
      inherit: 'edge',
      attrs: {
        line: {
          stroke: '#C2C8D5',
          strokeWidth: 1,
          targetMarker: null,
        },
      },
    },
    true,
)

Graph.registerConnector(
    'algo-connector',
    (s, e) => {
      const offset = 4
      const deltaY = Math.abs(e.y - s.y)
      const control = Math.floor((deltaY / 3) * 2)

      const v1 = {x: s.x, y: s.y + offset + control}
      const v2 = {x: e.x, y: e.y - offset - control}

      return `M ${s.x} ${s.y}
              L ${s.x} ${s.y + offset}
              C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
              L ${e.x} ${e.y}`
    },
    true,
)

const nodeStatusList = [
  [
    {id: '1', status: 'running'},
    {id: '2', status: 'default'},
    {id: '3', status: 'default'},
    {id: '4', status: 'default'},
  ],
  [
    {id: '1', status: 'success'},
    {id: '2', status: 'running'},
    {id: '3', status: 'default'},
    {id: '4', status: 'default'},
  ],
  [
    {id: '1', status: 'success'},
    {id: '2', status: 'success'},
    {id: '3', status: 'running'},
    {id: '4', status: 'running'},
  ],
  [
    {id: '1', status: 'success'},
    {id: '2', status: 'success'},
    {id: '3', status: 'success'},
    {id: '4', status: 'failed'},
  ],
]

const container = ref<HTMLDivElement | null>(null)
let graph: Graph | null = null

onMounted(() => {
  if (container.value) {
    graph = new Graph({
      container: container.value,
      panning: {
        enabled: true,
        eventTypes: ['leftMouseDown', 'mouseWheel'],
      },
      mousewheel: {
        enabled: true,
        modifiers: 'ctrl',
        factor: 1.1,
        maxScale: 1.5,
        minScale: 0.5,
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#31d0c6',
              strokeWidth: 4,
            },
          },
        },
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        connector: 'algo-connector',
        connectionPoint: 'anchor',
        anchor: 'center',
        validateMagnet({magnet}) {
          return magnet.getAttribute('port-group') !== 'top'
        },
        createEdge() {
          return graph!.createEdge({
            shape: 'dag-edge',
            attrs: {
              line: {
                strokeDasharray: '5 5',
              },
            },
            zIndex: -1,
          })
        },
      },
    })

    graph.use(
        new Selection({
          multiple: true,
          rubberEdge: true,
          rubberNode: true,
          modifiers: 'shift',
          rubberband: true,
        }),
    )

    graph.on('edge:connected', ({edge}) => {
      edge.attr({
        line: {
          strokeDasharray: '',
        },
      })
    })

    graph.on('node:change:data', ({node}) => {
      const edges = graph!.getIncomingEdges(node)
      const {status} = node.getData() as { id: string; status: string }
      edges?.forEach((edge) => {
        if (status === 'running') {
          edge.attr('line/strokeDasharray', 5)
          edge.attr('line/style/animation', 'running-line 30s infinite linear')
        } else {
          edge.attr('line/strokeDasharray', '')
          edge.attr('line/style/animation', '')
        }
      })
    })

    // 使用fetch 获取远程 JSON 数据
    // fetch('/data/dag.json')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     init(data)
    //     showNodeStatus(nodeStatusList)
    //     graph!.centerContent()
    //   })

    // 使用导入的本地 JSON 数据
    init(data)
    showNodeStatus(nodeStatusList)
    graph!.centerContent()
  }
})

const init = (data: any[]) => {
  const cells: any[] = []
  data.forEach((item) => {
    if (item.shape === 'dag-node') {
      cells.push(graph!.createNode(item))
    } else {
      cells.push(graph!.createEdge(item))
    }
  })
  graph!.resetCells(cells)
}

const showNodeStatus = async (statusList: any[][]) => {
  const status = statusList.shift()
  status?.forEach((item) => {
    const {id, status} = item
    const node = graph!.getCellById(id)
    const data = node.getData() as { id: string; status: string }
    node.setData({
      ...data,
      status,
    })
  })
  if (statusList.length > 0) {
    setTimeout(() => {
      showNodeStatus(statusList)
    }, 3000)
  }
}
</script>

<style lang="less" scoped>
.vue-shape-app {
  display: flex;
  width: 100%;
  padding: 0;
  font-family: sans-serif;
}

.app-content {
  flex: 1;
  height: 600px; /* 调整高度以适应内容 */
  margin-right: 8px;
  margin-left: 8px;
  border-radius: 5px;
  box-shadow: 0 12px 5px -10px rgb(0 0 0 / 10%), 0 0 4px 0 rgb(0 0 0 / 10%);
}
</style>
