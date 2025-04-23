<template>
  <!--基本PPTX渲染-->
  <div class="pptx-container">
    <vue-office-pptx
        :src="pptxUrl"
        @rendered="handleRendered"
        @error="handleError"
        style="height: 600px;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueOfficePptx from '@vue-office/pptx';

// const pptxUrl = ref('https://example.com/presentation.pptx');
const pptxUrl = ref('/api/file/test.pptx');

const handleRendered = () => {
  console.log('PPTX渲染完成');
};

const handleError = (e: Error) => {
  console.error('PPTX加载失败:', e);
};
</script>

<style scoped>
.pptx-container {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}
</style>