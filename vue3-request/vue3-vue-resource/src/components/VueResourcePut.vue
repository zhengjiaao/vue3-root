<template>
  <div class="hello" id="app">
    <h1>{{ msg }}</h1>

    <h3>put请求-无参</h3>
    <input v-model="url1" placeholder="url"/>
    <button type="button" @click="getAjax1()">点击尝试</button>
    <h5>data: {{ addData1 }}</h5>

    <h3>put请求-有参-单个参数</h3>
    <input v-model="url2" placeholder="url"/>
    <input v-model="myage" placeholder="age"/>
    <input v-model="myname" placeholder="name"/>
    <button type="button" @click="getAjax2()">点击尝试</button>
    <h3>data: {{ addData2 }}</h3>
  </div>
</template>

<script>
export default {
  name: "VueResourcePut",
  data() {
    return {
      url1:
          "http://localhost:19000/put",
      url2:
          "http://localhost:19000/put/object/v2",
      myage: "21",
      myname: "李四",
      addData1: {},
      addData2: {},
      msg: "演示PUT请求",
    };
  },
  mounted() {
    //渲染页面时开始执行
    //this.getAjax();
    //this.getAjaxGinseng();
  },
  methods: {
    getAjax1: function () {
      //无参请求
      var successCallback = (response) => {
        console.log("服务器请求成功了");
        let data = response.data;
        console.log(data);
        this.addData1 = data;
      };
      var errorCallback = (response) => {
        console.log("服务器请求出错了");
      };
      this.$http.put(this.url1).then(successCallback, errorCallback);
    },
    getAjax2: function () {
      //有参请求
      var successCallback = (response) => {
        console.log("服务器请求成功了");
        let data = response.data;
        console.log(data);
        this.addData2 = data;
      };
      var errorCallback = (response) => {
        console.log("服务器请求出错了");
      };
      this.$http
          .put(
              this.url2,
              {
                name: this.myname,
                age: this.myage,
              },
              {
                emulateJSON: false, //post 开启json传输参数,同时解决跨域问题
              }
          )
          .then(successCallback, errorCallback);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
