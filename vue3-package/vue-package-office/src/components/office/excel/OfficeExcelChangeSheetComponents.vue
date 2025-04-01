<template>
  <div>
    <div class="sheet-controls" v-if="sheets.length > 0">
      <label>选择工作表:</label>
      <select v-model="currentSheet" @change="changeSheet">
        <option v-for="sheet in sheets" :key="sheet" :value="sheet">
          {{ sheet }}
        </option>
      </select>
    </div>

    <vue-office-excel
        :src="excelData"
        :options="currentOptions"
        style="height: 600px;"
        @rendered="handleRendered"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'; // 修复：显式导入 onMounted
import VueOfficeExcel from '@vue-office/excel';

const excelData = ref<ArrayBuffer | null>(null);
const sheets = ref<string[]>([]);
const currentSheet = ref('');
const currentOptions = ref({
  sheet: '', // 当前显示的工作表
  showGridLines: true
});

// 模拟加载Excel数据
onMounted(async () => {
  try {
    // const response = await fetch('https://example.com/multi-sheet.xlsx');
    const response = await fetch('/api/file/test.xlsx');
    if (!response.ok) {
      throw new Error('Failed to load Excel file');
    }
    excelData.value = await response.arrayBuffer();
  } catch (error) {
    console.error('Error loading Excel data:', error);
  }
});

const handleRendered = (payload: any) => {
  // 获取所有工作表名称
  if (payload?.workbook) {
    sheets.value = payload.workbook.SheetNames;
    if (sheets.value.length > 0) {
      currentSheet.value = sheets.value[0];
      currentOptions.value.sheet = sheets.value[0];
    }
  }
};

const changeSheet = () => {
  currentOptions.value = {
    ...currentOptions.value,
    sheet: currentSheet.value
  };
};
</script>

<style scoped>
.sheet-controls {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

select {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>
