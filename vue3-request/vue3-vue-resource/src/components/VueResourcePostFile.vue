<template>
  <div class="hello" id="app">
    <h1>{{ msg }}</h1>

    <h3>post请求-上传单文件</h3>
    <form @submit.prevent="upload1" method="post" enctype="multipart/form-data">
      <input type="file" name="myfile1" v-on:change="onChange1($event)"/>
      <button type="submit">上传单文件-1</button>
    </form>
    <p>{{ data1 }}</p>

    <h3>post请求-上传单文件-重命名</h3>
    <form @submit.prevent="upload2" method="post" enctype="multipart/form-data">
      <input type="file" name="myfile2" v-on:change="onChange2($event)"/>
      <input v-model="newFileName" placeholder="newFileName"/>
      <button type="submit">上传单文件-2</button>
    </form>
    <p>{{ data2 }}</p>

    <h3>post请求-上传多文件</h3>
    <form @submit.prevent="upload3" method="post" enctype="multipart/form-data">
      <!--可选多文件 multiple="multiple" -->
      <input
          type="file"
          name="myfile3"
          multiple="multiple"
          v-on:change="onChange3($event)"
      />
      <button type="submit">上传多文件-3</button>
    </form>
    <p>{{ data3 }}</p>
  </div>
</template>

<script>
export default {
  name: "VueResourcePostFile",
  data() {
    return {
      url1:
          "http://localhost:19000/post/upload/v1",
      url2:
          "http://localhost:19000/post/upload/v3",
      url3:
          "http://localhost:19000/post/upload/v2",
      myfile1: {},
      myfile2: {},
      newFileName: "",
      myfile3: {},
      data1: {},
      data2: {},
      data3: {},
      fileFormData: null,
      msg: "演示POST请求-上传文件",
    };
  },
  mounted() {
    //渲染页面时开始执行
    //this.upload1();
  },
  methods: {
    onChange1: function (event) {
      this.myfile1 = event.target.files[0]; // get input file object
      console.log(this.myfile1);
    },
    onChange2: function (event) {
      this.myfile2 = event.target.files[0]; // get input file object
      console.log(this.myfile2);
    },
    onChange3: function (event) {
      //创建表单数据
      this.fileFormData = new FormData();
      for (let i = 0; i <= event.target.files.length - 1; i++) {
        console.log(event.target.files[i]);
        this.fileFormData.append("files", event.target.files[i]);
      }
    },

    //上传单文件请求-1
    upload1: function () {
      var that = this;
      //表单数据
      var formData = new FormData();
      formData.append("file", this.myfile1);

      var successCallback = (response) => {
        console.log("服务器请求成功了");
        let data = response.data;
        console.log(data);
        this.data1 = data;
      };
      var errorCallback = (response) => {
        console.log("服务器请求出错了");
      };
      this.$http
          .post(
              this.url1,
              formData,
              {
                headers: {"Content-Type": "multipart/form-data"},
              }
          )
          .then(successCallback, errorCallback);
    },

    //上传单文件请求-2
    upload2: function () {
      var that = this;
      //表单数据
      var formData = new FormData();
      formData.append("file", this.myfile2);
      formData.append("fileName", this.newFileName);
      var successCallback = (response) => {
        console.log("服务器请求成功了");
        let data = response.data;
        console.log(data);
        this.data2 = data;
      };
      var errorCallback = (response) => {
        console.log("服务器请求出错了");
      };
      //请求
      this.$http
          .post(this.url2, formData, {
            headers: {"Content-Type": "multipart/form-data"},
          })
          .then(successCallback, errorCallback);
    },

    //上传多文件请求-3
    upload3: function () {
      var that = this;
      /* var formData = new FormData();
      formData.append("files", this.myfile3); */
      var successCallback = (response) => {
        console.log("服务器请求成功了");
        let data = response.data;
        console.log(data);
        this.data3 = data;
      };
      var errorCallback = (response) => {
        console.log("服务器请求出错了");
      };
      this.$http
          .post(this.url3, this.fileFormData, {
            headers: {"Content-Type": "multipart/form-data"},
          })
          .then(successCallback, errorCallback);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
