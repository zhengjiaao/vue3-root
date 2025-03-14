<template>
  <div id="app">
    <h1>L7 集成高德地图示例</h1>
    <L7Map />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import L7Map from '../../components/l7/L7Map.vue';

export default defineComponent({
  name: 'App',
  components: {
    L7Map,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>