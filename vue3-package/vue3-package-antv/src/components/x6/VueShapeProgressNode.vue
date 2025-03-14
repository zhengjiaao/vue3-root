<template>
  <h1> 使用 Vue3 组件渲染节点-官网示例</h1>
  <div class="app">
    <div id="container" class="app-content"></div>
    <TeleportContainer/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ProgressNode from './VueShapeProgressNodeComponent.vue'
import {Graph} from '@antv/x6'
import {register, getTeleport} from '@antv/x6-vue-shape'

register({
  shape: 'custom-vue-node',
  width: 100,
  height: 100,
  component: ProgressNode,
})
const TeleportContainer = getTeleport()

export default defineComponent({
  name: 'App',
  components: {
    TeleportContainer,
  },
  mounted() {
    const graph = new Graph({
      container: document.getElementById('container')!,
      background: {
        color: '#F2F7FA',
      },
      autoResize: true,
    })

    graph.addNode({
      shape: 'custom-vue-node',
      x: 100,
      y: 60,
    })
  },
})
</script>

<style lang="less" scoped>
.app {
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