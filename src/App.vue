<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home' }">首頁</router-link> |
      <router-link :to="{ name: 'president' }">總統副總統</router-link> |
      <router-link :to="{ name: 'legislator' }">區域立委</router-link> |
      <router-link :to="{ name: 'legislator-at-large' }">不分區</router-link> |
      <router-link :to="{ name: 'local' }">縣市長</router-link> |
      <router-link :to="{ name: 'referendum' }">2018年公投</router-link> |
      <router-link :to="{ name: 'recall' }">韓國瑜罷免案</router-link> |
      <router-link :to="{ name: 'advanced' }">進階查詢</router-link>
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
