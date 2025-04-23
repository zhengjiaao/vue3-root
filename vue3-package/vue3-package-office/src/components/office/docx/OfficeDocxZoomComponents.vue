<template>
  <div>
    <!--文档缩放控制-->
    <div class="controls">
      <button @click="zoomOut">缩小</button>
      <span>缩放: {{ zoomLevel }}%</span>
      <button @click="zoomIn">放大</button>
    </div>

    <div class="doc-container" :style="{ transform: `scale(${zoomLevel / 100})` }">
      <vue-office-docx
          :src="docxUrl"
          style="height: 600px; transform-origin: 0 0;"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueOfficeDocx from '@vue-office/docx';

// const docxUrl = ref('https://example.com/document.docx');
const docxUrl = ref('/api/file/test.docx');
const zoomLevel = ref(100);

const zoomIn = () => {
  if (zoomLevel.value < 200) {
    zoomLevel.value += 10;
  }
};

const zoomOut = () => {
  if (zoomLevel.value > 50) {
    zoomLevel.value -= 10;
  }
};
</script>

<style>
.controls {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.doc-container {
  overflow: auto;
  width: 100%;
}
</style>