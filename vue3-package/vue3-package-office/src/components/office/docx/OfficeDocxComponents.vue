<template>
  <div>
    <!--使用本地文件上传预览-->
    <input type="file" @change="handleFileChange" accept=".docx" />
    <vue-office-docx
        v-if="fileData"
        :src="fileData"
        style="height: 600px; margin-top: 20px;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueOfficeDocx from '@vue-office/docx';

const fileData = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      fileData.value = e.target.result;
    };
  }
};
</script>