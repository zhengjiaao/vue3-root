<template>
  <div class="error-container">
    <div class="error-content">
      <h1>403</h1>
      <div class="error-desc">抱歉，您没有访问该页面的权限</div>
      <el-button type="primary" @click="goToHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ElButton } from 'element-plus'; // 确保正确引入 Element Plus 组件

const router = useRouter();

// 定义方法跳转到首页
const goToHome = () => {
  router.push('/');
};
</script>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
}

.error-content {
  text-align: center;
}

h1 {
  font-size: 72px;
  margin-bottom: 20px;
  color: #606266;
}

.error-desc {
  font-size: 20px;
  color: #909399;
  margin-bottom: 30px;
}
</style>
