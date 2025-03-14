<template>
  <div>
    <h1>AntV-g6 示例 - 力导向图布局</h1>
    <div class="graph-container">
      <div>力导向图布局-Force 聚类</div>
      <div id="graph1" class="graph"></div>

      <div>力导向图布局-D3 力导向布局</div>
      <div id="graph2" class="graph"></div>

      <div>力导向图布局-定制不同节点的参数</div>
      <div id="graph3" class="graph"></div>

      <div>力导向图布局-固定被做拽节点</div>
      <div id="graph4" class="graph"></div>

      <div>力导向图布局-力导向布局防止节点重叠</div>
      <div id="graph5" class="graph"></div>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import {Graph} from "@antv/g6";

onMounted(() => { // 调用初始化方法
  initGraph1();
  initGraph2();
  initGraph3();
  initGraph4();
  initGraph5();
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
              ports: [],
            },
            palette: {
              type: 'group',
              field: 'cluster',
            },
          },
          layout: {
            type: 'force',
            linkDistance: 50,
            clustering: true,
            nodeClusterBy: 'cluster',
            clusterNodeStrength: 70,
          },
          behaviors: ['zoom-canvas', 'drag-canvas'],
        });

        graph.render();
      });
};

// D3 力导向布局
const initGraph2 = () => {
  fetch('https://assets.antv.antgroup.com/g6/cluster.json')
      .then((res) => res.json())
      .then((data) => {
        const graph = new Graph({
          container: 'graph2',
          data,
          node: {
            style: {
              labelText: (d) => d.id,
              ports: [],
            },
            palette: {
              type: 'group',
              field: 'cluster',
            },
          },
          layout: {
            type: 'd3-force',
            collide: {
              strength: 0.5,
            },
          },
          behaviors: ['zoom-canvas', 'drag-canvas'],
        });

        graph.render();
      });
};

// 定制不同节点的参数
const initGraph3 = () => {
  const data = {
    nodes: [
      {id: 'node0', size: 50},
      {id: 'node1', size: 30},
      {id: 'node2', size: 30},
      {id: 'node3', size: 30},
      {id: 'node4', size: 30, isLeaf: true},
      {id: 'node5', size: 30, isLeaf: true},
      {id: 'node6', size: 15, isLeaf: true},
      {id: 'node7', size: 15, isLeaf: true},
      {id: 'node8', size: 15, isLeaf: true},
      {id: 'node9', size: 15, isLeaf: true},
      {id: 'node10', size: 15, isLeaf: true},
      {id: 'node11', size: 15, isLeaf: true},
      {id: 'node12', size: 15, isLeaf: true},
      {id: 'node13', size: 15, isLeaf: true},
      {id: 'node14', size: 15, isLeaf: true},
      {id: 'node15', size: 15, isLeaf: true},
      {id: 'node16', size: 15, isLeaf: true},
    ],
    edges: [
      {source: 'node0', target: 'node1'},
      {source: 'node0', target: 'node2'},
      {source: 'node0', target: 'node3'},
      {source: 'node0', target: 'node4'},
      {source: 'node0', target: 'node5'},
      {source: 'node1', target: 'node6'},
      {source: 'node1', target: 'node7'},
      {source: 'node2', target: 'node8'},
      {source: 'node2', target: 'node9'},
      {source: 'node2', target: 'node10'},
      {source: 'node2', target: 'node11'},
      {source: 'node2', target: 'node12'},
      {source: 'node2', target: 'node13'},
      {source: 'node3', target: 'node14'},
      {source: 'node3', target: 'node15'},
      {source: 'node3', target: 'node16'},
    ],
  };

  const graph = new Graph({
    container: 'graph3',
    data,
    node: {
      style: {
        size: (d) => d.size,
      },
    },
    layout: {
      type: 'd3-force',
      link: {
        distance: (d) => {
          if (d.source.id === 'node0') {
            return 100;
          }
          return 30;
        },
        strength: (d) => {
          if (d.source.id === 'node1' || d.source.id === 'node2' || d.source.id === 'node3') {
            return 0.7;
          }
          return 0.1;
        },
      },
      manyBody: {
        strength: (d) => {
          if (d.isLeaf) {
            return -50;
          }
          return -10;
        },
      },
    },
    behaviors: ['drag-element-force'],
  });

  graph.render();
};

// 固定被做拽节点
const initGraph4 = () => {
  const data = {
    nodes: new Array(10).fill(0).map((_, i) => ({id: `${i}`, label: `${i}`})),
    edges: [
      {source: '0', target: '1'},
      {source: '0', target: '2'},
      {source: '0', target: '3'},
      {source: '0', target: '4'},
      {source: '0', target: '5'},
      {source: '0', target: '7'},
      {source: '0', target: '8'},
      {source: '0', target: '9'},
      {source: '2', target: '3'},
      {source: '4', target: '5'},
      {source: '4', target: '6'},
      {source: '5', target: '6'},
    ],
  };

  const graph = new Graph({
    container: 'graph4',
    data,
    node: {
      style: {
        labelText: (d) => d.label,
        labelPlacement: 'middle',
        labelFill: '#fff',
      },
    },
    layout: {
      type: 'd3-force',
      link: {
        distance: 100,
        strength: 2
      },
      collide: {
        radius: 40,
      },
    },
    behaviors: [
      {
        type: 'drag-element-force',
        fixed: true,
      },
    ],
  });

  graph.render();
};

// 力导向布局防止节点重叠
const initGraph5 = () => {
  fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
      .then((res) => res.json())
      .then((data) => {
        const nodes = data.nodes;
        // randomize the node size
        nodes.forEach((node) => {
          node.size = Math.random() * 30 + 5;
        });

        const graph = new Graph({
          container: 'graph5',
          autoFit: 'center',
          data,
          node: {
            style: {
              size: (d) => d.size,
              lineWidth: 1,
            },
          },
          layout: {
            type: 'd3-force',
            collide: {
              // Prevent nodes from overlapping by specifying a collision radius for each node.
              radius: (d) => d.size / 2,
            },
          },
          behaviors: ['drag-element-force'],
        });

        graph.render();
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
