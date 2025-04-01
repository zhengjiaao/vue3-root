<template>
  <div class="pdf-container">
    <!--PDF缩放与旋转-->
    <div class="toolbar">
      <button @click="zoomOut">缩小</button>
      <span>{{ Math.round(scale * 100) }}%</span>
      <button @click="zoomIn">放大</button>
      <button @click="rotate">旋转 ({{ rotation }}°)</button>
      <button @click="fitWidth">适合宽度</button>
      <button @click="fitAuto">自动适应</button>
    </div>

    <div class="pdf-wrapper" :style="{ transform: `scale(${scale}) rotate(${rotation}deg)`, width: '100%', height: '600px' }">
      <vue-office-pdf
          :src="pdfUrl"
          :scale="1"
          :style="{ width: fitMode === 'width' ? '100%' : 'auto' }"
          @rendered="handleRendered"
          @error="handleError"
          ref="pdfViewer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import VueOfficePdf from '@vue-office/pdf';

// 自定义接口描述 PDF Viewer 实例的类型
interface PdfViewerInstance {
  getScale?: () => number;
  setScale?: (scale: number) => void;
}

// 使用 shallowRef 避免深度响应式
const pdfUrl = ref('/api/file/test.pdf'); // 确保路径有效
const scale = ref(1);
const rotation = ref(0);
const fitMode = ref<'auto' | 'width'>('auto');
const pdfViewer = shallowRef<PdfViewerInstance | null>(null); // 显式声明 pdfViewer 类型

const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.1, 3);
};

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.1, 0.5);
};

const rotate = () => {
  rotation.value = (rotation.value + 90) % 360;
};

const fitWidth = () => {
  fitMode.value = 'width';
  scale.value = 1;
};

const fitAuto = () => {
  fitMode.value = 'auto';
  scale.value = 1;
};

const handleRendered = () => {
  console.log('PDF渲染完成', pdfViewer.value);
  if (!pdfViewer.value) {
    console.error('PDF Viewer实例未正确初始化');
  }
};

const handleError = (error: any) => {
  console.error('PDF加载失败', error);
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

.pdf-wrapper {
  transform-origin: 0 0;
  transition: transform 0.3s ease;
  margin: 0 auto;
  width: 100%;
  height: 600px; /* 确保最小高度 */
}
</style>
