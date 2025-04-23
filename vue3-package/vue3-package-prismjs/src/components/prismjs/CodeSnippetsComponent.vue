<template>
  <div>
    <select v-model="currentLang">
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
    </select>
    <pre><code :class="`language-${currentLang}`">{{ codeSnippets[currentLang] }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { highlightAll } from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';

// 定义语言类型为联合类型
type Language = 'javascript' | 'python';

// 初始化 currentLang 并指定其类型为 Language
const currentLang = ref<Language>('javascript');

// 定义 codeSnippets，键为 Language 类型
const codeSnippets: Record<Language, string> = {
  javascript: 'const arr = [1, 2, 3];',
  python: 'def greet():\n    print("Hello")'
};

watch(currentLang, () => {
  // 当语言切换时重新高亮
  nextTick(() => {
    highlightAll();
  });
});

// 初始化时高亮一次
highlightAll();
</script>

<style>
/* 引入 Prism.js 样式 */
@import 'prismjs/themes/prism.css';
</style>
