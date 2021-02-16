<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
#app {
  background-color: #ccc;
}

.hello {
  border: 4px solid rgb(25, 172, 123);
}

/* 深度选择器 */
/* #app >>> p {
  color: rgb(255, 124, 1);
} */
</style>

<style scoped lang="scss">
/* 深度选择器 */
#app ::v-deep p {
  color: rgb(255, 124, 1);
}
</style>