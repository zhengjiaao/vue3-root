<script setup lang="ts">
import BasicBar from '../../components/bar/BasicBarComponent.vue'
import StackedBar from '../../components/bar/StackedBarComponent.vue'
import BarRace from '../../components/bar/BarRaceComponent.vue'
import Waterfall from '../../components/bar/WaterfallComponent.vue'
</script>

<!--柱状图 示例-->
<template>
  <main>
    <BasicBar/> <!--基础柱状图-->
    <StackedBar/> <!--堆叠柱状图-->
    <BarRace/> <!--动态排序柱状图-->
    <Waterfall/> <!--阶梯瀑布图-->
  </main>
</template>
