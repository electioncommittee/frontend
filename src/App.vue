<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home' }">首頁</router-link> |
      <router-link :to="{ name: 'president' }">總統暨副總統選舉</router-link> |
      <router-link to="/about">區域立委選舉</router-link> |
      <router-link to="/about">不分區立委選舉</router-link> |
      <router-link to="/about">縣市長選舉</router-link> |
      <router-link to="/about">韓國瑜罷免案</router-link> |
      <router-link to="/about">交叉比對</router-link> |
      <router-link to="/about">進階查詢</router-link> |
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/main.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
