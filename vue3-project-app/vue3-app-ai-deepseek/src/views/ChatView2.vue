<template>
  <div class="chat-view">
    <Sidebar />
    <MainContent />
    <RenameDialog />
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import MainContent from '@/components/MainContent.vue'
import RenameDialog from '@/components/RenameDialog.vue'
</script>


<style lang="scss" scoped>
.chat-view {
  display: flex;
  height: 100vh;
  background: #f5f5f5;
}
</style>
