<template>
  <div class="container">
    <!-- 1. 基础列表拖拽 -->
    <div class="drag-section">
      <h3>基础列表拖拽</h3>
      <VueDraggable
          v-model="list1"
          :animation="150"
          class="list-group"
          ghost-class="ghost"
          chosen-class="chosen"
          drag-class="drag"
      >
        <div
            v-for="item in list1"
            :key="item.id"
            class="item"
        >
          {{ item.name }}
        </div>
      </VueDraggable>
    </div>

    <!-- 2. 跨容器拖拽 -->
    <div class="drag-section">
      <h3>跨容器拖拽</h3>
      <div class="container-group">
        <VueDraggable
            v-model="groupA"
            group="shared"
            class="list-group"
            :animation="200"
        >
          <div
              v-for="item in groupA"
              :key="item.id"
              class="item group-a"
          >
            {{ item.name }}
          </div>
        </VueDraggable>

        <VueDraggable
            v-model="groupB"
            group="shared"
            class="list-group"
            :animation="200"
        >
          <div
              v-for="item in groupB"
              :key="item.id"
              class="item group-b"
          >
            {{ item.name }}
          </div>
        </VueDraggable>
      </div>
    </div>

    <!-- 3. 克隆拖拽 -->
    <div class="drag-section">
      <h3>克隆拖拽</h3>
      <div class="container-group">
        <VueDraggable
            v-model="source"
            :group="{ name: 'clone', pull: 'clone', put: false }"
            class="list-group"
            :clone="handleClone"
        >
          <div
              v-for="item in source"
              :key="item.id"
              class="item clone-source"
          >
            {{ item.name }}
          </div>
        </VueDraggable>

        <VueDraggable
            v-model="target"
            group="clone"
            class="list-group"
        >
          <div
              v-for="item in target"
              :key="item.id"
              class="item clone-target"
          >
            {{ item.name }}
          </div>
        </VueDraggable>
      </div>
    </div>

    <!-- 4. 手柄拖拽 -->
    <div class="drag-section">
      <h3>手柄拖拽</h3>
      <VueDraggable
          v-model="list2"
          handle=".handle"
          class="list-group"
      >
        <div
            v-for="item in list2"
            :key="item.id"
            class="item"
        >
          <span class="handle">≡</span>
          {{ item.name }}
        </div>
      </VueDraggable>
    </div>

    <!-- 5. 拖拽删除 -->
    <div class="drag-section">
      <h3>拖拽删除</h3>
      <div
          class="trash-bin"
          @dragover.prevent
          @drop="handleDelete"
          :class="{ 'active': isDragOver }"
          @dragenter="isDragOver = true"
          @dragleave="isDragOver = false"
      >
        🗑️ 拖到此处删除
      </div>
    </div>

    <!-- 6. 表格行拖拽 -->
    <div class="drag-section">
      <h3>表格行拖拽</h3>
      <VueDraggable v-model="listTableData" target=".sort-target" :animation="150">
        <table class="styled-table">
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody class="sort-target">
          <tr v-for="item in listTableData" :key="item.name" class="cursor-move">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
          </tr>
          </tbody>
        </table>
      </VueDraggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

interface DragItem {
  id: number
  name: string
}

// 基础列表数据
const list1 = ref<DragItem[]>([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
])

// 跨容器数据
const groupA = ref<DragItem[]>([
  { id: 10, name: 'Group A-1' },
  { id: 11, name: 'Group A-2' }
])

const groupB = ref<DragItem[]>([
  { id: 20, name: 'Group B-1' },
  { id: 21, name: 'Group B-2' }
])

// 克隆数据
const source = ref<DragItem[]>([
  { id: 100, name: 'Source 1' },
  { id: 101, name: 'Source 2' }
])
const target = ref<DragItem[]>([])
let cloneId = 1000

const handleClone = (item: DragItem) => {
  return {
    ...item,
    id: cloneId++
  }
}

// 手柄列表数据
const list2 = ref<DragItem[]>([
  { id: 200, name: 'Handle Item 1' },
  { id: 201, name: 'Handle Item 2' },
  { id: 202, name: 'Handle Item 3' }
])

// 表格行拖拽数据
const listTableData = ref([
  {
    name: 'Joao',
    id: 1
  },
  {
    name: 'Jean',
    id: 2
  },
  {
    name: 'Johanna',
    id: 3
  },
  {
    name: 'Juan',
    id: 4
  }
])

// 删除功能
const isDragOver = ref(false)
const handleDelete = (e: DragEvent) => {
  const dragId = e.dataTransfer?.getData('text/plain')
  if (!dragId) return

  // 从所有列表中删除
  const allLists = [list1, groupA, groupB, source, target, list2]
  allLists.forEach(list => {
    list.value = list.value.filter(item => item.id.toString() !== dragId)
  })
  isDragOver.value = false
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.drag-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.list-group {
  min-height: 100px;
  padding: 10px;
  border: 2px dashed #ccc;
  border-radius: 6px;
  margin-top: 10px;
}

.item {
  padding: 12px;
  margin: 8px 0;
  background: #f8f9fa;
  border-radius: 4px;
  cursor: move;
  transition: all 0.3s;
}

.item:hover {
  background: #e9ecef;
}

.handle {
  cursor: move;
  margin-right: 10px;
  opacity: 0.6;
}

/* 拖拽状态样式 */
.ghost {
  opacity: 0.5;
  background: #c3e6ff;
}

.chosen {
  background: #b8daff !important;
}

.drag {
  opacity: 1;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* 不同组颜色 */
.group-a { background: #ffe3e3; }
.group-b { background: #e3ecff; }
.clone-source { background: #fff3cd; }
.clone-target { background: #d4edda; }

.trash-bin {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ff6b6b;
  border-radius: 8px;
  color: #ff6b6b;
  transition: all 0.3s;
}

.trash-bin.active {
  background: #ffe3e3;
  border-style: solid;
}

/* 表格样式 */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.styled-table th,
.styled-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.styled-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.styled-table tr:hover {
  background-color: #f5f5f5;
}

.styled-table tr.cursor-move:hover {
  background-color: #e9ecef;
}
</style>
