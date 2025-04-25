<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const backToLogin = () => {
  // userStore.logout()
  userStore.removeUser()
  router.push('/login')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="no-permission-container">
    <el-result
      icon="warning"
      title="访问受限"
      :sub-title="`账户为${userStore.role}，无法访问运维管理系统`"
    >
      <template #extra>
        <el-button type="primary" @click="backToLogin">返回登录</el-button>
        <el-button type="default" @click="goBack">返回上一步</el-button>
      </template>
    </el-result>
  </div>
</template>

<style scoped>
.no-permission-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}
</style>
