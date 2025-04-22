<template>
  <div>
    <h2>API 请求示例</h2>
    <div v-for="(result, index) in results" :key="index">
      <pre>{{ JSON.stringify(result, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface ResponseData {
  type: string
}

const results = ref<ResponseData[]>([])

const fetchData = async () => {
  try {
    // 发送 GET 请求
    const getResponse = await axios.get<ResponseData>('hello.json')
    results.value.push(getResponse.data)

    // 发送 POST 请求
    const postResponse = await axios.post<ResponseData>('hello.json')
    results.value.push(postResponse.data)
  } catch (error) {
    console.error('请求失败:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>