<template>
  <!-- 场景1：静态代码高亮 -->
  <div class="example">
    <h3>基础代码高亮</h3>
    <pre class="line-numbers"><code class="language-javascript">{{ code1 }}</code></pre>
  </div>

  <!-- 场景2：动态语言切换 -->
  <div class="example">
    <h3>动态语言切换</h3>
    <select v-model="currentLanguage">
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="css">CSS</option>
      <option value="java">java</option>
    </select>
    <pre><code :class="`language-${currentLanguage}`">{{ code2 }}</code></pre>
  </div>

  <!-- 场景3：从文件加载代码 -->
  <div class="example">
    <h3>从文件加载代码</h3>
    <button @click="loadCode">加载代码文件</button>
    <pre><code class="language-javascript">{{ fileContent }}</code></pre>
  </div>

  <!-- 场景4：复制代码 -->
  <div class="example">
    <button @click="copyCode">复制</button>
    <pre><code class="language-javascript" ref="codeToCopy">function example() { return "Hello, World!"; }</code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
// 使用命名导入
import { highlightAll, highlightElement } from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
// 支持更多语言
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-go'

// 基础代码高亮
const code1 = ref(`function hello() {
  console.log('Hello, Prism!');
}`)

// 动态语言切换
const currentLanguage = ref('javascript')
const code2 = ref(`// 示例代码
${currentLanguage.value === 'javascript' ?
    "const sum = (a, b) => a + b;" :
    "const sum: (a: number, b: number) => number = (a, b) => a + b;"}`)

// 文件加载示例
const fileContent = ref('')

// 初始化高亮
onMounted(() => {
  highlightAll()
})

// 监听语言变化
watch(currentLanguage, async (newVal) => {
  await nextTick()
  const elements = document.querySelectorAll(`code.language-${newVal}`)
  elements.forEach(element => highlightElement(element))
})

// 加载外部代码文件
const loadCode = async () => {
  try {
    const response = await fetch('/example-code.js')
    fileContent.value = await response.text()
    await nextTick()
    highlightAll()
  } catch (error) {
    console.error('Error loading code file:', error)
  }
}

// 复制功能实现
const codeToCopy = ref<HTMLElement | null>(null)

const copyCode = async () => {
  if (codeToCopy.value) {
    const code = codeToCopy.value.textContent || ''
    await navigator.clipboard.writeText(code)
    alert('代码已复制到剪贴板！')
  } else {
    console.error('未找到代码块元素')
  }
}
</script>

<style>
/* 行号样式 */
pre.line-numbers {
  position: relative;
  padding-left: 3.8em;
  counter-reset: linenumber;
}

.line-numbers .line-numbers-rows {
  position: absolute;
  pointer-events: none;
  top: 0;
  font-size: 100%;
  left: -3.8em;
  width: 3em;
  letter-spacing: -1px;
  border-right: 1px solid #999;
  user-select: none;
}

/* 基础样式 */
pre[class*="language-"] {
  padding: 1em;
  margin: 1em 0;
  overflow: auto;
  border-radius: 4px;
}

code[class*="language-"] {
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 14px;
}
</style>
