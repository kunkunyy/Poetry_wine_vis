<template>
  <div id="WordCloud"></div>
</template>

<script>
import "echarts-wordcloud";
import * as echarts from "echarts";
import axios from "axios";
export default {
  name: "WordCloud",
  props: [""],
  data() {
    return {
        dynasty: '唐',
        basedata:null,
        chart:null
    };
  },
  computed: {
    getDynasty(){
      return this.$store.state.dynasty
    }
  },
  watch: {
    getDynasty:function(newVal,oldVal){
      this.dynasty = newVal;
      this.ChartInit(this);
    }
  },
  mounted() {
    axios.get("http://localhost:3000/cloud").then((res) => {
      this.basedata = res.data;
      this.ChartInit(this);
    });
  },
  methods: {
    ChartInit(that) {
      that.chart = echarts.init(document.getElementById("WordCloud"));
      let option = {
        tooltip: {
          show: true,
        },
        series: [
          {
            type: "wordCloud",
            //size: ['9%', '99%'],
            sizeRange: [6, 60],
            //textRotation: [0, 45, 90, -45],
            rotationRange: [-45, 90],
            //shape: 'circle',
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 10,
            },
            left: "center",
            top: "center",
            width: "100%",
            height: "100%",
            drawOutOfBound: false,
            textStyle: {
              fontWeight: 'bolder',
              fontFamily: 'Microsoft YaHei',
              color: function () {
                  return '#596275';
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            data: that.basedata[this.dynasty],
          },
        ],
      };
      that.chart.setOption(option);
    },
  },
};
</script>

<style>
#WordCloud {
    height: 100%;
    width: 100%;
}
</style>