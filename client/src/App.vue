<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <div class="left">
      <div class="item1"></div>
      <div class="item2">
        <wordCloud></wordCloud>
      </div>
      <div class="item3">
        <forceGuide></forceGuide>
      </div>
    </div>
    <div class="right">
      <div class="map">
        <mapChart></mapChart>
      </div>
      <div class="themeriver">
        <themeriver></themeriver>
      </div>
    </div>
  </div>
</template>

<script>
import mapChart from "./components/MapChart.vue";
import themeriver from "./components/ThemeRiverChart.vue"
import forceGuide from "./components/ForceGuideChart.vue"
import wordCloud from "./components/WordCloudChart.vue"
export default {
  name: 'App',
  components: {
    mapChart,
    themeriver,
    forceGuide,
    wordCloud,
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
}
</script>

<style>
#app {
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgb(245, 247, 159);
}
.left{
  width: 35%;
  flex-shrink: 0;
  /* background-color: rgb(159, 247, 166); */
  display: flex;
  flex-direction: column;
}
.right{
  flex-grow: 1;
  /* background-color: rgb(134, 197, 197); */
  display: flex;
  flex-direction: column;
}
.item1{
  width: auto;
  height: 20%;
  margin: 15px 15px 0 15px;
  flex: auto;
  border: 2px solid black;
  /* background-color: rgb(161, 134, 197); */
}
.item2{
  width: auto;
  height: 20%;
  margin: 15px 15px 0 15px;
  flex: auto;
  border: 2px solid black;
  /* background-color: rgb(96, 121, 175); */
}
.item3{
  width: auto;
  height: 30%;
  margin: 15px 15px 5px 15px;
  flex: auto;
  border: 2px solid black;
  /* background-color: rgb(207, 139, 139); */
}
.map{
  width: auto;
  height: 60%;
  margin-right: 15px;
  margin-top: 15px;
  border: 2px solid #000000;
  /* background-color: rgb(101, 180, 94); */
}
.themeriver{
  width: auto;
  height: 35.5%;
  margin: 15px 15px 5px 0;
  border: 2px solid black;
  /* background-color: rgb(130, 188, 226); */
}
</style>
