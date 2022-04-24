<template>
  <div id="PieChart"></div>
</template>

<script>
import * as d3 from "d3";
import { drag } from "d3-drag";
export default {
  name: "PieChart",
  props: [""],
  data() {
    return {
      piedata: [
        {
          name: "购物",
          value: 235,
          label: ["李白", "杜甫", "1776572104", "喜怒哀乐"],
        },
        {
          name: "杂费",
          value: 134,
          label: ["李白", "杜甫", "1776572104", "喜怒哀乐"],
        },
        {
          name: "日常饮食",
          value: 300,
          label: ["李白", "杜甫", "1776572104", "喜怒哀乐"],
        },
        {
          name: "杂费",
          value: 134,
          label: ["李白", "杜甫", "1776572104", "喜怒哀乐"],
        },
        {
          name: "医药",
          value: 500,
          label: ["李白", "杜甫", "1776572104", "喜怒哀乐"],
        },
        {
          name: "交通",
          value: 402,
          label: ["李白", "杜甫", "1776572104", "喜怒哀乐"],
        },
        {
          name: "杂费",
          value: 134,
          label: ["李白", "杜甫", "1776572104", "喜怒哀乐"],
        },
        {
          name: "杂费",
          value: 134,
          label: ["李白", "杜甫", "1776572104", "喜怒哀乐"],
        },
        {
          name: "杂费",
          value: 134,
          label: ["李白", "杜甫", "1776572104", "喜怒哀乐"],
        },
        {
          name: "杂费",
          value: 134,
          label: ["李白", "杜甫", "1776572104", "喜怒哀乐"],
        },
        {
          name: "杂费",
          value: 134,
          label: ["李白", "杜甫", "1776572104", "喜怒哀乐"],
        },
        {
          name: "杂费",
          value: 134,
          label: ["李白", "杜甫", "1776572104", "喜怒哀乐"],
        },
      ],
    };
  },
  computed: {},
  mounted() {
    this.PieInit();
  },
  methods: {
    PieInit() {
      // 准备数据
      let data = this.piedata;
      let pie = d3
        .pie()
        .sort(null)
        .value(function (d) {
          return d.value;
        });
      let piedata = pie(data);

      let arc = d3.arc().innerRadius(80).outerRadius(120);
      let text_arc = d3.arc().innerRadius(50).outerRadius(100);
      let arc_data = piedata.map((d) => {
        return [...arc.centroid(d), d.data.name, d.data.label, d.data.value];
      });
      let end_data = arc_data.map((d) => {
        return [d[0] * 3, d[1] * 3, d[2], d[3], d[4]];
      });
      console.log(end_data);
      // 创建画布
      var relationChart = document.getElementById("PieChart");
      var width = relationChart.offsetWidth;
      var height = relationChart.offsetHeight;
      let svg = d3
        .select("#PieChart")
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 800 800");

      // 绘制贝塞尔曲线
      let bezierCurve = svg
        .append("g")
        .attr("transform", `translate(${width / 1.5},${height / 1.5})`);
      bezierCurve
        .selectAll("path")
        .data(arc_data)
        .enter()
        .append("path")
        .attr("d", function (d) {
          let path = d3.path();
          let begin_x = d[0];
          let begin_y = d[1];
          let end_x = 3 * d[0];
          let end_y = 3 * d[1];
          let control_x1 = begin_x;
          let control_y1 = begin_y * 2;
          let control_x2 = end_x;
          let control_y2 = begin_y * 1.5;
          path.moveTo(begin_x, begin_y);
          path.bezierCurveTo(
            control_x1,
            control_y1,
            control_x2,
            control_y2,
            end_x,
            end_y
          );
          return path.toString();
        })
        .style("fill", "none")
        .style("stroke", "gray")
        .style("stroke-width", "2");
      // 绘制大环图
      let ring_graph = svg
        .append("g")
        .attr("transform", `translate(${width / 1.5},${height / 1.5})`);

      ring_graph
        .selectAll("path")
        .data(piedata)
        .enter()
        .append("path")
        .attr("d", function (d) {
          return arc(d);
        })
        .style("fill", function (d, i) {
          return getColor(i);
        })
        .on(".drag", null);

      function getColor(idx) {
        var palette = [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089",
        ];
        return palette[idx % palette.length];
      }
      // 绘制每个圆圈
      let circle = svg
        .append("g")
        .attr("transform", `translate(${width / 1.5},${height / 1.5})`);
      circle
        .selectAll("circle")
        .data(end_data)
        .enter()
        .append("circle")
        .attr("cx", (d) => d[0])
        .attr("cy", (d) => d[1])
        .attr("r", "50")
        .attr("stroke", "black")
        .attr("stroke-width", "5px")
        .attr("fill", "rgb(245, 247, 159)");
      let label = svg
        .append("g")
        .attr("transform", `translate(${width / 1.5},${height / 1.5})`);
      label
        .selectAll("text")
        .data(end_data)
        .enter()
        .append("text")
        .text((d) => {
          return d[2];
        })
        .attr("x", (d) => d[0] - 20)
        .attr("y", (d) => d[1] + 15)
        .attr("fill", "red")
        .attr("font-size", 20);
      console.log(end_data);

      // 绘制文本
      // for (let i of end_data) {
      //   console.log(i);
      //   let tx = svg
      //     .append("g")
      //     .attr("transform", `translate(${width / 1.5},${height / 1.5})`);
      //   tx.selectAll("text")
      //     .data(i[3])
      //     .enter()
      //     .append("text")
      //     .attr("x", i[0])
      //     .attr("y", i[1])
      //     .text(function (d) {
      //       return d;
      //     })
      //     .attr("dx", "-.8em")
      //     .attr("dy", ".15em")
      //     attr("transform", function(d,i) {
      //       return "rotate(" + (d.angle * 180) / Math.PI + ", 225, 225)";})
      //     .attr("fill", "black")
      //     .attr("font-size", 20);
      // }
    },
  },
  watch: {},
};
</script>

<style>
#PieChart {
  height: 100%;
  width: 100%;
}
svg {
  height: 100%;
  width: 100%;
}
</style>