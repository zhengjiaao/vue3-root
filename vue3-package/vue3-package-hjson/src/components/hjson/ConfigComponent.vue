<script setup lang="ts">
import { onMounted, ref } from 'vue'
// 方式一：静态导入（适用于构建时加载）- 未通过验证
// import type { AppConfig } from '@/utils/config'
// import { loadConfig } from '@/utils/config'
// 方式二：动态加载（适用于运行时加载）- 通过验证
import type { AppConfig } from '@/utils/config-loader'
import { loadConfig } from '@/utils/config-loader'

// 初始化 config 为一个默认值，避免 undefined
const config = ref<AppConfig | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    config.value = await loadConfig()
  } catch (error) {
    console.error('Configuration load error:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading">Loading configuration...</div>
  <div v-else>
    <!-- 使用可选链操作符访问属性 -->
    <h1 v-if="config?.app?.name">{{ config.app.name }}</h1>
    <p v-if="config?.app?.port">Port: {{ config.app.port }}</p>
    <ul v-if="config?.app?.features">
      <li v-for="feature in config.app.features" :key="feature">
        {{ feature }}
      </li>
    </ul>
    <!-- 提示信息，当配置加载失败或为空时 -->
    <p v-if="!config">Failed to load configuration.</p>
  </div>
</template>
