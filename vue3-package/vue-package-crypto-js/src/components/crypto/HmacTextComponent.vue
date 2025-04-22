<template>
  <div class="container">
    <div class="input-group">
      <input type="text" v-model="text" placeholder="Enter text" />
      <input type="text" v-model="secret" placeholder="Enter secret" />
      <button @click="copyToClipboard">Copy HMAC</button>
      <div class="output">
        <div class="output-text">{{ hmac }}</div>
      </div>
      <div class="message" v-if="copyMessage">{{ copyMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { generateHMAC } from '@/utils/hmac';

const text = ref('');
const secret = ref('');
const hmac = computed(() => generateHMAC(text.value, secret.value));
const copyMessage = ref('');

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(hmac.value);
    copyMessage.value = 'HMAC copied to clipboard!';
    setTimeout(() => {
      copyMessage.value = '';
    }, 2000);
  } catch (error) {
    console.error('Failed to copy text: ', error);
    copyMessage.value = 'Failed to copy HMAC.';
    setTimeout(() => {
      copyMessage.value = '';
    }, 2000);
  }
};

// 示例2：签名请求参数
const generateExampleSignature = () => {
  const params = { userId: '123', timestamp: Date.now() };
  const stringifiedParams: Record<string, string> = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );
  const queryString = new URLSearchParams(stringifiedParams).toString();
  const signature = generateHMAC(queryString, 'your-secret-key');
  console.log('QueryString:', queryString);
  console.log('Signature:', signature);
};

// 初始化时生成示例签名
generateExampleSignature();
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.output {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.output-text {
  font-family: monospace;
}

.message {
  margin-top: 10px;
  color: green;
  font-weight: bold;
}
</style>
