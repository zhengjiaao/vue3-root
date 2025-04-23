<template>
  <div class="pdf-search-container">
    <div class="search-bar">
      <input
          v-model="searchText"
          placeholder="搜索PDF内容..."
          @keyup.enter="search"
      />
      <button @click="search">搜索</button>
      <button @click="clearSearch" v-if="searchActive">清除</button>
      <span v-if="matches.length > 0">
        找到 {{ currentMatch + 1 }} / {{ matches.length }} 个匹配项
      </span>
    </div>

    <vue-pdf-embed
        :source="pdfSource"
        ref="pdfViewer"
        style="height: 800px;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed'; // 移除对 PdfViewerInstance 的导入

// 自定义 PdfViewerInstance 接口（根据实际需求调整）
interface PdfViewerInstance {
  search?: (text: string) => Promise<any[]>;
  scrollTo?: (pageNumber: number) => void;
  highlight?: (match: any) => void;
  clearSearch?: () => void;
}

// const pdfSource = ref('https://example.com/sample.pdf');
const pdfSource = ref('/api/file/test.pdf');
const pdfViewer = ref<PdfViewerInstance | null>(null); // 使用自定义接口
const searchText = ref('');
const searchActive = ref(false);
const matches = ref<any[]>([]);
const currentMatch = ref(0);

const search = async () => {
  if (!searchText.value.trim() || !pdfViewer.value) return;

  try {
    matches.value = await pdfViewer.value.search?.(searchText.value) || [];
    currentMatch.value = 0;
    searchActive.value = true;

    if (matches.value.length > 0) {
      highlightCurrentMatch();
    }
  } catch (error) {
    console.error('搜索失败:', error);
  }
};

const clearSearch = () => {
  searchText.value = '';
  searchActive.value = false;
  matches.value = [];
  pdfViewer.value?.clearSearch?.(); // 检查 clearSearch 是否存在
};

const highlightCurrentMatch = () => {
  if (matches.value.length === 0) return;

  const match = matches.value[currentMatch.value];
  pdfViewer.value?.scrollTo?.(match.pageNumber); // 检查 scrollTo 是否存在
  pdfViewer.value?.highlight?.(match); // 检查 highlight 是否存在
};

const nextMatch = () => {
  if (matches.value.length === 0) return;
  currentMatch.value = (currentMatch.value + 1) % matches.value.length;
  highlightCurrentMatch();
};

const prevMatch = () => {
  if (matches.value.length === 0) return;
  currentMatch.value = (currentMatch.value - 1 + matches.value.length) % matches.value.length;
  highlightCurrentMatch();
};

// 添加键盘快捷键
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      prevMatch();
    } else if (e.key === 'Enter') {
      nextMatch();
    }
  });
});
</script>

<style scoped>
/* 样式部分保持不变 */
</style>
