<template>
  <div>
    <button @click="addItem">添加项</button>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.text }} (ID: {{ item.id }})
      </li>
    </ul>

    <div>
      <button @click="generateNewId">生成UUID</button>
      <p v-if="generatedId">生成的ID: {{ generatedId }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

interface Item {
  id: string;
  text: string;
}

const items = ref<Item[]>([]);

function addItem() {
  items.value.push({
    id: uuidv4(), // 生成唯一ID
    text: `Item ${items.value.length + 1}`
  });
}

const generatedId = ref('');

function generateNewId() {
  generatedId.value = uuidv4();
}
</script>