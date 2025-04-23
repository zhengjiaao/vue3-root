<template>
  <div class="pdf-viewer">
    <div class="controls">
      <button @click="prevPage" :disabled="currentPage <= 1">上一页</button>
      <span>第 {{ currentPage }} 页 / 共 {{ pageCount || '...' }} 页</span>
      <button @click="nextPage" :disabled="currentPage >= pageCount">下一页</button>
      <input
          type="number"
          v-model.number="goToPage"
          min="1"
          :max="pageCount"
          @keyup.enter="jumpToPage"
      />
      <button @click="jumpToPage">跳转</button>
    </div>

    <vue-pdf-embed
        :source="pdfSource"
        :page="currentPage"
        @rendered="handleRendered"
        @page-count="handlePageCount"
        style="height: 800px;"
        ref="pdfViewer"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed';

// const pdfSource = ref('https://example.com/sample.pdf');
const pdfSource = ref('/api/file/test.pdf');
const currentPage = ref(1);
const pageCount = ref(0);
const goToPage = ref(1);
const pdfViewer = ref<InstanceType<typeof VuePdfEmbed> | null>(null);

const handleRendered = () => {
  console.log('当前页渲染完成');
};

const handlePageCount = (count: number) => {
  pageCount.value = count;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    goToPage.value = currentPage.value;
  }
};

const nextPage = () => {
  if (currentPage.value < pageCount.value) {
    currentPage.value++;
    goToPage.value = currentPage.value;
  }
};

const jumpToPage = () => {
  const page = Math.max(1, Math.min(goToPage.value, pageCount.value));
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