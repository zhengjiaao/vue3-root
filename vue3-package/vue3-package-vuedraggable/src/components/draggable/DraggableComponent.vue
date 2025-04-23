<template>
  <div class="container">
    <!-- 基础使用 -->
    <section>
      <h2>基础拖拽列表</h2>
      <draggable
          v-model="basicList"
          item-key="id"
          class="list-group"
      >
        <template #item="{ element }">
          <div class="list-item">{{ element.name }}</div>
        </template>
      </draggable>
    </section>

    <!-- 高级使用 -->
    <section>
      <h2>高级拖拽功能</h2>
      <div class="advanced-container">
        <div>
          <h3>禁用拖拽</h3>
          <draggable
              v-model="disabledList"
              :disabled="true"
              item-key="id"
              class="list-group"
          >
            <template #item="{ element }">
              <div class="list-item">{{ element.name }}</div>
            </template>
          </draggable>
        </div>

        <div>
          <h3>克隆功能</h3>
          <draggable
              v-model="cloneList"
              :clone="cloneItem"
              item-key="id"
              group="cloneGroup"
              class="list-group"
          >
            <template #item="{ element }">
              <div class="list-item">{{ element.name }}</div>
            </template>
          </draggable>
        </div>
      </div>

      <div class="advanced-container">
        <div>
          <h3>拖拽手柄</h3>
          <draggable
              v-model="handleList"
              item-key="id"
              handle=".handle"
              class="list-group"
          >
            <template #item="{ element }">
              <div class="list-item">
                <span class="handle">☰</span>
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </div>

        <div>
          <h3>动画效果</h3>
          <draggable
              v-model="animatedList"
              item-key="id"
              class="list-group"
              tag="transition-group"
              :component-data="{ name: 'list' }"
          >
            <template #item="{ element }">
              <div class="list-item">{{ element.name }}</div>
            </template>
          </draggable>
        </div>
      </div>
    </section>

    <!-- 看板实例 -->
    <section>
      <h2>任务看板</h2>
      <div class="kanban-board">
        <div v-for="column in kanban" :key="column.status" class="kanban-column">
          <h3>{{ column.title }}</h3>
          <draggable
              v-model="column.tasks"
              group="tasks"
              item-key="id"
              class="task-list"
              @change="onKanbanChange"
          >
            <template #item="{ element }">
              <div class="task-card">
                <h4>{{ element.title }}</h4>
                <p>{{ element.content }}</p>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import draggable from 'vuedraggable';

interface ListItem {
  id: number;
  name: string;
}

interface Task {
  id: number;
  title: string;
  content: string;
  status: string;
}

export default defineComponent({
  components: { draggable },
  setup() {
    // 基础列表数据
    const basicList = reactive<ListItem[]>([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ]);

    // 禁用列表
    const disabledList = reactive<ListItem[]>([
      { id: 1, name: 'Disabled Item 1' },
      { id: 2, name: 'Disabled Item 2' },
    ]);

    // 克隆功能
    const cloneList = reactive<ListItem[]>([]);
    const cloneItem = (item: ListItem) => ({ ...item, id: Date.now() });

    // 手柄拖拽
    const handleList = reactive<ListItem[]>([
      { id: 1, name: 'Handle Item 1' },
      { id: 2, name: 'Handle Item 2' },
    ]);

    // 动画列表
    const animatedList = reactive<ListItem[]>([
      { id: 1, name: 'Animated 1' },
      { id: 2, name: 'Animated 2' },
    ]);

    // 看板数据
    const kanban = reactive([
      {
        title: 'To Do',
        status: 'todo',
        tasks: [
          { id: 1, title: 'Task 1', content: 'Content 1', status: 'todo' },
          { id: 2, title: 'Task 2', content: 'Content 2', status: 'todo' },
        ]
      },
      {
        title: 'In Progress',
        status: 'progress',
        tasks: [
          { id: 3, title: 'Task 3', content: 'Content 3', status: 'progress' },
        ]
      },
      {
        title: 'Done',
        status: 'done',
        tasks: [
          { id: 4, title: 'Task 4', content: 'Content 4', status: 'done' },
        ]
      }
    ]);

    const onKanbanChange = (event: any) => {
      if (event.added) {
        const task = event.added.element;
        const newStatus = kanban.find(col => col.tasks.includes(task))?.status;
        if (newStatus) task.status = newStatus;
      }
    };

    return {
      basicList,
      disabledList,
      cloneList,
      cloneItem,
      handleList,
      animatedList,
      kanban,
      onKanbanChange
    };
  }
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.list-group {
  min-height: 50px;
  border: 2px dashed #ccc;
  padding: 10px;
  margin: 10px 0;
}

.list-item {
  padding: 10px;
  margin: 5px 0;
  background: #f5f5f5;
  border: 1px solid #ddd;
  cursor: move;
}

.handle {
  cursor: move;
  margin-right: 10px;
}

.advanced-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.kanban-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.kanban-column {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.task-list {
  min-height: 200px;
  padding: 10px 0;
}

.task-card {
  background: white;
  padding: 10px;
  margin: 8px 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: move;
}

/* 过渡动画 */
.list-move {
  transition: transform 0.3s ease;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>