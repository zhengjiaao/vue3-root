<template>
  <div>
    <input type="file" @change="handleFileChange" accept=".xlsx,.xls" />
    <vue-office-excel
        v-if="fileData"
        :src="fileData"
        style="height: 600px; margin-top: 20px;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueOfficeExcel from '@vue-office/excel';

const fileData = ref<ArrayBuffer | null>(null);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      fileData.value = e.target?.result as ArrayBuffer;
    };
  }
};
</script>