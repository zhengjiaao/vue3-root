<template>
  <!--PDF 拆分-->
  <div>
    <input type="file" @change="handleFileUpload" accept=".pdf" />
    <input
      type="text"
      v-model="splitRule"
      :placeholder="fileUploaded ? '输入拆分规则，如 1-3,5-6' : '请先上传PDF文件'"
      :disabled="!fileUploaded"
    />
    <button @click="splitAction" :disabled="!fileUploaded || !splitRule || loading">拆分PDF</button>
    <button @click="downloadSplit" :disabled="!splitPdfBytes || loading">下载拆分后的PDF</button>
    <div v-if="loading" class="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { PDFDocument } from 'pdf-lib';
import { ref, computed } from 'vue';

const splitRule = ref('');
const splitPdfBytes = ref<Uint8Array | null>(null);
const loading = ref(false);
const error = ref('');
const maxPages = ref(0);
const fileUploaded = ref(false);
const uploadedFile = ref<File | null>(null);

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  uploadedFile.value = file;
  fileUploaded.value = true;
  splitPdfBytes.value = null; // 清除之前的拆分结果
  error.value = ''; // 清除之前的错误信息
}

async function splitAction() {
  if (!uploadedFile.value) return;

  loading.value = true;
  error.value = '';
  splitPdfBytes.value = null;
  maxPages.value = 0;

  try {
    const arrayBuffer = await uploadedFile.value.arrayBuffer();
    const originalPdf = await PDFDocument.load(arrayBuffer);
    const newPdf = await PDFDocument.create();

    maxPages.value = originalPdf.getPageCount();

    const pagesToCopy = parseSplitRule(splitRule.value, maxPages.value);
    if (pagesToCopy.length === 0) {
      throw new Error('请输入有效的拆分规则');
    }

    const pages = await newPdf.copyPages(originalPdf, pagesToCopy);
    pages.forEach(page => newPdf.addPage(page));

    splitPdfBytes.value = await newPdf.save();
  } catch (err) {
    console.error('拆分PDF失败:', err);
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
}

function parseSplitRule(rule: string, maxPages: number): number[] {
  const pages: number[] = [];
  const ranges = rule.split(',');

  for (const range of ranges) {
    const trimmedRange = range.trim();
    if (!trimmedRange) continue;

    const parts = trimmedRange.split('-').map(Number);
    if (parts.length !== 2) {
      throw new Error(`无效的页码范围格式: ${trimmedRange}`);
    }

    const [start, end] = parts;
    if (isNaN(start) || isNaN(end) || start < 1 || start > maxPages || end < 1 || end > maxPages || start > end) {
      throw new Error(`无效的页码范围: ${trimmedRange}`);
    }

    for (let i = start - 1; i < end; i++) {
      pages.push(i);
    }
  }

  return pages;
}

function downloadSplit() {
  if (splitPdfBytes.value) {
    const blob = new Blob([splitPdfBytes.value], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `split_${new Date().getTime()}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
</script>
