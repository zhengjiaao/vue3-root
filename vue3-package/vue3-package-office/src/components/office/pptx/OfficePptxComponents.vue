<template>
  <div>
    <!--本地PPTX文件预览-->
    <input
        type="file"
        accept=".pptx"
        @change="handleFileChange"
        class="file-input"
    />
    <div v-if="loading" class="loading">加载中...</div>
    <vue-office-pptx
        v-if="pptxData"
        :src="pptxData"
        style="height: 600px; margin-top: 20px;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueOfficePptx from '@vue-office/pptx';

const pptxData = ref<ArrayBuffer | null>(null);
const loading = ref(false);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  loading.value = true;

  const reader = new FileReader();
  reader.onload = (e) => {
    pptxData.value = e.target?.result as ArrayBuffer;
    loading.value = false;
  };
  reader.onerror = () => {
    loading.value = false;
    console.error('文件读取失败');
  };
  reader.readAsArrayBuffer(file);
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