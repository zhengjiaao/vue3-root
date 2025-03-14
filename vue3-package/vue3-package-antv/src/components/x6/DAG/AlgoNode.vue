<!-- AlgoNode.vue -->
<template>
  <div :class="['node', status]">
    <img :src="image.logo" alt="logo"/>
    <span class="label">{{ label }}</span>
    <span class="status">
      <img v-if="status === 'success'" :src="image.success" alt="success"/>
      <img v-if="status === 'failed'" :src="image.failed" alt="failed"/>
      <img v-if="status === 'running'" :src="image.running" alt="running"/>
    </span>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'

interface NodeStatus {
  id: string
  status: 'default' | 'success' | 'failed' | 'running'
  label?: string
}

const props = defineProps<{
  node: NodeStatus
}>()

const image = {
  logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ',
  success: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ',
  failed: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ',
  running: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ',
}

const {id, status = 'default', label} = props.node
</script>

<style lang="less" scoped>
.node {
  display: flex;
  align-items: center;
  width: 100%;
  /*height: 100%;*/
  /*width: 200px;
  height: 20px;*/
  /*height: 20px;*/
  height: 35px;
  background-color: #fff;
  border: 1px solid #c2c8d5;
  border-left: 4px solid #5F95FF;
  border-radius: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
  /*position: relative;*/ /* 确保连接线可以相对于这个元素定位 */
}

/* 添加调试样式 */
/*.node::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  !*width: 80px;
  height: 20px;*!
  border: 1px dashed red; !* 调试用的虚线框 *!
}*/

.node img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-left: 8px;
}

.node .label {
  display: inline-block;
  flex-shrink: 0;
  width: 104px;
  /* height: 20px;*/
  margin-left: 8px;
  color: #666;
  font-size: 12px;
}

.node .status {
  flex-shrink: 0;
}

.node.success {
  border-left: 4px solid #52c41a;
}

.node.failed {
  border-left: 4px solid #ff4d4f;
}

.node.running .status img {
  animation: spin 1s linear infinite;
}

.x6-node-selected .node {
  border-color: #1890ff;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #d4e8fe;
}

.x6-node-selected .node.success {
  border-color: #52c41a;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #ccecc0;
}

.x6-node-selected .node.failed {
  border-color: #ff4d4f;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #fedcdc;
}

.x6-edge:hover path:nth-child(2) {
  stroke: #1890ff;
  stroke-width: 1px;
}

.x6-edge-selected path:nth-child(2) {
  stroke: #1890ff;
  stroke-width: 1.5px !important;
}

@keyframes running-line {
  to {
    stroke-dashoffset: -1000;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
