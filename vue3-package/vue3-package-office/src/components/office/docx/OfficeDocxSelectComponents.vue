<template>
  <div>
    <!--动态切换文档-->
    <div class="doc-buttons">
      <button
          v-for="doc in documents"
          :key="doc.id"
          @click="selectDocument(doc)"
      >
        {{ doc.name }}
      </button>
    </div>

    <vue-office-docx
        :src="selectedDoc"
        style="height: 600px; margin-top: 20px;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueOfficeDocx from '@vue-office/docx';

const documents = ref([
  // { id: 1, name: '文档1', url: 'https://example.com/doc1.docx' },
  // { id: 2, name: '文档2', url: 'https://example.com/doc2.docx' },
  // { id: 3, name: '文档3', url: 'https://example.com/doc3.docx' }
  { id: 1, name: '文档1', url: '/api/file/test.docx' },
  { id: 2, name: '文档2', url: '/api/file/test.docx' },
  { id: 3, name: '文档3', url: '/api/file/test.docx' }
]);

const selectedDoc = ref(null);

const selectDocument = async (doc) => {
  try {
    const response = await fetch(doc.url);
    const arrayBuffer = await response.arrayBuffer();
    selectedDoc.value = arrayBuffer;
  } catch (error) {
    console.error('加载文档失败:', error);
  }
};
</script>

<style>
.doc-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>