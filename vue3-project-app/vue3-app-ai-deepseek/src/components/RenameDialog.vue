<template>
  <el-dialog
      v-model="store.renameDialogVisible"
      title="重命名对话"
      width="30%"
  >
    <el-input v-model="store.newTitle" placeholder="请输入新的对话标题"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.renameDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRename">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/chat2'

const store = useChatStore()

const confirmRename = () => {
  if (store.currentConversationIdToRename && store.newTitle.trim()) {
    store.renameConversation(store.currentConversationIdToRename, store.newTitle.trim())
    store.renameDialogVisible = false
  }
}
</script>
