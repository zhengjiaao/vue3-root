<template>
  <div class="pdf-viewer">
    <!--PDF分页控制-->
    <div class="controls">
      <button @click="prevPage" :disabled="currentPage <= 1">上一页</button>
      <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">下一页</button>
      <input
          type="number"
          v-model.number="goToPage"
          min="1"
          :max="totalPages"
          @keyup.enter="jumpToPage"
      />
      <button @click="jumpToPage">跳转</button>
    </div>

    <vue-office-pdf
        :src="pdfUrl"
        :page="currentPage"
        @rendered="handleRendered"
        style="height: 800px;"
        ref="pdfViewer"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueOfficePdf from '@vue-office/pdf';
// import type { VueOfficePdfRef } from '@vue-office/pdf';

// const pdfUrl = ref('https://example.com/sample.pdf');
const pdfUrl = ref('/api/file/test.pdf');
const currentPage = ref(1);
const totalPages = ref(0);
const goToPage = ref(1);
// const pdfViewer = ref<VueOfficePdfRef | null>(null);
const pdfViewer = ref<any  | null>(null);

const handleRendered = (payload: any) => {
  if (payload?.totalPages) {
    totalPages.value = payload.totalPages;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    goToPage.value = currentPage.value;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    goToPage.value = currentPage.value;
  }
};

const jumpToPage = () => {
  const page = Math.max(1, Math.min(goToPage.value, totalPages.value));
  currentPage.value = page;
  goToPage.value = page;
};
</script>

<style scoped>
.pdf-viewer {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

button {
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

input[type="number"] {
  width: 60px;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}
</style>