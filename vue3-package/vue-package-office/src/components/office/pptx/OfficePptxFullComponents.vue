<template>
  <!--完整PPTX演示模式-->
  <div class="pptx-presentation">
    <div class="presentation-container" @click="nextSlide" @keydown="handleKeyDown" tabindex="0">
      <vue-office-pptx
          :src="pptxData"
          :slide="currentSlide"
          style="height: 100%;"
          @rendered="handleRendered"
      />

      <div class="slide-indicator">
        {{ currentSlide }} / {{ totalSlides }}
      </div>

      <div class="navigation-hint" v-if="showNavigationHint">
        ← → 切换幻灯片 | ESC 退出演示
      </div>
    </div>

    <div class="toolbar" v-if="!isFullscreen">
      <button @click="prevSlide" :disabled="currentSlide <= 1">上一页</button>
      <button @click="nextSlide" :disabled="currentSlide >= totalSlides">下一页</button>
      <button @click="startPresentation">开始演示</button>
      <button @click="print">打印</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import VueOfficePptx from '@vue-office/pptx';

const pptxData = ref<ArrayBuffer | null>(null);
const currentSlide = ref(1);
const totalSlides = ref(0);
const isFullscreen = ref(false);
const showNavigationHint = ref(true);
let navigationHintTimeout: number;

// 模拟加载PPTX数据
onMounted(async () => {
  // const response = await fetch('https://example.com/presentation.pptx');
  const response = await fetch('/api/file/test.pptx');
  pptxData.value = await response.arrayBuffer();

  // 5秒后隐藏导航提示
  navigationHintTimeout = setTimeout(() => {
    showNavigationHint.value = false;
  }, 5000);
});

onUnmounted(() => {
  clearTimeout(navigationHintTimeout);
});

const handleRendered = (payload: any) => {
  if (payload?.totalSlides) {
    totalSlides.value = payload.totalSlides;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 1) {
    currentSlide.value--;
    showNavigationHint.value = true;
    resetNavigationHintTimeout();
  }
};

const nextSlide = () => {
  if (currentSlide.value < totalSlides.value) {
    currentSlide.value++;
    showNavigationHint.value = true;
    resetNavigationHintTimeout();
  }
};

const resetNavigationHintTimeout = () => {
  clearTimeout(navigationHintTimeout);
  navigationHintTimeout = setTimeout(() => {
    showNavigationHint.value = false;
  }, 3000);
};

const startPresentation = () => {
  isFullscreen.value = true;
  document.documentElement.requestFullscreen();
};

const exitPresentation = () => {
  isFullscreen.value = false;
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowLeft':
      prevSlide();
      break;
    case 'ArrowRight':
      nextSlide();
      break;
    case 'Escape':
      exitPresentation();
      break;
  }
};

const print = () => {
  window.print();
};
</script>

<style scoped>
.pptx-presentation {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.presentation-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  outline: none;
  background-color: #000;
}

.slide-indicator {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
}

.navigation-hint {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.navigation-hint:not(.show) {
  opacity: 0;
}

.toolbar {
  padding: 10px;
  background-color: #f0f0f0;
  display: flex;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

@media print {
  .toolbar, .slide-indicator, .navigation-hint {
    display: none;
  }
}
</style>