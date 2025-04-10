<template>
  <!-- 填写PDF表单字段 -->
  <div>
    <input type="file" @change="fillForm" accept=".pdf" />
  </div>
</template>

<script setup lang="ts">
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

async function fillForm(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const form = pdfDoc.getForm();

  // 嵌入字体
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // 添加新页面
  const newPage = pdfDoc.addPage();
  const { width, height } = newPage.getSize();

  // 创建表单字段
  const nameField = form.createTextField('Name');
  nameField.setText('John Doe');
  nameField.updateAppearances(helveticaFont); // 使用嵌入的字体

  const dateField = form.createTextField('Date');
  dateField.setText(new Date().toLocaleDateString());
  dateField.updateAppearances(helveticaFont); // 使用嵌入的字体

  // 设置表单字段的位置和大小
  nameField.addToPage(newPage, {
    x: 50,
    y: height - 100,
    width: 200,
    height: 20,
  });

  dateField.addToPage(newPage, {
    x: 50,
    y: height - 150,
    width: 200,
    height: 20,
  });

  // 保存PDF
  const pdfBytes = await pdfDoc.save();
  // 下载逻辑
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'filled.pdf';
  link.click();
  URL.revokeObjectURL(url);
  console.log('PDF表单已填写并下载');
}
</script>
