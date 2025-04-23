<template>
  <!--模式切换（代码/树形视图）-->
  <div>
    <select v-model="selectedMode" @change="changeMode">
      <option value="tree">Tree</option>
      <option value="code">Code</option>
    </select>
    <div ref="editorRef" style="height: 400px;"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import JSONEditor from 'jsoneditor'

const editorRef = ref<HTMLElement>()
const selectedMode = ref<'tree' | 'code'>('tree')
let editor: JSONEditor | null = null

onMounted(() => {
  if (editorRef.value) {
    editor = new JSONEditor(editorRef.value, {
      mode: selectedMode.value,
      modes: ['tree', 'code'],
      onChangeText: (jsonString) => {
        console.log('JSON text:', jsonString)
      }
    })
    editor.set({ message: 'Switch modes to see different views' })
  }
})

const changeMode = () => {
  if (editor) {
    editor.setMode(selectedMode.value)
  }
}
</script>