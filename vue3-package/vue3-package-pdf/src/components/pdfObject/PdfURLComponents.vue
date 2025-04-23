<template>
  <div>
    <div ref="pdfContainer" class="pdf-container"></div>
    <button @click="embedPdf" class="embed-btn">加载PDF</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PDFObject from 'pdfobject';

const pdfContainer = ref<HTMLElement | null>(null);
// const pdfUrl = 'https://example.com/sample.pdf';
const pdfUrl = '/api/file/test.pdf';

const embedPdf = () => {
  if (pdfContainer.value) {
    PDFObject.embed(pdfUrl, pdfContainer.value, {
      fallbackLink: '<p>您的浏览器不支持PDF预览，请<a href="[url]">下载PDF</a></p>'
    });
  }
};

onMounted(() => {
  // 可以自动加载或等待用户点击
  // embedPdf();
});
</script>

<style scoped>
.pdf-container {
  height: 600px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

.embed-btn {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>