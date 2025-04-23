<template>
  <div class="pdf-container">
    <div class="toolbar">
      <button @click="zoomOut">缩小</button>
      <span>{{ Math.round(scale * 100) }}%</span>
      <button @click="zoomIn">放大</button>
      <button @click="rotate">旋转 ({{ rotation }}°)</button>
      <select v-model="scalePreset" @change="applyScalePreset">
        <option value="0.5">50%</option>
        <option value="0.75">75%</option>
        <option value="1">100%</option>
        <option value="1.5">150%</option>
        <option value="2">200%</option>
        <option value="auto">自动适应</option>
      </select>
    </div>

    <div class="pdf-wrapper" :style="{ transform: `scale(${scale}) rotate(${rotation}deg)` }">
      <vue-pdf-embed
          :source="pdfSource"
          :style="{ width: scalePreset === 'auto' ? '100%' : 'auto' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed';

// const pdfSource = ref('https://example.com/sample.pdf');
const pdfSource = ref('/api/file/test.pdf');
const scale = ref(1);
const rotation = ref(0);
const scalePreset = ref('auto');

const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.1, 3);
  scalePreset.value = 'custom';
};

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.1, 0.5);
  scalePreset.value = 'custom';
};

const rotate = () => {
  rotation.value = (rotation.value + 90) % 360;
};

const applyScalePreset = () => {
  if (scalePreset.value === 'auto') {
    scale.value = 1;
  } else {
    scale.value = parseFloat(scalePreset.value);
  }
};
</script>

<style scoped>
.pdf-container {
  max-width: 100%;
  overflow: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

button {
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

select {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.pdf-wrapper {
  transform-origin: 0 0;
  transition: transform 0.3s ease;
  margin: 0 auto;
  width: fit-content;
}
</style>