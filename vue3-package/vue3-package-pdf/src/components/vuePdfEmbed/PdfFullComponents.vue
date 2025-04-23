<template>
  <div class="pdf-reader">
    <div class="header">
      <h2>{{ fileName }}</h2>
      <div class="tools">
        <input
            type="file"
            ref="fileInput"
            accept=".pdf"
            @change="handleFileChange"
            style="display: none;"
        />
        <button @click="openFile">打开文件</button>
        <button @click="print" :disabled="!pdfLoaded">打印</button>
        <button @click="download" :disabled="!pdfLoaded">下载</button>
      </div>
    </div>

    <div class="viewer-container">
      <div class="sidebar" :class="{ 'collapsed': sidebarCollapsed }">
        <button class="toggle-sidebar" @click="sidebarCollapsed = !sidebarCollapsed">
          {{ sidebarCollapsed ? '>' : '<' }}
        </button>

        <div class="thumbnail-list" v-if="!sidebarCollapsed && pdfLoaded">
          <div
              v-for="page in pageCount"
              :key="page"
              class="thumbnail"
              :class="{ 'active': currentPage === page }"
              @click="jumpToPage(page)"
          >
            <div class="page-number">{{ page }}</div>
            <vue-pdf-embed
                :source="pdfSource"
                :page="page"
                :scale="0.2"
                style="pointer-events: none;"
            />
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="toolbar">
          <button @click="prevPage" :disabled="currentPage <= 1">
            <span>上一页</span>
          </button>

          <div class="page-control">
            <input
                type="number"
                v-model.number="pageInput"
                min="1"
                :max="pageCount"
                @change="jumpToPage(pageInput)"
            />
            <span>/ {{ pageCount }}</span>
          </div>

          <button @click="nextPage" :disabled="currentPage >= pageCount">
            <span>下一页</span>
          </button>

          <div class="zoom-controls">
            <button @click="zoomOut" :disabled="scale <= 0.5">-</button>
            <span>{{ Math.round(scale * 100) }}%</span>
            <button @click="zoomIn" :disabled="scale >= 2">+</button>
          </div>

          <select v-model="scalePreset" @change="applyScalePreset">
            <option value="0.5">50%</option>
            <option value="0.75">75%</option>
            <option value="1">100%</option>
            <option value="1.5">150%</option>
            <option value="2">200%</option>
          </select>
        </div>

        <div class="pdf-viewport">
          <vue-pdf-embed
              :source="pdfSource"
              :page="currentPage"
              :scale="scale"
              @rendered="handleRendered"
              @page-count="handlePageCount"
              style="height: 100%;"
              ref="pdfViewer"
          />

          <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
            <div>加载中...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';
import VuePdfEmbed from 'vue-pdf-embed';

const fileInput = ref<HTMLInputElement | null>(null);
const pdfViewer = ref<InstanceType<typeof VuePdfEmbed> | null>(null);
const pdfSource = ref<string | ArrayBuffer | null>(null);
const fileName = ref('未选择文件');
const pdfLoaded = ref(false);
const loading = ref(false);

// 分页控制
const currentPage = ref(1);
const pageInput = ref(1);
const pageCount = ref(0);

// 缩放控制
const scale = ref(1);
const scalePreset = ref('1');

// 侧边栏
const sidebarCollapsed = ref(false);

const openFile = () => {
  fileInput.value?.click();
};

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  loading.value = true;
  pdfLoaded.value = false;
  fileName.value = file.name;

  try {
    // 使用URL.createObjectURL提高大文件性能
    pdfSource.value = URL.createObjectURL(file);
    pdfLoaded.value = true;
  } catch (error) {
    console.error('文件读取失败:', error);
    fileName.value = '文件读取失败';
  } finally {
    loading.value = false;
  }
};

const handleRendered = () => {
  console.log('当前页渲染完成');
};

const handlePageCount = (count: number) => {
  pageCount.value = count;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    pageInput.value = currentPage.value;
  }
};

const nextPage = () => {
  if (currentPage.value < pageCount.value) {
    currentPage.value++;
    pageInput.value = currentPage.value;
  }
};

const jumpToPage = (page: number) => {
  const pageNum = Math.max(1, Math.min(page, pageCount.value));
  currentPage.value = pageNum;
  pageInput.value = pageNum;
};

const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.1, 2);
  scalePreset.value = 'custom';
};

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.1, 0.5);
  scalePreset.value = 'custom';
};

const applyScalePreset = () => {
  scale.value = parseFloat(scalePreset.value);
};

const print = () => {
  window.print();
};

const isBlobUrl = (value: unknown): value is string => {
  return typeof value === 'string' && value.startsWith('blob:');
};

const download = () => {
  if (isBlobUrl(pdfSource.value)) {
    const a = document.createElement('a');
    a.href = pdfSource.value;
    a.download = fileName.value || 'document.pdf';
    a.click();
  }
};

// 清理对象URL
onUnmounted(() => {
  if (isBlobUrl(pdfSource.value)) {
    URL.revokeObjectURL(pdfSource.value);
  }
});
</script>

<style scoped>
.pdf-reader {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
}

.tools {
  display: flex;
  gap: 10px;
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

.viewer-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  background-color: #e0e0e0;
  transition: width 0.3s;
  position: relative;
  overflow-y: auto;
}

.sidebar.collapsed {
  width: 40px;
}

.toggle-sidebar {
  position: absolute;
  right: 0;
  top: 10px;
  transform: translateX(50%);
  width: 20px;
  height: 40px;
  padding: 0;
  background-color: #2c3e50;
  z-index: 10;
}

.thumbnail-list {
  padding: 50px 10px 10px;
}

.thumbnail {
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
  border: 2px solid transparent;
  background-color: white;
}

.thumbnail.active {
  border-color: #42b983;
}

.page-number {
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 12px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
}

.page-control {
  display: flex;
  align-items: center;
}

.page-control input {
  width: 50px;
  padding: 5px;
  text-align: center;
  margin-right: 5px;
}

.zoom-controls {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.zoom-controls button {
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.pdf-viewport {
  flex: 1;
  overflow: auto;
  position: relative;
  background-color: #525659;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #42b983;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media print {
  .sidebar, .toolbar {
    display: none;
  }

  .main-content {
    width: 100%;
  }
}
</style>