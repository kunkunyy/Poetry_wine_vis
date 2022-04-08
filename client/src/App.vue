<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(245, 247, 159);
}
</style>
