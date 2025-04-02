<template>
  <div>
    <input type="file" accept=".pdf" @change="handleFileChange" />
    <div ref="pdfContainer" class="pdf-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PDFObject from 'pdfobject';

const pdfContainer = ref<HTMLElement | null>(null);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file || !pdfContainer.value) return;

  const fileUrl = URL.createObjectURL(file);

  PDFObject.embed(fileUrl, pdfContainer.value, {
    fallbackLink: '<p>无法预览PDF，请<a href="[url]">下载查看</a></p>'
  });

  // 记得在组件卸载时清理对象URL
};
</script>

<style scoped>
.pdf-container {
  height: 700px;
  border: 1px solid #eee;
  margin-top: 10px;
}
</style>