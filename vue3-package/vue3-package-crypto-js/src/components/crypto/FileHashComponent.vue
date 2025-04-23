<template>
  <input type="file" @change="handleFileChange" />
  <p>SHA-256 Hash: {{ fileHash }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { calculateFileHash } from '@/utils/hash';

const fileHash = ref('');

const handleFileChange = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    fileHash.value = await calculateFileHash(file);
  }
};
</script>