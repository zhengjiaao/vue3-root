<template>
  <!--PDF 查看器（渲染PDF）-->
  <div>
    <input type="file" @change="handleFileUpload" accept=".pdf" />
    <div v-for="pageNum in numPages" :key="pageNum">
      <canvas :id="'canvas-' + pageNum"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// 配置PDF.js worker
GlobalWorkerOptions.workerSrc = pdfjsWorker;

const numPages = ref(0);

async function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument(arrayBuffer);

  loadingTask.promise.then(async (pdf) => {
    numPages.value = pdf.numPages;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      // const viewport = page.getViewport({ scale: 1.5 }); // 设置缩放比例，根据需要调整，默认为1.0
      const viewport = page.getViewport({ scale: 3 }); // 设置缩放比例，根据需要调整，默认为1.0
      const canvas = document.getElementById(`canvas-${pageNum}`) as HTMLCanvasElement;
      const context = canvas.getContext('2d')!;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // 设置 canvas 的 CSS 尺寸以适应屏幕，以保持清晰度
      canvas.style.width = `${viewport.width / window.devicePixelRatio}px`;
      canvas.style.height = `${viewport.height / window.devicePixelRatio}px`;

      await page.render({
        canvasContext: context,
        viewport
      }).promise;
    }
  });
}
</script>