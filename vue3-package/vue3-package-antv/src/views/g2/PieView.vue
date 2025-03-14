<script setup lang="ts">
import BasicPie from '../../components/g2/pie/BasicPieComponent.vue'
import PathIn from '../../components/g2/pie/PathInComponent.vue'
// import Doughnut from '../../components/g2/pie/DoughnutComponent.vue'
// import Rose from '../../components/g2/pie/RoseComponent.vue'
</script>

<!--饼图 示例-->
<template>
  <main>
    <PathIn/> <!--过度动画-->
    <BasicPie/> <!--基础饼图-->
    <!--<Doughnut/> &lt;!&ndash;圆环图&ndash;&gt;-->
    <!--<Rose/> &lt;!&ndash;南丁格尔图（玫瑰图）&ndash;&gt;-->
  </main>
</template>
