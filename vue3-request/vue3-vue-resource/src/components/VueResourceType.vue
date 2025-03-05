<template>
  <div id="app">
    <button v-on:click="getJson">点击获取数据</button>
    <!--    后端返回的是字典 -->
    <ul>
      <li v-for="(value, key) in info" v-bind:key="key">
        {{ key }} : {{ value }}
      </li>
    </ul>
    <li>哈哈哈</li>
    <li>嘿嘿嘿</li>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      info: ''
    }
  },
  methods: {
    getJson: function () {
      // vue-resource发送get请求,需要加上 params:参数
      // this.$http.get('http://127.0.0.1:8000/app01/json_data/', {params: {id: 3}})

      // vue-resource发送post请求, 需要将json对象转化为form类型的数据,所以需要加上第3参数{emulateJSON: true}
      // this.$http.post('http://127.0.0.1:8000/app01/json_data/', {id: 1}, {emulateJSON: true})

      // vue-resource发送put请求
      // this.$http.put('http://127.0.0.1:8000/app01/json_data/', {id: 1}, {emulateJSON: true})

      let that = this
      setTimeout(function () {
        // vue-resource发送delete请求, 参数必须通过stringify进行转化，而且需要使用body:参数
        let jsonStr = that.$qs.stringify({id: 1})
        that.$http.delete('http://127.0.0.1:8000/app01/json_data/', {body: jsonStr})
            .then(function (res) {
              this.info = res.data
            })
            .catch(function (err) {
              alert(err)
            })
      }, 1000)
    }
  },
  computed: {},
  watch: {}
}
</script>

<style>
</style>