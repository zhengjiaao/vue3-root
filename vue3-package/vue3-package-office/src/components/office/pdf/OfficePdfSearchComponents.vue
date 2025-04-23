<template>
  <div class="pdf-search-container">
    <!--PDF搜索与高亮-->
    <div class="search-bar">
      <input
          v-model="searchText"
          placeholder="搜索PDF内容..."
          @keyup.enter="search"
      />
      <button @click="search">搜索</button>
      <button @click="clearSearch" v-if="searchResults.length > 0">清除</button>
      <span v-if="searchResults.length > 0">
        共找到 {{ searchResults.length }} 个结果
      </span>
      <div class="navigation" v-if="searchResults.length > 0">
        <button @click="prevMatch" :disabled="currentMatchIndex <= 0">上一个</button>
        <span>{{ currentMatchIndex + 1 }} / {{ searchResults.length }}</span>
        <button @click="nextMatch" :disabled="currentMatchIndex >= searchResults.length - 1">下一个</button>
      </div>
    </div>

    <vue-office-pdf
        :src="pdfUrl"
        :search-text="searchText"
        :highlight="highlightOptions"
        @rendered="handleRendered"
        @search-complete="handleSearchComplete"
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
const searchText = ref('');
const searchResults = ref<any[]>([]);
const currentMatchIndex = ref(-1);
const pdfViewer = ref<any  | null>(null);

const highlightOptions = ref({
  color: '#ffff00', // 高亮颜色
  opacity: 0.5,     // 透明度
});

const search = () => {
  if (!searchText.value.trim()) return;
  currentMatchIndex.value = -1;
  pdfViewer.value?.searchText(searchText.value);
};

const clearSearch = () => {
  searchText.value = '';
  searchResults.value = [];
  currentMatchIndex.value = -1;
  pdfViewer.value?.clearSearch();
};

const handleRendered = () => {
  console.log('PDF渲染完成');
};

const handleSearchComplete = (results: any[]) => {
  searchResults.value = results;
  if (results.length > 0) {
    currentMatchIndex.value = 0;
    jumpToMatch(currentMatchIndex.value);
  }
};

const prevMatch = () => {
  if (currentMatchIndex.value > 0) {
    currentMatchIndex.value--;
    jumpToMatch(currentMatchIndex.value);
  }
};

const nextMatch = () => {
  if (currentMatchIndex.value < searchResults.value.length - 1) {
    currentMatchIndex.value++;
    jumpToMatch(currentMatchIndex.value);
  }
};

const jumpToMatch = (index: number) => {
  const match = searchResults.value[index];
  if (match && pdfViewer.value) {
    pdfViewer.value.scrollToPage(match.pageNumber);
    // 这里需要根据具体实现来高亮匹配项
    // pdfViewer.value.highlightMatch(match);
  }
};
</script>

<style scoped>
.pdf-search-container {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

input {
  flex-grow: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 300px;
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

.navigation {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
}

.navigation span {
  min-width: 50px;
  text-align: center;
}
</style>