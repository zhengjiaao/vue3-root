<template>
  <div class="hello" id="app">
    <h1>{{ msg }}</h1>

    <h3>jsonp请求-无参</h3>
    <input v-model="url1" placeholder="url">
    <button type="button" @click="getAjax1()">点击尝试</button>
    <h5>data: {{ addData1 }}</h5>
  </div>
</template>

<script>
export default {
  name: "VueResourceJsonp",
  data() {
    return {
      url1: "http://localhost:9090/#/index.html",
      addData1: {},
      msg: "演示JSONP请求",
    };
  },
  mounted() {
    //渲染页面时开始执行
    //this.getAjax();
    //this.getAjaxGinseng();
  },
  methods: {
    getAjax1: function () {  //无参请求
      var successCallback = (response) => {
        console.log('服务器请求成功了')
        let data = response.data;
        console.log(data)
        this.addData1 = data;
      }
      var errorCallback = (response) => {
        console.log('服务器请求出错了')
      }
      this.$http.jsonp(this.url1).then(successCallback, errorCallback);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
