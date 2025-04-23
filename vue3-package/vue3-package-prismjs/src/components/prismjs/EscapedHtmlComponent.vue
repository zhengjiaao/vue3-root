<template>
  <pre><code class="language-markup">{{ formattedAndHighlightedHtml }}</code></pre>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as Prism from 'prismjs'; // 正确引入 Prism 模块
import 'prismjs/components/prism-markup'; // 按需加载 markup 语言支持
import { html } from 'js-beautify'; // 使用命名导入方式

const rawHtml = `<script>alert('XSS')<\/script>`;
const formattedAndHighlightedHtml = ref<string>(''); // 存储格式化并高亮后的 HTML

onMounted(() => {
  // 格式化 HTML
  const formattedHtml = html(rawHtml, {
    indent_size: 2, // 设置缩进大小
    wrap_line_length: 80, // 设置换行长度
  });

  // 高亮格式化后的 HTML
  formattedAndHighlightedHtml.value = Prism.highlight(
    formattedHtml,
    Prism.languages.markup,
    'markup'
  );
});
</script>
