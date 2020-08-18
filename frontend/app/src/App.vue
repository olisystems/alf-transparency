<template>
  <div id="app">
    <Navbar />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

body {
  font-family: 'Open Sans', sans-serif;
  color: #333;
  background-color: #f3f3f3;
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
