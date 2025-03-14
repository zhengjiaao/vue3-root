<script setup lang="ts">
import BasicBar from '../../components/g2/bar/BasicBarComponent.vue'
import BasicBar2 from '../../components/g2/bar/BasicBarComponent2.vue'
import StackedBar from '../../components/g2/bar/StackedBarComponent.vue'
import PathIn from '../../components/g2/bar/PathInComponent.vue'
// import BarRace from '../../components/g2/bar/BarRaceComponent.vue'
// import Waterfall from '../../components/g2/bar/WaterfallComponent.vue'
</script>

<!--柱状图 示例-->
<template>
  <main>
    <PathIn/> <!--过度动画-->
    <BasicBar/> <!--基础柱状图-->
    <BasicBar2/> <!--基础柱状图2-->
    <StackedBar/> <!--堆叠柱状图-->
    <!--<StackedBar/> &lt;!&ndash;堆叠柱状图&ndash;&gt;-->
    <!--<BarRace/> &lt;!&ndash;动态排序柱状图&ndash;&gt;-->
    <!--<Waterfall/> &lt;!&ndash;阶梯瀑布图&ndash;&gt;-->
  </main>
</template>
