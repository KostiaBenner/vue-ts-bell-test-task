<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Список</router-link> |
      <router-link to="/history">История</router-link> |
      <router-link to="/history/selected">История добавлений</router-link> |
      <router-link to="/history/removed">История удалений</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import store from "@/store"

export default defineComponent({
  created(): void {
    store.dispatch('fetchData')
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
