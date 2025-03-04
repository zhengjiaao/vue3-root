<template>
  <div class="content-container">
    <h1>Home Page</h1>
    <p>Welcome to the Home Page!</p>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.content-container {
  display: flex; /*使内容垂直排列。*/
  flex-direction: column; /*使内容垂直排列。*/
  align-items: center; /*使内容水平居中。*/
  width: 100%; /*使容器宽度占满父容器。*/
  max-width: 800px; /* 可选：设置最大宽度 */
  margin: 0 auto; /* 使内容水平居中 */
  padding: 20px; /* 可选：添加内边距 */
}
</style>
