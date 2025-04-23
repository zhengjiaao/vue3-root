<template>
  <div>
    <vue-office-excel
        :src="excelUrl"
        @rendered="rendered"
        @error="errorHandler"
        style="height: 600px;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueOfficeExcel from '@vue-office/excel';

// const excelUrl = ref('https://example.com/sample.xlsx');
const excelUrl = ref('/api/file/test.xlsx');

const rendered = () => {
  console.log('Excel 渲染完成');
};

const errorHandler = (e: Error) => {
  console.error('Excel 加载失败', e);
};
</script>