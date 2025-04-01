<template>
  <div class="pptx-navigator">
    <!--PPTX缩略图导航-->
    <div class="thumbnail-container">
      <template v-if="pptxData">
        <div
            v-for="slide in totalSlides"
            :key="slide"
            class="thumbnail"
            :class="{ 'active': currentSlide === slide }"
            @click="jumpToSlide(slide)"
        >
          <span class="slide-number">{{ slide }}</span>
          <vue-office-pptx
              :src="pptxData"
              :slide="slide"
              :scale="0.2"
              style="pointer-events: none;"
              @rendered="onThumbnailRendered(slide)"
          />
          <div v-if="loadingThumbnails[slide]" class="thumbnail-loading">加载中...</div>
        </div>
      </template>
      <div v-else class="loading-container">
        <div class="loading">加载PPTX文件中...</div>
      </div>
    </div>

    <div class="main-slide">
      <div v-if="pptxData">
        <vue-office-pptx
            :src="pptxData"
            :slide="currentSlide"
            @rendered="onMainSlideRendered"
            style="height: 600px;"
        />
      </div>
      <div v-else class="loading-container">
        <div class="loading">准备幻灯片...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import VueOfficePptx from '@vue-office/pptx';

const pptxUrl = ref('/api/file/test.pptx');
const pptxData = ref<ArrayBuffer | null>(null);
const currentSlide = ref(1);
const totalSlides = ref(0);
const loadingThumbnails = ref<Record<number, boolean>>({});

// 预加载PPTX文件
const loadPptxFile = async () => {
  try {
    const response = await fetch(pptxUrl.value);
    if (!response.ok) throw new Error('Failed to load PPTX file');
    pptxData.value = await response.arrayBuffer();
  } catch (error) {
    console.error('加载PPTX文件失败:', error);
  }
};

// 跳转到指定幻灯片
const jumpToSlide = (slide: number) => {
  if (slide >= 1 && slide <= totalSlides.value) {
    currentSlide.value = slide;
  }
};

// 主幻灯片渲染完成回调
const onMainSlideRendered = (payload: any) => {
  if (payload?.totalSlides) {
    totalSlides.value = payload.totalSlides;
  }
};

// 缩略图渲染完成回调
const onThumbnailRendered = (slide: number) => {
  loadingThumbnails.value[slide] = false;
};

// 初始化加载
onMounted(() => {
  loadPptxFile();

  // 初始化加载状态
  for (let i = 1; i <= 20; i++) { // 假设最多20页
    loadingThumbnails.value[i] = true;
  }
});
</script>

<style scoped>
.pptx-navigator {
  display: flex;
  gap: 20px;
  height: 100%;
}

.thumbnail-container {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  max-height: 600px;
}

.thumbnail {
  position: relative;
  cursor: pointer;
  border: 2px solid transparent;
  padding: 5px;
  min-height: 100px;
  background-color: #f5f5f5;
}

.thumbnail.active {
  border-color: #42b983;
  background-color: #f0f9eb;
}

.slide-number {
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 12px;
  z-index: 2;
}

.main-slide {
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.loading {
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  color: #666;
}

.thumbnail-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  color: #666;
}
</style>