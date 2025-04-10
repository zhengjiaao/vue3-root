<template>
  <div class="pdf-container">
    <div class="upload-section">
      <input
          type="file"
          multiple
          accept=".pdf"
          @change="handleFileUpload"
      />
      <div class="controls">
        <div class="page-control">
          <input
              v-model="pageInput"
              placeholder="输入页码范围，如：1-3,5,7-8"
              @input="updateSelectedPages"
          />
          <button @click="mergeAndDownload">合并下载</button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading">加载中...</div>

    <div class="content">
      <div class="preview-section" v-if="selectedPages.size > 0">
        <h3>预览合并顺序 (共{{ orderedPages.length }}页)</h3>
        <div class="preview-grid">
          <div
              v-for="(pageNum, index) in orderedPages"
              :key="`preview-${index}`"
              class="preview-item"
              :class="{ active: previewIndex === index }"
              @click="previewIndex = index"
          >
            <img :src="allPages.find(p => p.globalNumber === pageNum)?.thumbnail" />
            <div class="page-info">
              <span>第{{ pageNum }}页</span>
              <span>顺序: {{ index + 1 }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="thumbnail-section">
        <h3>所有页面 (共{{ allPages.length }}页)</h3>
        <div class="thumbnail-grid">
          <div
              v-for="page in allPages"
              :key="page.globalNumber"
              class="thumbnail-item"
              :class="{ selected: selectedPages.has(page.globalNumber) }"
              @click="togglePageSelection(page.globalNumber)"
          >
            <img :src="page.thumbnail" />
            <div class="page-number">第{{ page.globalNumber }}页</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 大图预览模态框 -->
    <div class="preview-modal" v-if="previewIndex !== null" @click.self="previewIndex = null">
      <div class="modal-content">
        <button class="close-btn" @click="previewIndex = null">×</button>
        <div class="navigation">
          <button @click="previewPrev" :disabled="previewIndex === 0">上一页</button>
          <span>当前预览: 第{{ orderedPages[previewIndex] }}页 (顺序 {{ previewIndex + 1 }})</span>
          <button @click="previewNext" :disabled="previewIndex === orderedPages.length - 1">下一页</button>
        </div>
        <img
            :src="allPages.find(p => p.globalNumber === orderedPages[previewIndex])?.thumbnail"
            class="large-preview"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import { PDFDocument } from 'pdf-lib';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// 配置PDF.js worker
GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface PDFFile {
  pdfDoc: PDFDocument;
  thumbnails: string[];
  pageCount: number;
}

interface PageInfo {
  pdfDoc: PDFDocument;
  originalPage: number;
  globalNumber: number;
  thumbnail: string;
}

const loading = ref(false);
const pageInput = ref('');
const pdfFiles = reactive<PDFFile[]>([]);
const selectedPages = reactive<Set<number>>(new Set());
const orderedPages = reactive<number[]>([]);
const previewIndex = ref<number | null>(null);

// 计算所有页面的全局信息
const allPages = computed<PageInfo[]>(() => {
  const pages: PageInfo[] = [];
  let globalNumber = 1;

  pdfFiles.forEach(pdfFile => {
    for (let i = 0; i < pdfFile.pageCount; i++) {
      pages.push({
        pdfDoc: pdfFile.pdfDoc,
        originalPage: i,
        globalNumber: globalNumber++,
        thumbnail: pdfFile.thumbnails[i]
      });
    }
  });

  return pages;
});

// 监听选中页面变化，更新排序列表
watch(selectedPages, (newVal) => {
  const newPages = Array.from(newVal).filter(p => !orderedPages.includes(p));
  orderedPages.push(...newPages);
  orderedPages.sort((a, b) => a - b);
}, { deep: true });

// 处理文件上传
const handleFileUpload = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  const files = Array.from(input.files || []);

  if (!files.length) return;

  loading.value = true;
  pdfFiles.length = 0;
  selectedPages.clear();
  orderedPages.length = 0;

  try {
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // 生成缩略图
      const pdfJsDoc = await getDocument({ data: arrayBuffer }).promise;
      const thumbnails: string[] = [];

      for (let i = 1; i <= pdfJsDoc.numPages; i++) {
        const page = await pdfJsDoc.getPage(i);
        const viewport = page.getViewport({ scale: 0.5 });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: canvas.getContext('2d') as CanvasRenderingContext2D,
          viewport
        }).promise;

        thumbnails.push(canvas.toDataURL());
      }

      pdfFiles.push({
        pdfDoc,
        thumbnails,
        pageCount: pdfDoc.getPageCount()
      });
    }
  } catch (error) {
    console.error('Error processing PDF:', error);
    alert('PDF处理失败，请检查文件格式');
  } finally {
    loading.value = false;
  }
};

