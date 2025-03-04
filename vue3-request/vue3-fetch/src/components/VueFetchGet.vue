<template>
  <div class="hello" id="app">
    <h1>{{ msg }}</h1>

    <h3>get请求-无参</h3>
    <input v-model="url1" placeholder="url"/>
    <button type="button" @click="getAjax1()">点击尝试</button>
    <h5>data: {{ addData1 }}</h5>

    <h3>get请求-有参-单个参数</h3>
    <input v-model="url2" placeholder="url"/>
    <input v-model="param" placeholder="param"/>
    <button type="button" @click="getAjax2()">点击尝试</button>
    <h3>data: {{ addData2 }}</h3>
  </div>
</template>

<script>

export default {
  name: "VueFetchGet",
  data() {
    return {
      url1: "http://localhost:19000/get/userdto",
      url2: "http://localhost:19000/get/param/v1",
      param: "李四",
      addData1: {},
      addData2: {},
      msg: "演示GET请求",
    };
  },
  mounted() {
    //渲染页面时开始执行
    //this.getAjax();
    //this.getAjax2();
  },
  methods: {
    //无参请求
    getAjax1: function () {
      //无参请求
      /*fetch(this.url1)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
        //注意这里得到的才是最终的数据
          console.log(data);
        });*/

      //无参请求
      fetch(this.url1, {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      }).then(response => response.json()) // 解析为 JSON
          .then(data => {
            // 在这里处理数据
            console.log(data);
            this.addData1 = data;
          })
          .catch(error => {
            // 处理错误
            console.error(error);
          });
    },

    //有参请求
    getAjax2: function () {
      fetch(this.url2 + "?" + "param=" + this.param, {
        method: 'GET',
      }).then(response => response.json()) // 解析为 JSON
          .then(data => {
            // 在这里处理数据
            console.log(data);
            this.addData2 = data;
          })
          .catch(error => {
            // 处理错误
            console.error(error);
          });
    }
    ,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
