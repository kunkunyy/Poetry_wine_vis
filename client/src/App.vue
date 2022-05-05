<template>
  <div id="app">
    <!-- <div class="top"></div> -->
    <div class="middle">
      <div class="m-left">
        <PoetryList></PoetryList>
      </div>
      <div class="m-middle">
        <MapChart></MapChart>
      </div>
      <div class="m-right">
        <ForceGuideChart></ForceGuideChart>
      </div>
    </div>
    <div class="bottom">
      <div class="b-left">
        <Content></Content>
      </div>
      <div class="b-right">
        <div class="b-right-top">
          <WordCloudChart></WordCloudChart>
        </div>
        <div class="b-right-bottom">
          <ThemeRiverChart></ThemeRiverChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapChart from "./components/MapChart.vue";
import PieChart from "./components/PieChart.vue";
import ThemeRiverChart from "./components/ThemeRiverChart.vue";
import WordCloudChart from "./components/WordCloudChart.vue";
import PoetryList from "./components/PoetryList.vue";
import ForceGuideChart from "./components/ForceGuideChart.vue";
import Content from "./components/Content.vue"
export default {
  name: "App",
  components: {
    MapChart,
    PieChart,
    ThemeRiverChart,
    WordCloudChart,
    PoetryList,
    ForceGuideChart,
    Content,
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<style>
#app {
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-image: url('./assets/333.jpeg');
  /* background-color: rgb(226,224,199); */
  flex-direction: column;
}
.top {
  height: 5%;
  width: calc(100% - 17px);
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 2px;
  border: 1px solid rgb(163, 163, 163);
}
.middle {
  /* height: 60%; */
  height: 70%;
  width: calc(100% - 15px);
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
}
.bottom {
  height: 30%;
  width: calc(100% - 15px);
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
}
.m-left {
  width: 20%;
  height: 100%;
}
.m-middle {
  width: 45%;
  height: 100%;
  border: 1px solid rgb(163, 163, 163);
}
.m-right {
  width: 35%;
  height: 100%;
  border: 1px solid rgb(163, 163, 163);
}
.b-left {
  height: 100%;
  width: 20%;
  border: 1px solid rgb(163, 163, 163);
}
.b-right {
  height: 100%;
  width: 80%;
  display: flex;
  border: 1px solid rgb(163, 163, 163);
  flex-direction: column;
}
.b-right-top{
  height: 30%;
  width: 100%;
}
.b-right-bottom{
  height: 70%;
  width: 100%;
}
</style>
