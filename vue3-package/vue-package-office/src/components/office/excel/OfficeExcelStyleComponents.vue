<template>
  <div>
    <button @click="loadExcel">加载Excel文件</button>

    <div v-if="loading" class="loading">
      <span>加载中...</span>
      <progress :value="progress" max="100"></progress>
    </div>

    <vue-office-excel
        v-if="excelData && !loading"
        :src="excelData"
        :options="excelOptions"
        style="height: 600px; border: 1px solid #eee;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueOfficeExcel from '@vue-office/excel';

const loading = ref(false);
const progress = ref(0);
const excelData = ref<ArrayBuffer | null>(null);

const excelOptions = ref({
  gridLines: true,  // 显示网格线
  headerBackground: '#f5f5f5', // 表头背景色
  cellPadding: 8,   // 单元格内边距
});

const loadExcel = async () => {
  loading.value = true;
  progress.value = 0;

  try {
    // 模拟分块加载
    // const response = await fetch('https://example.com/large-file.xlsx');
    const response = await fetch('/api/file/test.xlsx');
    const reader = response.body?.getReader();

    if (!reader) throw new Error('无法读取文件流');

    let receivedLength = 0;
    const chunks: Uint8Array[] = [];
    const contentLength = parseInt(response.headers.get('Content-Length') || '0');

    while(true) {
      const {done, value} = await reader.read();

      if (done) break;

      chunks.push(value);
      receivedLength += value.length;
      progress.value = Math.round((receivedLength / contentLength) * 100);
    }

    const chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for(const chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }

    excelData.value = chunksAll.buffer;

  } catch (error) {
    console.error('加载Excel失败:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  align-items: center;
}

progress {
  width: 100%;
  height: 8px;
  border-radius: 4px;
}
</style>