// 更新选中的页码
const updateSelectedPages = () => {
  const ranges = pageInput.value.split(',');
  const newSelected = new Set<number>();

  for (const range of ranges) {
    const [startStr, endStr] = range.split('-');
    const start = parseInt(startStr);
    const end = endStr ? parseInt(endStr) : start;

    if (!isNaN(start) && start > 0 && end <= allPages.value.length) {
      for (let i = start; i <= end; i++) {
        newSelected.add(i);
      }
    }
  }

  // 保留已排序的页面
  const toRemove = Array.from(selectedPages).filter(p => !newSelected.has(p));
  toRemove.forEach(p => {
    const index = orderedPages.indexOf(p);
    if (index > -1) orderedPages.splice(index, 1);
  });

  selectedPages.clear();
  newSelected.forEach(p => selectedPages.add(p));
};

// 切换页面选中状态
const togglePageSelection = (pageNumber: number) => {
  if (selectedPages.has(pageNumber)) {
    selectedPages.delete(pageNumber);
    const index = orderedPages.indexOf(pageNumber);
    if (index > -1) orderedPages.splice(index, 1);
  } else {
    selectedPages.add(pageNumber);
    orderedPages.push(pageNumber);
    orderedPages.sort((a, b) => a - b);
  }
  updatePageInputFromSelection();
};

// 根据选中状态更新输入框
const updatePageInputFromSelection = () => {
  const ranges: string[] = [];
  let start = orderedPages[0];
  let prev = start;

  for (let i = 1; i < orderedPages.length; i++) {
    if (orderedPages[i] !== prev + 1) {
      ranges.push(start === prev ? start.toString() : `${start}-${prev}`);
      start = orderedPages[i];
    }
    prev = orderedPages[i];
  }

  if (orderedPages.length > 0) {
    ranges.push(start === prev ? start.toString() : `${start}-${prev}`);
  }

  pageInput.value = ranges.join(',');
};

// 调整顺序功能
const moveUp = () => {
  if (previewIndex.value === null || previewIndex.value <= 0) return;
  const index = previewIndex.value;
  [orderedPages[index], orderedPages[index - 1]] = [orderedPages[index - 1], orderedPages[index]];
  previewIndex.value--;
};

const moveDown = () => {
  if (previewIndex.value === null || previewIndex.value >= orderedPages.length - 1) return;
  const index = previewIndex.value;
  [orderedPages[index], orderedPages[index + 1]] = [orderedPages[index + 1], orderedPages[index]];
  previewIndex.value++;
};

const removeSelected = () => {
  if (previewIndex.value === null) return;
  const pageNum = orderedPages[previewIndex.value];
  selectedPages.delete(pageNum);
  orderedPages.splice(previewIndex.value, 1);
  if (previewIndex.value >= orderedPages.length) {
    previewIndex.value = orderedPages.length - 1;
  }
};

// 预览导航
const previewPrev = () => {
  if (previewIndex.value !== null && previewIndex.value > 0) {
    previewIndex.value--;
  }
};

const previewNext = () => {
  if (previewIndex.value !== null && previewIndex.value < orderedPages.length - 1) {
    previewIndex.value++;
  }
};

// 合并并下载PDF
const mergeAndDownload = async () => {
  if (orderedPages.length === 0) {
    alert('请至少选择一页');
    return;
  }

  try {
    loading.value = true;
    const newPdf = await PDFDocument.create();

    for (const pageNum of orderedPages) {
      const pageInfo = allPages.value.find(p => p.globalNumber === pageNum);
      if (!pageInfo) continue;

      const [copiedPage] = await newPdf.copyPages(
          pageInfo.pdfDoc,
          [pageInfo.originalPage]
      );
      newPdf.addPage(copiedPage);
    }

    const pdfBytes = await newPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `merged_${new Date().getTime()}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('合并PDF失败:', error);
    alert('合并PDF时出错');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.pdf-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.upload-section {
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f8f8;
  border-radius: 8px;
}

.controls {
  margin-top: 15px;
}

.page-control {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.page-control input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.sort-control {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #1976d2;
}

button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.content {
  display: flex;
  gap: 20px;
}

.preview-section, .thumbnail-section {
  flex: 1;
}

.preview-section {
  min-width: 300px;
}

h3 {
  margin: 0 0 15px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  max-height: 600px;
  overflow-y: auto;
  padding: 5px;
}

.preview-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.preview-item.active {
  border-color: #2196f3;
  background-color: #f0f7ff;
}

.preview-item img {
  width: 100%;
  height: auto;
  margin-bottom: 5px;
}

.page-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: #666;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  max-height: 800px;
  overflow-y: auto;
  padding: 5px;
}

.thumbnail-item {
  border: 2px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
}

.thumbnail-item.selected {
  border-color: #2196f3;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
}

.thumbnail-item img {
  width: 100%;
  height: auto;
  display: block;
}

.page-number {
  text-align: center;
  padding: 8px;
  background: #f5f5f5;
  font-size: 0.9em;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.2em;
}

.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  position: relative;
}

.large-preview {
  max-width: 100%;
  max-height: 70vh;
  display: block;
  margin: 10px auto;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4444;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.close-btn:hover {
  background: #cc0000;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  gap: 15px;
}
</style>