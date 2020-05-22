<template>
  <div id="app">
    <Stats />
    <Hashes />
  </div>
</template>

<script>
import Hashes from "./components/Hashes.vue";
import Stats from "./components/Stats.vue";

export default {
  name: "app",
  components: {
    Stats,
    Hashes,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  font-family: "Open Sans", sans-serif;
  color: #333;
  background-color: #f3f3f3;
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
