<template>
  <!-- 添加文字水印 -->
  <div>
    <input type="file" @change="addWatermark" accept=".pdf" />
    <button @click="downloadWatermarkedPdf" :disabled="!watermarkedPdfBytes || loading">下载带水印的PDF</button>
    <div v-if="loading" class="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">文件已成功下载！</div>
  </div>
</template>

<script setup lang="ts">
import {degrees, PDFDocument, rgb} from 'pdf-lib';
import { ref } from 'vue';

const watermarkedPdfBytes = ref<Uint8Array | null>(null);
const loading = ref(false);
const error = ref('');
const success = ref(false);

async function addWatermark(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  loading.value = true;
  error.value = '';
  success.value = false;
  watermarkedPdfBytes.value = null;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();

    pages.forEach(page => {
      const { width, height } = page.getSize();
      const text = 'CONFIDENTIAL';
      const fontSize = 32;
      const x = width / 2 - (text.length * fontSize) / 4; // 调整水平位置
      const y = height / 2 + fontSize / 2; // 调整垂直位置

      page.drawText(text, {
        x,
        y,
        size: fontSize,
        color: rgb(0.9, 0.1, 0.1),
        opacity: 0.5,
        rotate: degrees(-45)
      });
    });

    watermarkedPdfBytes.value = await pdfDoc.save();
  } catch (err) {
    console.error('添加水印失败:', err);
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
}

function downloadWatermarkedPdf() {
  if (watermarkedPdfBytes.value) {
    const blob = new Blob([watermarkedPdfBytes.value], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `watermarked_${new Date().getTime()}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
    success.value = true;
    setTimeout(() => {
      success.value = false;
    }, 3000); // 3秒后隐藏成功提示
  }
}
</script>

<style scoped>
.loading {
  margin-top: 10px;
  color: #666;
}

.error {
  margin-top: 10px;
  color: #ff4444;
}

.success {
  margin-top: 10px;
  color: #4caf50;
}
</style>
