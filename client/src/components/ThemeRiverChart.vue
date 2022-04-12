<template>
  <div id="ThemeRiverChart"></div>
</template>

<script>
import { Chart } from "@antv/g2";
import DataSet from "@antv/data-set";
export default {
  name: "ThemeRiverChart",
  props: [""],
  data() {
    return {
      chart: null,
    };
  },
  components: {},
  computed: {},
  mounted() {
      this.ChartInit()
  },
  methods: {
    ChartInit() {
      let that = this;
      fetch(
        "https://gw.alipayobjects.com/os/antvdemo/assets/data/baby-names.json"
      )
        .then((res) => res.json())
        .then((data) => {
          const { DataView } = DataSet;
          const dv = new DataView()
            .source(data)
            .transform({
              type: "fill-rows",
              groupBy: ["name"],
              orderBy: ["year"],
            })
            .transform({
              type: "impute",
              field: "n",
              method: "value",
              value: 0,
            })
            .transform({
              type: "aggregate",
              fields: ["n"],
              operations: ["sum"],
              groupBy: ["year", "name"],
              orderBy: ["year"],
              as: ["count"],
            });

          that.chart = new Chart({
            container: "ThemeRiverChart",
            autoFit: true,
          });
          that.chart.data(dv.rows);
          that.chart.scale("year", {
            tickInterval: 20,
          });
          that.chart.legend({
            position: "right",
          });
          that.chart.axis("count", {
            line: {
              style: {
                lineWidth: 1,
                stroke: "#000000",
              },
            },
            tickLine: {
              length: 8,
              style: {
                stroke: "#000000",
              },
            },
            grid: null,
          });
          that.chart
            .area({ sortable: true })
            .position("year*count")
            .adjust(["stack", "symmetric"])
            .color("name")
            .shape("smooth")
            .style({
              fillOpacity: 1,
            });
          that.chart.render();
        });
    },
  },
  watch: {},
};
</script>

<style>
#ThemeRiverChart{
  height: 100%;
  width: 100%;
}
</style>