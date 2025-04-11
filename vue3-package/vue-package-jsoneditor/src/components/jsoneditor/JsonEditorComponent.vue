<template>
  <!--基础使用（显示和编辑 JSON）-->
  <div>
    <div ref="editorRef" style="height: 400px;"></div>
    <button @click="getJson">获取JSON</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import JSONEditor from 'jsoneditor'

const editorRef = ref<HTMLElement>()
let editor: JSONEditor | null = null

const initialData = {
  name: 'John',
  age: 30,
  hobbies: ['reading', 'music']
}

onMounted(() => {
  if (editorRef.value) {
    editor = new JSONEditor(editorRef.value, {
      mode: 'tree',
      modes: ['tree', 'code'],
      onChange: () => {
        console.log('JSON changed')
      }
    })
    editor.set(initialData)
  }
})

const getJson = () => {
  if (editor) {
    try {
      const json = editor.get()
      console.log('Current JSON:', json)
    } catch (err) {
      console.error('Invalid JSON:', err)
    }
  }
}

onUnmounted(() => {
  editor?.destroy()
})
</script>