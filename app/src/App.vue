<template>
  <div id="app">
    <div class="navbar">
      <a href class="logo">ALF Transparency Market</a>
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn">
        <span class="navicon"></span>
      </label>
      <ul class="menu">
        <li>
          <router-link to="/">Create Offer</router-link>
        </li>
        <li>
          <router-link to="/offers">Offers</router-link>
        </li>
        <li>
          <router-link to="/admin">Admin</router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

body {
  font-family: "Open Sans", sans-serif;
  color: #333;
  background-color: #f3f3f3;
  width: 100%;
  height: 100%;
  margin: 0;
}

.router-link-exact-active {
  color: white;
}
</style>
