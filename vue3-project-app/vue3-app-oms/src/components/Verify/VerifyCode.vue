<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const canvasRef = ref<HTMLCanvasElement>()
const code = ref('')
const containerRef = ref<HTMLElement>()

// 生成随机字符
const randomChar = () => {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  return chars[Math.floor(Math.random() * chars.length)]
}

// 生成验证码
const generateCode = () => {
  code.value = Array.from({ length: 4 }, randomChar).join('')
  drawCode()
  emit('update:modelValue', code.value)
}

// 绘制验证码
const drawCode = () => {
  if (!canvasRef.value) return

  const ctx = canvasRef.value.getContext('2d')!
  const width = canvasRef.value.width
  const height = canvasRef.value.height

  // 清空画布
  ctx.clearRect(0, 0, width, height)

  // 绘制背景
  ctx.fillStyle = '#f5f7fa'
  ctx.fillRect(0, 0, width, height)

  // 绘制干扰线
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
    ctx.beginPath()
    ctx.moveTo(Math.random() * width, Math.random() * height)
    ctx.lineTo(Math.random() * width, Math.random() * height)
    ctx.stroke()
  }

  // 绘制文字
  const charWidth = width / 4
  code.value.split('').forEach((char, index) => {
    ctx.font = `${height * 0.7}px Arial` // 减少字体大小
    ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center' // 设置文本对齐方式为居中
    ctx.save()
    ctx.translate(charWidth * index + charWidth / 2, height / 2)
    ctx.rotate((Math.random() - 0.5) * 0.3) // 减少旋转角度
    ctx.fillText(char, 0, 0)
    ctx.restore()
  })
}

// 调整 canvas 大小
const adjustCanvasSize = () => {
  if (!containerRef.value || !canvasRef.value) return
  canvasRef.value.width = containerRef.value.clientWidth
  canvasRef.value.height = containerRef.value.clientHeight
  drawCode()
}

onMounted(() => {
  generateCode()
  adjustCanvasSize()
})

// 监听容器尺寸变化
watch(
  () => containerRef.value?.clientWidth,
  () => {
    adjustCanvasSize()
  }
)

watch(
  () => containerRef.value?.clientHeight,
  () => {
    adjustCanvasSize()
  }
)
</script>

<template>
  <div class="verify-code" ref="containerRef">
    <canvas
      ref="canvasRef"
      @click="generateCode"
    ></canvas>
  </div>
</template>

<style scoped>
.verify-code {
  width: 100%;
  height: 100%;
}

.verify-code canvas {
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
</style>
