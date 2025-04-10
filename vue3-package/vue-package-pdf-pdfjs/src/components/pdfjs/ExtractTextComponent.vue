<template>
  <!--提取PDF文本内容-->
  <div>
    <input type="file" @change="extractText" accept=".pdf" />
    <div class="text-content">{{ extractedText }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';

const extractedText = ref('');

async function extractText(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument(arrayBuffer);
  const pdf = await loadingTask.promise;

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    fullText += textContent.items
        .map(item => ('str' in item) ? item.str : '')
        .join(' ');
  }

  extractedText.value = fullText;
}
</script>