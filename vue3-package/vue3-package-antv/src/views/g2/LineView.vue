<script setup lang="ts">
import BasicLine from '../../components/g2/line/BasicLineComponent.vue'
// import StackedLine from '../../components/g2/line/StackedLineComponent.vue'
import AreaLine from '../../components/g2/line/AreaLineComponent.vue'
import PathIn from '../../components/g2/line/PathInComponent.vue'
// import StepLine from '../../components/g2/line/StepLineComponent.vue'
</script>

<!--折线图 示例-->
<template>
  <main>
    <PathIn/> <!--过度动画-->
    <BasicLine/> <!--基础折线图-->
    <!--<StackedLine/> &lt;!&ndash;堆叠折线图&ndash;&gt;-->
    <AreaLine/> <!--区域面积图折线图-->
    <!--<SmoothLine/> &lt;!&ndash;平滑曲线图&ndash;&gt;-->
    <!--<StepLine/> &lt;!&ndash;阶梯线图&ndash;&gt;-->
  </main>
</template>
