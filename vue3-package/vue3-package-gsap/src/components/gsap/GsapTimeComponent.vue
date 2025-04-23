<template>
  <!--复杂时间轴动画-->
  <div class="toolbar">
    <button ref="btnRef" @click="toggle">菜单</button>
    <div ref="iconRef" class="icon">📦</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement | null>(null)
const iconRef = ref<HTMLElement | null>(null)
let tl: gsap.core.Timeline | null = null

// 实现多元素顺序动画（按钮+图标联动）
onMounted(() => {
  if (!btnRef.value || !iconRef.value) {
    console.error('DOM元素未正确挂载')
    return
  }

  tl = gsap.timeline({ paused: true })
    .to(btnRef.value, {
      duration: 0.5,
      x: 20,
      backgroundColor: '#4a90e2'
    })
    .to(iconRef.value, {
      duration: 0.8,
      rotation: 360,
      scale: 1.2
    }, '<0.2') // 与前一动画重叠0.2秒
})

// 通过事件触发动画
const toggle = () => {
  if (!tl) {
    console.error('时间轴未初始化')
    return
  }
  tl.reversed(!tl.reversed())
}
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
}

.icon {
  margin-left: 10px;
  font-size: 24px;
}
</style>
