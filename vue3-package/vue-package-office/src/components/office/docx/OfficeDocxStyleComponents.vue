<template>
  <div>
    <!--自定义样式和加载状态-->
    <button @click="loadDocument">加载文档</button>

    <div v-if="loading" class="loading">文档加载中...</div>

    <vue-office-docx
        v-if="docxData && !loading"
        :src="docxData"
        style="height: 600px; border: 1px solid #eee;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueOfficeDocx from '@vue-office/docx';

const loading = ref(false);
const docxData = ref(null);

const loadDocument = async () => {
  loading.value = true;
  try {
    // const response = await fetch('https://example.com/document.docx');
    const response = await fetch('/api/file/test.docx');
    const arrayBuffer = await response.arrayBuffer();
    docxData.value = arrayBuffer;
  } catch (error) {
    console.error('加载文档失败:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style>
.loading {
  padding: 20px;
  text-align: center;
  color: #666;
}
</style>