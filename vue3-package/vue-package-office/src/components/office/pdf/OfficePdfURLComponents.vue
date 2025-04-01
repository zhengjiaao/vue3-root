<template>
  <div class="pdf-container">
    <vue-office-pdf
        :src="pdfUrl"
        @rendered="handleRendered"
        @error="handleError"
        style="height: 800px;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueOfficePdf from '@vue-office/pdf';

// const pdfUrl = ref('https://example.com/sample.pdf');
const pdfUrl = ref('/api/file/test.pdf');

const handleRendered = () => {
  console.log('PDF渲染完成');
};

const handleError = (e: Error) => {
  console.error('PDF加载失败:', e);
};
</script>

<style scoped>
.pdf-container {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}
</style>