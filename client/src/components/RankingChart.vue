<template>
  <div id="RankingChart">
    <div id="roseChart"></div>
    <div id="barChart"></div>
  </div>
</template>

<script>
import { Chart } from "@antv/g2";
import DataSet from "@antv/data-set";
export default {
  name: "RankingChart",
  props: [""],
  data() {
    return {
      rosechart: null,
      barchart: null,
      rosechartdata: [
        { type: "分类1", value: 27 },
        { type: "分类2", value: 25 },
        { type: "分类3", value: 18 },
        { type: "分类4", value: 15 },
        { type: "分类5", value: 10 },
      ],
    };
  },
  computed: {},
  mounted() {
    this.roseChartInit(this);
    this.barChartInit(this);
  },
  methods: {
    roseChartInit(that) {
      const chart = new Chart({
        container: "roseChart",
        autoFit: true,
        padding: [10, 10, 10, 40],
      });

      chart.data(that.rosechartdata);
      chart.coordinate("polar", {
        startAngle: Math.PI, // 起始角度
        endAngle: Math.PI * (3 / 2), // 结束角度
      });

      chart.scale("value", {
        tickCount: 6,
      });
      chart.legend(false);
      chart.axis("value", {
        grid: {
          line: {
            type: "circle",
          },
          closed: false,
        },
        verticalFactor: 1,
        label: {
          offset: 15,
        },
      });

      chart.axis("type", {
        tickLine: {
          alignTick: false,
        },
        grid: {
          alignTick: false,
        },
      });

      //   chart.tooltip({
      //     showMarkers: false,
      //   });
      chart.interaction("element-highlight");

      chart
        .interval()
        .position("type*value")
        .color("type", "rgb(252,143,72)-rgb(255,215,135)")
        .label("value", {
          offset: -15,
          style: {
            textAlign: "center",
            fill: "#000",
          },
        })
        .style({
          lineWidth: 1,
          stroke: "#fff",
        });

      chart.render();
    },
    barChartInit(that) {
      const data = [
        { year: "先秦", sales: 38 },
        { year: "秦", sales: 52 },
        { year: "汉", sales: 61 },
        { year: "三国", sales: 145 },
        { year: "魏晋南北朝", sales: 48 },
        { year: "隋朝", sales: 38 },
        { year: "唐朝", sales: 22 },
        { year: "五代十国", sales: 71 },
        { year: "宋朝", sales: 83 },
        { year: "金朝", sales: 78 },
        { year: "元朝", sales: 56 },
        { year: "明朝", sales: 100 },
        { year: "清朝", sales: 130 },
      ];
      const chart = new Chart({
        container: "barChart",
        autoFit: true,
        tickline: null
      });
      chart.data(data);
      chart.coordinate().transpose();
      chart.scale("sales", {
        nice: true,
      });
      chart.axis("sales", {
        title: null,
        position: 'right',
        tickLine: null,
        line:{
            lineWidth: 1,
        },
        grid: null,
        label:{
            offset: 2
        }
      });
      chart.axis("year",{
        tickLine: null,
      })
      chart.interaction("active-region");
      chart.interval()
        .position("year*sales")
        .color("#FF8800")
        .style({ radius: [20, 20, 0, 0] });
      chart.option("scrollbar", {
        type: "vertical",
        style:{
            trackColor: 'silver'
        }
      });
      chart.interaction("element-visible-filter");
      chart.interaction("plot-mousewheel-scroll", {
        start: [
          {
            trigger: "plot:mousewheel",
            action: "mousewheel-scroll:scroll",
            arg: { wheelDelta: 1 },
          },
        ],
      });
      chart.render();
    },
  },
  watch: {},
};
</script>

<style>
#RankingChart {
  height: 100%;
  width: 100%;
  display: flex;
}
#roseChart {
  width: 40%;
  height: auto;
}
#barChart {
  width: 60%;
  height: auto;
}
</style>