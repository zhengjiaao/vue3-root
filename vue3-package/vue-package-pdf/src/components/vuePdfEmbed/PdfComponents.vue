<template>
  <div>
    <input
        type="file"
        accept=".pdf"
        @change="handleFileChange"
        class="file-input"
    />
    <div v-if="loading" class="loading">加载中...</div>
    <vue-pdf-embed
        v-if="pdfFile"
        :source="pdfFile"
        style="height: 800px; margin-top: 20px;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed';

const pdfFile = ref<ArrayBuffer | string | null>(null);
const loading = ref(false);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  loading.value = true;

  if (file.size > 10 * 1024 * 1024) { // 大于10MB使用URL.createObjectURL
    pdfFile.value = URL.createObjectURL(file);
    loading.value = false;
  } else {
    const reader = new FileReader();
    reader.onload = (e) => {
      pdfFile.value = e.target?.result as ArrayBuffer;
      loading.value = false;
    };
    reader.onerror = () => {
      loading.value = false;
      console.error('文件读取失败');
    };
    reader.readAsArrayBuffer(file);
  }
};
</script>

<style scoped>
.file-input {
  display: block;
  margin-bottom: 15px;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #666;
}
</style>