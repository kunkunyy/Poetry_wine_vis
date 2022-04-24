<template>
  <div id="ThemeRiverChart"></div>
</template>

<script>
import { Chart } from "@antv/g2";
import DataSet from "@antv/data-set";
import axios from "axios";
export default {
  name: "ThemeRiverChart",
  props: [""],
  data() {
    return {
      chart: null,
      dataset: null,
    };
  },
  computed: {},
  mounted() {
    axios.get("http://localhost:3000/theme").then((res) => {
      this.dataset = res.data;
      this.ChartInit(this.dataset);
    });
  },
  methods: {
    ChartInit(data) {
      let that = this;
      that.chart = new Chart({
        container: "ThemeRiverChart",
        autoFit: true,
      });
      const dv = new DataSet.DataView().source(data);
      dv.transform({
        type: "percent",
        field: "count",
        dimension: "type",
        groupBy: ["year"],
        as: "percent",
      });
      that.chart.data(dv.rows);
      that.chart.scale({
        percent: {
          formatter: (value) => {
            value = +value || 0;
            value = +value * 100;
            return value;
          },
          alias: "percent(%)",
        },
      });
      that.chart.tooltip({
        showCrosshairs: true,
        shared: true,
      });
      that.chart.area().adjust("stack").position("year*percent").color("type");
      that.chart.line().adjust("stack").position("year*percent").color("type");
      that.chart.on('axis-label:click',(e)=>{
        this.$store.state.dynasty = e.target.attrs.text;
      })
      that.chart.render();
    },
  },
  watch: {
    
  },
};
</script>

<style>
#ThemeRiverChart {
  height: 100%;
  width: 100%;
}
</style>