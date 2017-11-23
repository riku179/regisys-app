<template>
  <div id="app">
    <el-container>
      <el-header>Regisys</el-header>
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
#app {
  margin: auto;
  width: 80%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-header {
  background-color: #409EFF;
  color: white;
  font-size: large;
  text-align: center;
  line-height: 60px;
  margin-bottom: 5px;
  box-shadow: 0 1px 2px gray;
}

i {
  color: #7f7f7f;
}
</style>
