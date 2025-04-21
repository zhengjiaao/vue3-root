<template>
  <div class="container">
    <div ref="boxRef" class="animated-box"></div>
    <button @click="toggleAnimation">{{ isPlaying ? '暂停' : '播放' }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import gsap from 'gsap'

export default defineComponent({
  setup() {
    const boxRef = ref<HTMLElement>()
    const isPlaying = ref(true)
    let tl: gsap.core.Timeline

    // 初始化时间轴动画
    const initAnimation = () => {
      if (!boxRef.value) return

      tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        onComplete: () => console.log('动画完成'),
        onReverseComplete: () => console.log('反向完成')
      })

      tl.to(boxRef.value, {
        duration: 1,
        x: 300,
        rotation: 360,
        ease: 'power2.inOut'
      })
          .to(boxRef.value, {
            duration: 0.5,
            scale: 1.5,
            backgroundColor: '#ff4757',
            ease: 'bounce.out'
          }, '-=0.25') // 前一个动画结束前0.25秒开始
    }

    // 控制动画状态
    const toggleAnimation = () => {
      isPlaying.value ? tl.pause() : tl.play()
      isPlaying.value = !isPlaying.value
    }

    onMounted(() => {
      initAnimation()
    })

    return { boxRef, isPlaying, toggleAnimation }
  }
})
</script>

<style scoped>
.container {
  padding: 2rem;
}

.animated-box {
  width: 100px;
  height: 100px;
  background-color: #2ed573;
  border-radius: 8px;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background: #5352ed;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: filter 0.3s;
}

button:hover {
  filter: brightness(1.1);
}
</style>