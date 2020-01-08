<template>
  <div id="app">
    <!-- 导航菜单 -->
    <div class="custom-menu">
      <ul>
        <li><router-link to="/">bpmn</router-link></li>
        <li><router-link to="/treeFlowChart">可编辑树</router-link></li>
        <li><router-link to="/transverseTree">横向树</router-link></li>
        <li><router-link to="/g6CustomTree">G6定制树</router-link></li>
      </ul>
      <div class="clear"></div>
    </div>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style  lang="scss">
*{
  margin:0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.custom-menu{
  width: 80%;
  height: 40px;
  margin: 0 auto;
  border-bottom: 1px solid #ccc;
  li{
    display: inline-block;
    float: left;
    list-style: none;
    height: 40px;
    overflow: hidden;
    a{
      padding: 20px;
      text-decoration: none;
      color: #333;
      line-height: 40px;
    }
  }
}
.router-link-exact-active{
  background: #ccc;
}
</style>
