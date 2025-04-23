<template>
  <div>
    <input v-model="inputText" placeholder="输入要加密的内容">
    <button @click="handleEncrypt">加密</button>
    <button @click="handleDecrypt">解密</button>
    <div v-if="encryptedResult">加密结果: {{ encryptedResult }}</div>
    <div v-if="decryptedResult">解密结果: {{ decryptedResult }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { encrypt, decrypt } from '@/utils/rsa'

const inputText = ref('Hello RSA!')
const encryptedResult = ref<string | false>('')
const decryptedResult = ref<string | false>('')

const handleEncrypt = () => {
  encryptedResult.value = encrypt(inputText.value)
}

// 注意：实际项目中解密应由后端完成
const handleDecrypt = () => {
  if (encryptedResult.value) {
    decryptedResult.value = decrypt(encryptedResult.value)
  }
}
</script>