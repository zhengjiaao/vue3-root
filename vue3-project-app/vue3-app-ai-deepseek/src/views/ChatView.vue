<template>
  <div class="chat-view">
    <!-- 左侧对话列表 -->
    <div class="sidebar">
      <div class="sidebar-header">
        <el-button
            type="primary"
            @click="store.createNewConversation()"
            class="new-chat-btn"
        >
          新对话
        </el-button>
      </div>
      <div class="conversation-list">
        <div
            v-for="conv in store.conversations"
            :key="conv.id"
            :class="['conversation-item', { active: conv.id === store.currentConversationId }]"
            @click="store.currentConversationId = conv.id"
        >
          <span class="truncate">{{ conv.title }}</span>
          <el-dropdown @command="(command: 'rename' | 'delete') => handleCommand(conv.id, command)">
            <span class="el-dropdown-link">
              <el-icon class="el-icon-more"><MoreFilled /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="rename">
                  <el-icon><Edit /></el-icon>
                  重命名
                </el-dropdown-item>
                <el-dropdown-item command="delete" style="color: #F56C6C;">
                  <el-icon><Delete /></el-icon>
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="settings-button">
        <el-button text type="primary" @click="handleSettings">
          <el-icon class="is-loading">
            <Setting />
          </el-icon>
        </el-button>
      </div>
      <div v-if="!store.apiKey" class="api-key-warning">
        <el-alert type="error" show-icon>
          请先到<el-link @click="handleSettings" type="primary">设置页面</el-link>配置API Key
        </el-alert>
      </div>
      <div v-else class="api-key-configured">
        <el-alert type="success" show-icon>
          API Key 已配置
          <el-link @click="handleSettings" type="primary">修改设置</el-link>
        </el-alert>
      </div>
    </div>

    <!-- 右侧主聊天区域 -->
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

    <!-- 重命名对话框 -->
    <el-dialog
        v-model="renameDialogVisible"
        title="重命名对话"
        width="30%"
    >
      <el-input v-model="newTitle" placeholder="请输入新的对话标题"></el-input>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="renameDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirmRename">确定</el-button>
    </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';
import MarkdownIt from 'markdown-it';
import MarkdownItHighlightjs from 'markdown-it-highlightjs';
import DOMPurify from 'dompurify'
import MessageItem from "@/components/MessageItem.vue";
import {Setting, MoreFilled, Edit, Delete, Loading} from "@element-plus/icons-vue";

const router = useRouter()
const store = useChatStore()
const newMessage = ref('')
const chatAreaRef = ref<HTMLElement>()
const settingsRoute = { name: 'Settings' }

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

// 发送消息处理
const sendMessage = async () => {
  if (!newMessage.value.trim() || !store.apiKey) return

  try {
    await store.sendMessage(newMessage.value)
    newMessage.value = ''
    // 确保在内容更新后滚动到底部
    await nextTick()
    if (chatAreaRef.value) {
      chatAreaRef.value.scrollTop = chatAreaRef.value.scrollHeight
    }
  } catch (error) {
    console.error('发送消息失败:', error)
  }
}

// 自动滚动到底部
watchEffect(async () => {
  await nextTick()
  if (chatAreaRef.value) {
    chatAreaRef.value.scrollTop = chatAreaRef.value.scrollHeight
  }
})

// 初始化新对话
onMounted(() => {
  if (!store.currentConversationId && store.conversations.length === 0) {
    store.createNewConversation()
  }
})

// 路由跳转到设置页面
const handleSettings = async () => {
  router.push('/settings')
}

// 重命名对话相关逻辑
const renameDialogVisible = ref(false)
const currentConversationIdToRename = ref<string | null>(null)
const newTitle = ref('')

const handleRenameConversation = (conversationId: string) => {
  currentConversationIdToRename.value = conversationId
  newTitle.value = store.conversations.find(conv => conv.id === conversationId)?.title || ''
  renameDialogVisible.value = true
}

const confirmRename = () => {
  if (currentConversationIdToRename.value && newTitle.value.trim()) {
    store.renameConversation(currentConversationIdToRename.value, newTitle.value.trim())
    renameDialogVisible.value = false
  }
}

const handleCommand = (conversationId: string, command: string) => {
  if (command === 'rename') {
    handleRenameConversation(conversationId);
  } else if (command === 'delete') {
    store.deleteConversation(conversationId);
  }
};
</script>

<style lang="scss" scoped>
.message {
  position: relative;
  .time {
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
}
.chat-view {
  display: flex;
  height: 100vh;
  background: #f5f5f5;

  .sidebar {
    width: 260px;
    background: #ffffff;
    border-right: 1px solid #e4e7ed;
    display: flex;
    flex-direction: column;

    .sidebar-header {
      padding: 16px;
      border-bottom: 1px solid #e4e7ed;

      .new-chat-btn {
        width: 100%;
      }
    }

    .conversation-list {
      flex: 1;
      overflow-y: auto;

      .conversation-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: #f5f7fa;
        }

        &.active {
          background: #e8f4ff;
        }

        .truncate {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .el-dropdown-link {
          cursor: pointer;
          color: #409EFF;
        }
      }
    }
    .settings-button {
      text-align: center;
      padding: 8px;
      border-top: 1px solid #e4e7ed;
    }

/*    .api-key-warning {
      padding: 15px;
      border-top: 1px solid #e4e7ed;
    }

    .api-key-configured {
      padding: 15px;
      border-top: 1px solid #e4e7ed;
    }*/
  }

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
}
</style>

