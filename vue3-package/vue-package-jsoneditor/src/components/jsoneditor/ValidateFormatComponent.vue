<template>
  <!-- 数据验证和格式化 -->
  <div>
    <div ref="editorRef" style="height: 400px;"></div>
    <div v-if="error" style="color: red;">{{ error }}</div>
    <button @click="validate">验证</button>
    <button @click="format">格式化</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import JSONEditor from 'jsoneditor'
import type { SchemaValidationError, ParseError } from 'jsoneditor'

const editorRef = ref<HTMLElement>()
const error = ref('')
let editor: JSONEditor | null = null

onMounted(() => {
  if (editorRef.value) {
    editor = new JSONEditor(editorRef.value, {
      mode: 'code',
      onValidationError: (errs: readonly (SchemaValidationError | ParseError)[]) => {
        error.value = errs.map(err => getErrorMessage(err)).join('\n')
      }
    })
    editor.setText('{invalid JSON}')
  }
})

const validate = () => {
  if (editor) {
    try {
      editor.get()
      error.value = ''
      alert('JSON有效！')
    } catch (err) {
      error.value = (err as Error).message
    }
  }
}

const format = () => {
  if (editor) {
    try {
      const json = editor.get()
      editor.set(json)
    } catch (err) {
      error.value = (err as Error).message
    }
  }
}

// 辅助函数：根据错误类型获取消息
function getErrorMessage(err: SchemaValidationError | ParseError): string {
  if ('message' in err && err.message) {
    return err.message
  } else if ('path' in err && err.path) {
    return `Schema validation error at path: ${err.path}`
  } else {
    return '未知错误'
  }
}
</script>
