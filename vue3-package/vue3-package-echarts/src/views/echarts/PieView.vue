<script setup lang="ts">
import BasicPie from '../../components/pie/BasicPieComponent.vue'
import Doughnut from '../../components/pie/DoughnutComponent.vue'
import Rose from '../../components/pie/RoseComponent.vue'
</script>

<!--饼图 示例-->
<template>
  <main>
    <BasicPie/> <!--基础饼图-->
    <Doughnut/> <!--圆环图-->
    <Rose/> <!--南丁格尔图（玫瑰图）-->
  </main>
</template>
