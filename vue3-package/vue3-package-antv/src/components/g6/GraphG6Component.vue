<template>
  <div>Use G6 in Vue-基础关系图</div>
  <div id="container"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Graph } from "@antv/g6";

onMounted(() => {
  const graph = new Graph({
    container: document.getElementById("container"),
    width: 500,
    height: 500,
    data: {
      nodes: [
        {
          id: "node-1",
          style: { x: 50, y: 100 },
        },
        {
          id: "node-2",
          style: { x: 150, y: 100 },
        },
      ],
      edges: [{ id: "edge-1", source: "node-1", target: "node-2" }],
    },
    behaviors: ["drag-canvas", "zoom-canvas", "drag-element"],
  });

  graph.render();
});
</script>
