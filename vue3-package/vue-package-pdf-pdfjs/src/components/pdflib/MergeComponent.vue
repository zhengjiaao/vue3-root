<template>
  <!--PDF 合并-->
  <div>
    <input type="file" multiple @change="mergePdfs" accept=".pdf" />
    <button @click="downloadMerged">下载合并后的PDF</button>
  </div>
</template>

<script setup lang="ts">
import { PDFDocument } from 'pdf-lib';
import { ref } from 'vue';

const mergedPdfBytes = ref<Uint8Array>();

async function mergePdfs(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;

  const mergedPdf = await PDFDocument.create();

  for (const file of Array.from(files)) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach(page => mergedPdf.addPage(page));
  }

  mergedPdfBytes.value = await mergedPdf.save();
}

function downloadMerged() {
  if (!mergedPdfBytes.value) return;

  const blob = new Blob([mergedPdfBytes.value], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'merged.pdf';
  link.click();
}
</script>