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
  name: "VueFetchPostFile",
  data() {
    return {
      url1: "http://localhost:19000/post/upload/v1",
      url2: "http://localhost:19000/post/upload/v3",
      url3: "http://localhost:19000/post/upload/v2",
      myfile1: {},
      myfile2: {},
      newFileName: "",
      myfile3: {},
      data1: {},
      data2: {},
      data3: {},
      fileFormData: {},
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

      //上传多文件
      const fileList = event.target.files;
      //创建表单数据
      let formData = new FormData();
      for (var i = 0; i < fileList.length; i++) {
        formData.append('files', fileList.item(i));
      }

      this.fileFormData = formData;
    },

    //上传单文件请求-1
    upload1: function () {
      var formData = new FormData();
      formData.append("file", this.myfile1);

      fetch(this.url1, {
        method: 'POST',  // POST/PUT
        body: formData
      })
          .then(response => response.json())
          .then((data) => {
            console.log(data);
            this.data1 = data;  // 箭头函数确保 this 指向正确
          })
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    },

    //上传单文件请求-2
    upload2: function () {
      var formData = new FormData();
      formData.append("file", this.myfile2);
      formData.append("filename", this.newFileName);

      fetch(this.url2, {
        method: 'POST',  // POST/PUT
        body: formData
      })
          .then(response => response.json())
          .then((data) => {
            console.log(data);
            this.data2 = data;  // 箭头函数确保 this 指向正确
          })
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    },

    //上传多文件请求-3
    upload3: function () {
      fetch(this.url3, {
        method: 'POST',
        body: this.fileFormData
      })
          .then(response => response.json())
          .then((data) => {
            console.log(data);
            this.data3 = data;  // 箭头函数确保 this 指向正确
          })
          .then(response => console.log('Success:', JSON.stringify(response)))
          .catch(error => console.error('Error:', error));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
