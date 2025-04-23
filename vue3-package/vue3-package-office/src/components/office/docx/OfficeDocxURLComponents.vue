<template>
  <div>
    <!--基本使用示例，基于url预览-->
    <vue-office-docx
        :src="docxUrl"
        @rendered="rendered"
        @error="errorHandler"
        style="height: 600px;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueOfficeDocx from '@vue-office/docx';

// const docxUrl = ref('https://example.com/document.docx'); // 跨域需处理
// const docxUrl = ref('http://localhost:19000/file/test.docx'); // 跨域需处理
const docxUrl = ref('/api/file/test.docx');

const rendered = () => {
  console.log('文档渲染完成');
};

const errorHandler = (e) => {
  console.error('文档加载失败', e);
};
</script>
