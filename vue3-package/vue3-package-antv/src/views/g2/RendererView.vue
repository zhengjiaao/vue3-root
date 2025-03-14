<script setup lang="ts">
import CanvasRenderer from '../../components/g2/renderer/CanvasRendererComponent.vue'
import SVGRenderer from '../../components/g2/renderer/SVGRendererComponent.vue'
import WebGLRenderer from '../../components/g2/renderer/WebGLRendererComponent.vue'
</script>

<!--渲染器 示例-->
<template>
  <main>
    <CanvasRenderer/> <!--Canvas 渲染器-->
    <SVGRenderer/> <!--SVG 渲染器-->
    <WebGLRenderer/> <!--WebGL 渲染器-->
  </main>
</template>
