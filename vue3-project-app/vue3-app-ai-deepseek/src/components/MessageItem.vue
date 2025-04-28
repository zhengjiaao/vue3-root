<script setup lang="ts">
import { ref } from 'vue'
import { type Message, useChatStore } from '@/stores/chat'
import { formatRelativeTime, formatShortTime, formatFullTime } from '@/utils/date'
import { ElMessage } from 'element-plus'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';
import MarkdownIt from 'markdown-it';
import MarkdownItHighlightjs from 'markdown-it-highlightjs';
import DOMPurify from 'dompurify'

const props = defineProps<{
  message: Message
  conversationId: string
}>()

const store = useChatStore()

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.message.content)
    ElMessage.success('已复制到剪贴板')
  } catch {
    ElMessage.error('复制失败')
  }
}

// 初始化 MarkdownIt 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
}).use(MarkdownItHighlightjs);

// 渲染安全的Markdown
const renderMarkdown = (content: string) => {
  return DOMPurify.sanitize(md.render(content));
}

const isAbsoluteTime = ref(false) // 控制时间显示模式，默认为相对时间

const toggleTimeDisplay = () => {
  isAbsoluteTime.value = !isAbsoluteTime.value; // 切换时间显示模式
}
</script>


<template>
  <div class="message">
    <div class="header">
      <span
        class="time"
        @click="toggleTimeDisplay"
        :title="formatFullTime(message.timestamp)"
      >
        {{ isAbsoluteTime ? formatShortTime(message.timestamp) : formatRelativeTime(message.timestamp) }}
      </span>
      <div class="actions">
        <el-tooltip content="复制" placement="top">
          <el-button
              text
              @click="copyToClipboard"
          >
            <el-icon><DocumentCopy /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
    </div>

<!--    <div class="content">
      <span v-if="message.edited" class="edited-mark">（已编辑）</span>
      <div v-html="renderMarkdown(message.content)"></div>
    </div>-->
  </div>
</template>


<style>
.edited-mark {
  color: #999;
  font-size: 0.8em;
  margin-left: 8px;
}

.actions {
  opacity: 0;
  transition: opacity 0.3s;
}

.message:hover .actions {
  opacity: 1;
}
</style>
