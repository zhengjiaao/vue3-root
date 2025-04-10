<template>
  <div class="pdf-container">
    <div class="upload-section">
      <input
          type="file"
          multiple
          accept=".pdf"
          @change="handleFileUpload"
      />
      <div class="page-control">
        <input
            v-model="pageInput"
            placeholder="输入页码范围，如：1-3,5,7-8"
            @input="updateSelectedPages"
        />
        <button @click="mergeAndDownload">合并下载</button>
      </div>
    </div>

    <div v-if="loading" class="loading">加载中...</div>

    <div v-else class="thumbnail-grid">
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
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import { PDFDocument, type PDFPage } from 'pdf-lib';
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from 'pdfjs-dist';
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

// 处理文件上传
const handleFileUpload = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  const files = Array.from(input.files || []);

  if (!files.length) return;

  loading.value = true;

  try {
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // 生成缩略图
      const pdfJsDoc = await getDocument({ data: arrayBuffer }).promise;
      const thumbnails: string[] = [];

      for (let i = 1; i <= pdfJsDoc.numPages; i++) {
        const page = await pdfJsDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1.0 }); // 缩放比例 0.2、0.5、0.7、1.0

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

  selectedPages.clear();
  newSelected.forEach(p => selectedPages.add(p));
};

// 切换页面选中状态
const togglePageSelection = (pageNumber: number) => {
  if (selectedPages.has(pageNumber)) {
    selectedPages.delete(pageNumber);
  } else {
    selectedPages.add(pageNumber);
  }
  updatePageInputFromSelection();
};

// 根据选中状态更新输入框
const updatePageInputFromSelection = () => {
  const sorted = Array.from(selectedPages).sort((a, b) => a - b);
  let ranges: string[] = [];
  let start = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] !== sorted[i-1] + 1) {
      ranges.push(start === sorted[i-1] ? start.toString() : `${start}-${sorted[i-1]}`);
      start = sorted[i];
    }
  }

  if (sorted.length > 0) {
    ranges.push(start === sorted[sorted.length-1]
        ? start.toString()
        : `${start}-${sorted[sorted.length-1]}`);
  }

  pageInput.value = ranges.join(',');
};

// 合并并下载PDF
const mergeAndDownload = async () => {
  if (selectedPages.size === 0) {
    alert('请至少选择一页');
    return;
  }

  try {
    loading.value = true;
    const newPdf = await PDFDocument.create();
    const sortedPages = Array.from(selectedPages).sort((a, b) => a - b);

    for (const pageNumber of sortedPages) {
      const pageInfo = allPages.value[pageNumber - 1];
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
    a.download = 'merged.pdf';
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
/* 样式保持不变 */
.pdf-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.upload-section {
  margin-bottom: 20px;
}

.page-control {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.page-control input {
  flex: 1;
  padding: 8px;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
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

button {
  padding: 8px 16px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #1976d2;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>