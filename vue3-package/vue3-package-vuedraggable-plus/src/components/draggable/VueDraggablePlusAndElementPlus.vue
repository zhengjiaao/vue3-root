<!-- App.vue -->
<template>
  <div class="container">
    <div class="box">
      <el-row>
        <el-col :span="12">
          <!--列表拖拽-带监听-->
          <VueDraggable v-model="list" @start="onStart" @end="onEnd">
            <transition-group>
              <el-card v-for="item in list" :key="item.id" class="draggable-card">
                {{ item.name }}
              </el-card>
            </transition-group>
          </VueDraggable>
        </el-col>
      </el-row>
    </div>

    <!-- 列表拖拽 -->
    <el-card class="box">
      <template #header>
        <div class="card-header">
          <span>列表拖拽</span>
        </div>
      </template>
      <VueDraggable
          v-model="list1"
          item-key="id"
          class="list-container"
          ghost-class="ghost-item"
      >
        <transition-group>
          <el-card v-for="item in list1" :key="item.id" shadow="hover" class="list-item">
            {{ item.name }}
          </el-card>
        </transition-group>
      </VueDraggable>
    </el-card>

    <!-- 表格行拖拽 todo 存在bug-->
    <el-card class="box">
      <template #header>
        <div class="card-header">
          <span>表格行拖拽-第3条拖拽存在问题</span>
        </div>
      </template>

      <VueDraggable
        v-model="tableData"
        @start="onStartTableData"
        @end="onEndTableData"
      >
        <el-row class="table-header">
          <el-col :span="8">名称</el-col>
          <el-col :span="8">年龄</el-col>
          <el-col :span="8">地址</el-col>
        </el-row>
        <transition-group>
          <el-row v-for="item in tableData" :key="item.name" class="table-row">
            <el-col :span="8">
              <el-icon class="drag-handler"><Menu /></el-icon>
              {{ item.name }}
            </el-col>
            <el-col :span="8">{{ item.age }}</el-col>
            <el-col :span="8">{{ item.address }}</el-col>
          </el-row>
        </transition-group>
      </VueDraggable>
    </el-card>

    <!-- 跨容器拖拽 -->
    <el-card class="box">
      <template #header>
        <div class="card-header">
          <span>跨容器拖拽</span>
        </div>
      </template>
      <div class="cross-container">
        <el-card class="box">
          <template #header>
            <div class="card-header">
              <span>容器1</span>
            </div>
          </template>
          <VueDraggable
              v-model="list2"
              group="shared"
              item-key="id"
              class="list-container"
          >
            <el-card v-for="item in list2" :key="item.id" shadow="hover" class="list-item">
              {{ item.name }}
            </el-card>
          </VueDraggable>
        </el-card>

        <el-card class="box">
          <template #header>
            <div class="card-header">
              <span>容器2</span>
            </div>
          </template>
          <VueDraggable
              v-model="list3"
              group="shared"
              item-key="id"
              class="list-container"
          >
            <el-card v-for="item in list3" :key="item.id" shadow="hover" class="list-item">
              {{ item.name }}
            </el-card>
          </VueDraggable>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {nextTick, ref} from 'vue'
import {ElCard, ElIcon, ElTable, ElTableColumn} from 'element-plus'
import {VueDraggable} from 'vue-draggable-plus'
import {Menu} from '@element-plus/icons-vue'

// 列表数据
const list = ref([
  {id: 1, name: 'Item 1'},
  {id: 2, name: 'Item 2'},
  {id: 3, name: 'Item 3'}
])

const onStart = (event: any) => {
  // 在拖拽开始时调用。
  console.log('Drag started', event);
  console.log('Drag started list', list.value);
}

const onEnd = (event: any) => {
  // 在拖拽结束后调用，例如更新数据或执行其他逻辑。
  console.log('Drag onEnd', event);
  console.log('Drag onEnd list', list.value);
}

// 列表数据
const list1 = ref([
  {id: 1, name: 'Item 1'},
  {id: 2, name: 'Item 2'},
  {id: 3, name: 'Item 3'}
])

// 表格数据
const tableData = ref([
  {id: 1, name: 'John', age: 20, address: 'New York'},
  {id: 2, name: 'Jane', age: 24, address: 'London'},
  {id: 3, name: 'Tom', age: 30, address: 'Sydney'}
])

const onStartTableData = (event: any) => {
  console.log('Drag started', event);
  console.log('Drag started tableData', tableData.value);
}

const onEndTableData = (event: any) => {
  console.log('Drag onEnd', event);
  console.log('Drag onEnd tableData', tableData.value);
  console.log('Drag onEnd tableData (JSON)', JSON.stringify(tableData.value, null, 2));
  console.log('Drag onEnd event.newIndex', event.newIndex);
  console.log('Drag onEnd event.oldIndex', event.oldIndex);
}

const onMoveTableData = (event: any) => {
  console.log('Drag move', event);
  // 确保数据项不会被错误地设置为 null
  if (event.draggedContext.element === null) {
    console.error('Dragged element is null');
  }
}

const onCloneTableData = (event: any) => {
  console.log('Drag clone', event);
  // 确保数据项不会被错误地设置为 null
  if (event.draggedContext.element === null) {
    console.error('Cloned element is null');
  }
}

const onChooseTableData = (event: any) => {
  console.log('Drag choose', event);
  // 确保数据项不会被错误地设置为 null
  if (event.draggedContext.element === null) {
    console.error('Chosen element is null');
  }
}

// 跨容器数据
const list2 = ref([
  {id: 4, name: 'Group A Item 1'},
  {id: 5, name: 'Group A Item 2'}
])

const list3 = ref([
  {id: 6, name: 'Group B Item 1'},
  {id: 7, name: 'Group B Item 2'}
])
</script>

<style scoped>
/* 保持原有样式不变 */
.container {
  padding: 20px;
  display: grid;
  gap: 20px;
}

.list-container {
  min-height: 150px;
}

.list-item {
  margin: 8px;
  padding: 12px;
  background: #fff;
  cursor: move;
}

.ghost-item {
  opacity: 0.5;
  background: #f5f7fa;
}

.cross-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.drag-handler {
  cursor: move;
  margin-right: 8px;
}

.flip-list-move {
  transition: transform 0.3s;
}

.draggable-card {
  margin: 10px;
}

.table-header {
  background-color: #f0f2f5;
  font-weight: bold;
  padding: 10px;
}

.table-row {
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
}

.table-row:hover {
  background-color: #f5f7fa;
}

.el-col {
  padding: 0 10px;
}
</style>