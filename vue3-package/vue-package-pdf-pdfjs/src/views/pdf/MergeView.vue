<script setup lang="ts">

// import PDF from '../../components/pdf/merge/MergeV1Component.vue'
// import PDF from '../../components/pdf/merge/MergeV2Component.vue'
// import PDF from '../../components/pdf/merge/MergeV3Component.vue'
import PDF from '../../components/pdf/merge/MergeV4Component.vue'
// 以上全部存在问题，问题是合并下载的pdf会很大，猜测是把源pdf的数据也一起合并了，导致pdf文件过大
</script>

<template>
  <main>
    <PDF />
  </main>
</template>
