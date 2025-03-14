<script setup lang="ts">
import L7DrawPoint from '../../components/l7/draw/L7DrawPoint.vue'
import L7DrawLine from '../../components/l7/draw/L7DrawLine.vue'
import L7DrawPolygons from '../../components/l7/draw/L7DrawPolygon.vue'
import L7DrawControl from '../../components/l7/draw/L7DrawControl.vue'
</script>

<!--给地图添加图层 示例-->
<template>
  <main>
    <!--<L7DrawPoint/> &lt;!&ndash;绘制-点&ndash;&gt;-->
    <!--<L7DrawLine/> &lt;!&ndash;绘制-线&ndash;&gt;-->
    <!--<L7DrawPolygons/> &lt;!&ndash;绘制-面&ndash;&gt;-->
    <L7DrawControl/> <!--绘制-面-->
  </main>
</template>
