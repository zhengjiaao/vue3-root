<template>
  <div ref="boxRef" class="animated-box"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  animate,
  stagger,
  createTimeline,
  createTimer,
  // ...other methods
} from 'animejs';

const boxRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (boxRef.value) {
    animate(boxRef.value, {
      x: 320,
      rotate: { from: -180 },
      duration: 1250,
      delay: stagger(65, { from: 'center' }),
      ease: 'inOutQuint',
      loop: true,
      alternate: true
    });
  }
});
</script>

<style scoped>
.animated-box {
  width: 100px;
  height: 100px;
  background: #4ecdc4;
}
</style>
