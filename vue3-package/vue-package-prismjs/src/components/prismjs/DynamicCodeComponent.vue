<template>
  <!--动态加载代码 + 行号-->
  <div class="code-container">
    <button @click="loadCode">加载代码</button>
    <pre class="line-numbers"><code class="language-javascript">{{ dynamicCode }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
// 使用命名导入
import * as Prism from 'prismjs';
import 'prismjs/components/prism-javascript'; // 按需加载 JavaScript 语法高亮
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

const dynamicCode = ref('');

const loadCode = async () => {
  // 模拟 API 请求
  dynamicCode.value = `function sum(a, b) {
    return a + b;
  }`;
  await nextTick(); // 确保 DOM 更新完成
  Prism.highlightAll(); // 高亮代码
};

onMounted(() => {
  Prism.highlightAll();
});
</script>

<style>
.line-numbers {
  padding-left: 3.8em !important; /* 行号对齐 */
}
.code-toolbar {
  position: relative;
}
.toolbar-item button {
  background: #2c3e50 !important;
  color: white !important;
}
</style>
