<template>
  <div>
    <div class="input-container">
      <label for="inputText">Input Text:</label>
      <input type="text" id="inputText" v-model="inputText"></input>
      <button @click="handleEncrypt">Encrypt</button>
      <button @click="handleDecrypt">Decrypt</button>
    </div>
    <div>
      <p>Encrypted: {{ encrypted }}</p>
      <p>Decrypted: {{ decrypted }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { aesEncrypt, aesDecrypt } from '@/utils/crypto';

const inputText = ref('Secret Message');
const encrypted = ref('');
const decrypted = ref('');

const key = '1234567890abcdef'; // 16/24/32 bytes
const iv = 'abcdef1234567890';  // 16 bytes

const handleEncrypt = () => {
  try {
    const encryptedData = aesEncrypt(inputText.value, { key, iv });
    console.log('Encrypted Data:', encryptedData);
    encrypted.value = encryptedData;
  } catch (error) {
    console.error('Encryption Error:', error);
  }
};

const handleDecrypt = () => {
  if (!encrypted.value) {
    console.warn('No encrypted data to decrypt.');
    return;
  }

  try {
    const decryptedData = aesDecrypt(encrypted.value, { key, iv });
    console.log('Decrypted Data:', decryptedData);
    decrypted.value = decryptedData;
  } catch (error) {
    console.error('Decryption Error:', error);
  }
};
</script>
