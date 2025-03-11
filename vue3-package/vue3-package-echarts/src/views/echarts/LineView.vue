<script setup lang="ts">
import BasicLine from '../../components/line/BasicLineComponent.vue'
import StackedLine from '../../components/line/StackedLineComponent.vue'
import AreaLine from '../../components/line/AreaLineComponent.vue'
import SmoothLine from '../../components/line/SmoothLineComponent.vue'
import StepLine from '../../components/line/StepLineComponent.vue'
</script>

<!--折线图 示例-->
<template>
  <main>
    <BasicLine/> <!--基础折线图-->
    <StackedLine/> <!--堆叠折线图-->
    <AreaLine/> <!--区域面积图折线图-->
    <SmoothLine/> <!--平滑曲线图-->
    <StepLine/> <!--阶梯线图-->
  </main>
</template>
