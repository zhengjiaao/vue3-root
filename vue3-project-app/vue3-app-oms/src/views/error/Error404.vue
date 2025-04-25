<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="error-page">
    <div class="error-content">
      <el-result
        icon="error"
        title="404 Not Found"
        sub-title="抱歉，您访问的页面不存在"
      >
        <template #extra>
          <el-button type="primary" @click="goHome">返回首页</el-button>
        </template>
      </el-result>

      <div class="error-animation">
        <div class="error-ghost">
          <div class="ghost-body">
            <div class="face">
              <div class="eye left"></div>
              <div class="eye right"></div>
              <div class="mouth"></div>
            </div>
          </div>
          <div class="shadow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;

  .error-content {
    text-align: center;
    max-width: 800px;
    padding: 20px;

    :deep(.el-result) {
      padding-top: 0;
    }

    .error-animation {
      margin-top: 50px;
    }

    .error-ghost {
      position: relative;
      width: 150px;
      height: 175px;
      margin: 0 auto;

      .ghost-body {
        position: absolute;
        width: 100%;
        height: 120px;
        background-color: #fff;
        border-radius: 100px 100px 0 0;
        animation: float 3s ease-out infinite;

        .face {
          position: absolute;
          width: 70px;
          height: 40px;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);

          .eye {
            position: absolute;
            width: 15px;
            height: 15px;
            background-color: #333;
            border-radius: 50%;
            top: 0;

            &.left {
              left: 0;
            }

            &.right {
              right: 0;
            }
          }

          .mouth {
            position: absolute;
            width: 30px;
            height: 15px;
            background-color: #333;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 0 0 15px 15px;
          }
        }
      }

      .shadow {
        position: absolute;
        width: 120px;
        height: 10px;
        background-color: rgba(0, 0, 0, 0.1);
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 50%;
        animation: scale 3s ease-out infinite;
      }
    }
  }
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0); }
}

@keyframes scale {
  0% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(0.8); }
  100% { transform: translateX(-50%) scale(1); }
}
</style>
