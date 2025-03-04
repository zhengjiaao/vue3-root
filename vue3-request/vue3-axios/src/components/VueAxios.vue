<template>
  <div id="app">
    <p>data: {{ data }}</p>
    <p>dataBpi: {{ dataBpi }}</p>


    <h1>Bitcoin Price Index</h1>
    <section v-if="errored">
      <p>
        We're sorry, we're not able to retrieve this information at the moment,
        please try back later
      </p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else v-for="currency in info" class="currency">
        {{ currency.description }}:
        <span class="lighten">
          <span v-html="currency.symbol"></span
          >{{ currency.rate_float | currencydecimal }}
        </span>
      </div>
    </section>

  </div>
</template>

<script>
//注意：在哪个文件使用axios就在哪个文件种引入
import axios from "axios";

export default {
  name: "VueAxios",
  data() {
    return {
      data: null,
      dataBpi: null,
      info: null,
      loading: true,
      errored: false,
    };
  },
  //过滤器
  filters: {
    currencydecimal(value) {
      return value.toFixed(2);
    },
  },
  //页面加载时执行请求
  mounted() {
    //请求json数据
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => (this.data = response));

    //获取data种的其它属性值
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => (this.dataBpi = response.data.bpi));

    //错误和异常处理
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => {
        this.info = response.data.bpi;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style scope>
</style>