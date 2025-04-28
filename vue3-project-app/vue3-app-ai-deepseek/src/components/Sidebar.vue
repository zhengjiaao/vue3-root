<template>
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
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/chat2'
import { useRouter } from 'vue-router'
import { MoreFilled, Edit, Delete, Setting } from "@element-plus/icons-vue";

const router = useRouter()
const store = useChatStore()

const handleSettings = async () => {
  router.push('/settings')
}

const handleCommand = (conversationId: string, command: string) => {
  if (command === 'rename') {
    handleRenameConversation(conversationId);
  } else if (command === 'delete') {
    store.deleteConversation(conversationId);
  }
};

const handleRenameConversation = (conversationId: string) => {
  store.currentConversationIdToRename = conversationId
  store.newTitle = store.conversations.find(conv => conv.id === conversationId)?.title || ''
  store.renameDialogVisible = true
}
</script>

<style lang="scss" scoped>
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
}
</style>
