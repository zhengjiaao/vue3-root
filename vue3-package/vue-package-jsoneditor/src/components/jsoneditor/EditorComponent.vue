<template>
  <!--实时数据同步（配合 Vue 响应式）-->
  <div>
    <div ref="editorRef" style="height: 400px;"></div>
    <div>实时数据：{{ prettyJson }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import JSONEditor from 'jsoneditor'

const editorRef = ref<HTMLElement>()
const jsonData = ref({
  project: 'Vue3 Editor',
  version: 1.0,
  features: ['editing', 'validation']
})

let editor: JSONEditor | null = null

onMounted(() => {
  if (editorRef.value) {
    editor = new JSONEditor(editorRef.value, {
      mode: 'tree',
      onChange: () => {
        try {
          jsonData.value = editor?.get() || {}
        } catch (err) {
          console.error('更新数据失败:', err)
        }
      }
    })
    editor.set(jsonData.value)
  }
})

const prettyJson = computed(() => {
  return JSON.stringify(jsonData.value, null, 2)
})
</script>