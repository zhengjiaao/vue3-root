<script setup lang="ts">
import L7MapPlot from '../../components/l7/plot/L7MapPlot.vue'
import L7MapPlotZhejiangProvinceDistrict from '../../components/l7/plot/L7MapPlotZhejiangProvinceDistrict.vue'
import L7MapPlotHangzhouCity from '../../components/l7/plot/L7MapPlotHangzhouCity.vue'
import L7MapPlotXihuDistrict from '../../components/l7/plot/L7MapPlotXihuDistrict.vue'
</script>

<!--地图渲染行政区划数据 示例-->
<template>
  <main>
    <!--<L7MapPlot/> &lt;!&ndash;地图上渲染-浙江省地图&ndash;&gt;-->
    <!--<L7MapPlotZhejiangProvinceDistrict/> &lt;!&ndash;地图上渲染-浙江省县级地图&ndash;&gt;-->
    <!--<L7MapPlotHangzhouCity/> &lt;!&ndash;地图上渲染-杭州市地图&ndash;&gt;-->
    <L7MapPlotXihuDistrict/> <!--地图上渲染-杭州市地图-->
  </main>
</template>
