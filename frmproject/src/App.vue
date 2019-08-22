<template>
  <div id="app">
    <div class="nav">
      <ul>
        <li><router-link to='/showdata'>列表数据展示</router-link></li>
        <li><router-link to='/indexRot'>路由配置首页</router-link></li>
        <li><router-link to='/list/1'>路由配置列表1</router-link></li>
        <li><router-link to='/list/2'>路由配置列表2</router-link></li>
        <li><router-link to='/list/3'>路由配置列表3</router-link></li>
        <li><router-link to='/father'>父组件</router-link></li>
      </ul>
    </div>
    <div class="content"><router-view /></div>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="less">
#app {
  width:800px;
  margin: 0 auto;
}
.nav{
  width:800px;
  height: 40px;
  // background: rgba(234,24,122,.4);
  margin-bottom: 20px;
}
.content{
  width: 800px;
  height: 400px;
}
ul {
  list-style: none
}
li {
  float: left;
  width:120px;
  height:32px;
  line-height: 32px;
}
a{
  color: inherit;
  text-decoration: none;
  display: block;
}
.router-link-active{
  color:#f60
}
</style>
