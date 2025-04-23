<template>
  <div class="pdf-container">
    <vue-pdf-embed
        :source="pdfSource"
        @rendered="handleRendered"
        @error="handleError"
        style="height: 800px;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed';

// const pdfSource = ref('https://example.com/sample.pdf');
const pdfSource = ref('/api/file/test.pdf');

const handleRendered = () => {
  console.log('PDF渲染完成');
};

const handleError = (error: Error) => {
  console.error('PDF加载失败:', error);
};
</script>

<style scoped>
.pdf-container {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}
</style>