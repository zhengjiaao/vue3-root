<template>
  <!--组件入场/离场动画-->
  <div ref="cardRef" class="card">
    <h3>Welcome to GSAP</h3>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const cardRef = ref<HTMLElement | null>(null)

// 实现元素挂载时的淡入缩放效果
onMounted(() => {
  if (cardRef.value) {
    gsap.from(cardRef.value, {
      duration: 1,
      opacity: 0,
      scale: 0.5,
      ease: 'back.out(1.7)'
    })
  } else {
    console.error('Element reference not found.')
  }
})
</script>