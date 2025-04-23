<!-- LocalizedComponent.vue -->
<script setup lang="ts">
import { useI18n } from '@/utils/i18n.ts'

const { currentLocale, loadLocale } = useI18n()
loadLocale('en')
</script>

<template>
  <div v-if="currentLocale">
    <p>{{ currentLocale.greeting.replace('{appName}', 'My App') }}</p>
    <button>{{ currentLocale.buttons.confirm }}</button>
  </div>
</template>