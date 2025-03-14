<script setup lang="ts">
import L7MapLines from '../../components/l7/layers/L7MapLines.vue'
import L7MapPoints from '../../components/l7/layers/L7MapPoints.vue'
import L7MapPolygons from '../../components/l7/layers/L7MapPolygons.vue'
</script>

<!--给地图添加图层 示例-->
<template>
  <main>
    <!--<L7MapLines/> &lt;!&ndash;添加图层-点&ndash;&gt;-->
    <L7MapPoints/> <!--添加图层-线-->
    <!--<L7MapPolygons/> &lt;!&ndash;添加图层-面&ndash;&gt;-->
  </main>
</template>
