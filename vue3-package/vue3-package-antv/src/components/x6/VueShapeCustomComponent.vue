<template>
  <Dropdown :trigger="['contextmenu']">
    <div class="custom-vue-node">{{ label }}</div>
    <template #overlay>
      <Menu :items="menuItems" />
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { Dropdown, Menu } from 'ant-design-vue'

// 定义 node 的类型接口
interface Node {
  prop(key: string): string
}

const props = defineProps<{
  node: Node
}>()

// 使用 computed 确保 label 是响应式的
const label = computed(() => props.node.prop('label'))

const menuItems = [
  { key: 'copy', label: '复制' },
  { key: 'paste', label: '粘贴' },
  { key: 'delete', label: '删除' },
]
</script>

<style lang="less" scoped>
.custom-vue-node {
  display: flex;
  align-items: center;
  justify-content: center;
  //width: 100%;
  //height: 100%;
  width: 80px;
  height: 20px;
  background-color: #fff;
  border: 1px solid #8f8f8f;
  border-radius: 6px;
  position: relative; /* 确保连接线可以相对于这个元素定位 */
}

.custom-vue-node span {
  display: inline-block;
  width: 100%;
  height: 100%;
}

/* 添加调试样式 */
.custom-vue-node::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //width: 80px;
  //height: 20px;
  border: 1px dashed red; /* 调试用的虚线框 */
}
</style>
