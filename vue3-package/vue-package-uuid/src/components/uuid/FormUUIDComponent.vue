<template>
  <form @submit.prevent="submitForm">
    <input v-model="formData.name" placeholder="姓名" required />
    <button type="submit">提交</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

interface FormData {
  id: string;
  name: string;
}

const formData = ref<FormData>({
  id: '', // 初始化为空
  name: ''
});

function submitForm() {
  formData.value.id = uuidv4(); // 提交时生成唯一ID
  console.log('提交数据:', formData.value);
  // 发送请求到后端...
}
</script>