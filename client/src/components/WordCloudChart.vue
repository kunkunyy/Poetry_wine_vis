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
        basedata:null
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
      var myChart = echarts.init(document.getElementById("WordCloud"));
      let option = {
        tooltip: {
          show: true,
        },
        textStyle: {
            fontWeight: 'bolder',
            fontFamily: 'FangSong'
        },
        series: [
          {
            type: "wordCloud",
            //size: ['9%', '99%'],
            sizeRange: [10, 60],
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
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(",") +
                    ")"
                  );
                },
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
      myChart.setOption(option);
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