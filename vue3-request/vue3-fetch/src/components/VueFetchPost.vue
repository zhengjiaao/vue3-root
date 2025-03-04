<template>
  <div class="hello" id="app">
    <h1>{{ msg }}</h1>

    <h3>post请求-无参</h3>
    <input v-model="url1" placeholder="url"/>
    <button type="button" @click="getAjax1()">点击尝试</button>
    <h5>data: {{ addData1 }}</h5>

    <h3>post请求-有参-单个参数</h3>
    <input v-model="url2" placeholder="url"/>
    <input v-model="myage" placeholder="age"/>
    <input v-model="myname" placeholder="name"/>
    <button type="button" @click="getAjax2()">点击尝试</button>
    <h3>data: {{ addData2 }}</h3>
  </div>
</template>

<script>

export default {
  name: "VueResourcePost",
  data() {
    return {
      url1: "http://localhost:19000/post",
      url2: "http://localhost:19000/post/object/v2",
      myage: "21",
      myname: "李四",
      addData1: {},
      addData2: {},
      msg: "演示POST请求",
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
      fetch(this.url1, {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      })
          .then((response) => response.text())  // 使用 text() 方法获取文本响应
          .then((data) => {
            console.log(data);
            this.addData1 = data;  // 箭头函数确保 this 指向正确
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    },
    getAjax2: function () {
      //有参请求
      fetch(this.url2, {
        body: JSON.stringify({name: 'lisi', id: "123"}),  //参数
        headers: {
          'Content-Type': 'application/json',  //需要指定headers
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.addData2 = data;  // 箭头函数确保 this 指向正确
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only
<style scoped>
</style>
-->
