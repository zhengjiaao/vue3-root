<template>
  <div class="main-content">
    <!-- 错误提示 -->
    <el-alert
      v-if="store.error"
      :title="store.error"
      type="error"
      show-icon
      closable
      @close="store.error = null"
    />

    <!-- 聊天内容区域 -->
    <div ref="chatAreaRef" class="chat-area">
      <template v-if="store.currentConversation">
        <div
          v-for="msg in store.currentConversation.messages"
          :key="msg.timestamp"
          :class="['message', msg.role]"
        >
          <div class="avatar">
            <img
              v-if="msg.role === 'user'"
              src="@/assets/user-avatar.png"
              alt="user"
            />
            <img
              v-else
              src="@/assets/bot-avatar.png"
              alt="bot"
            />
          </div>
          <MessageItem
            :message="msg"
            :conversationId="store.currentConversationId!"
          />
          <div
            class="content"
            v-html="renderMarkdown(msg.content)"
          ></div>
        </div>
        <div v-if="store.loading" class="loading-indicator">
          <el-icon class="is-loading">
            <Loading />
          </el-icon>
          思考中...
        </div>
      </template>
      <div v-else class="empty-chat">
        <el-empty description="请选择或新建一个对话" />
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <el-input
        v-model="newMessage"
        type="textarea"
        :rows="2"
        :disabled="!store.apiKey || store.loading"
        placeholder="输入消息，回车发送"
        @keydown.enter.exact.prevent="sendMessage"
      />
      <el-button
        type="primary"
        :disabled="!newMessage.trim() || store.loading"
        @click="sendMessage"
        class="send-btn"
      >
        发送
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watchEffect } from 'vue';
import { useChatStore } from '@/stores/chat2';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import MarkdownIt from 'markdown-it';
import MarkdownItHighlightjs from 'markdown-it-highlightjs';
import DOMPurify from 'dompurify';
import MessageItem from '@/components/MessageItem.vue';
import { Loading } from '@element-plus/icons-vue';

const store = useChatStore();
const newMessage = ref('');
const chatAreaRef = ref<HTMLElement>();

// 初始化 MarkdownIt 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
}).use(MarkdownItHighlightjs);

// 渲染安全的 Markdown
const renderMarkdown = (content: string) => {
  return DOMPurify.sanitize(md.render(content));
};

// 发送消息处理
const sendMessage = async () => {
  if (!newMessage.value.trim() || !store.apiKey) return;

  try {
    await store.sendMessage(newMessage.value);
    newMessage.value = '';

    // 确保在内容更新后滚动到底部
    await nextTick();
    if (chatAreaRef.value) {
      chatAreaRef.value.scrollTop = chatAreaRef.value.scrollHeight;
    }
  } catch (error) {
    console.error('发送消息失败:', error);
  }
};

// 初始化新对话
onMounted(() => {
  if (!store.currentConversationId && store.conversations.length === 0) {
    store.createNewConversation();
  }
});

// 自动滚动到底部
watchEffect(async () => {
  await nextTick();
  if (chatAreaRef.value) {
    chatAreaRef.value.scrollTop = chatAreaRef.value.scrollHeight;
    console.log('Scrolled to bottom'); // 添加日志
  }
});
</script>

<style lang="scss" scoped>
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;

  .chat-area {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #fafafa;

    .message {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;

      &.user {
        flex-direction: row-reverse;

        .content {
          background: #e3f2fd;
          border-radius: 12px 12px 0 12px;
        }
      }

      &.assistant {
        .content {
          background: #ffffff;
          border-radius: 12px 12px 12px 0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }
      }

      .avatar {
        width: 32px;
        height: 32px;
        flex-shrink: 0;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .content {
        max-width: 80%;
        padding: 12px 16px;
        line-height: 1.6;
        word-break: break-word;

        :deep(pre) {
          background: #f8f8f8 !important;
          padding: 12px;
          border-radius: 6px;
          overflow-x: auto;

          code {
            font-family: Monaco, Consolas, monospace;
            font-size: 14px;
          }
        }

        :deep(code) {
          padding: 2px 4px;
          background: #f8f8f8;
          border-radius: 4px;
          font-family: Monaco, Consolas, monospace;
        }
      }
    }

    .loading-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      padding: 12px 16px;
    }

    .empty-chat {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .input-area {
    padding: 20px;
    border-top: 1px solid #e4e7ed;
    background: #ffffff;
    position: relative;

    :deep(.el-textarea__inner) {
      padding-right: 80px;
      resize: none;
    }

    .send-btn {
      position: absolute;
      right: 30px;
      bottom: 30px;
      transition: all 0.3s;
    }
  }
}
</style>
