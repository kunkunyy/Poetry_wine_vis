<template>
  <div id="ForceGuideChart"></div>
</template>

<script>
import * as echarts from "echarts";
import { Graph } from "@antv/x6";
import G6 from "@antv/g6";
import axios from "axios";
export default {
  name: "ForceGuideChart",
  props: [""],
  data() {
    return {};
  },
  computed: {},
  mounted() {
    axios.get("http://localhost:3000/force").then((res) => {
      this.dataset = res.data;
      this.forceGuideChartInit(this.dataset["唐"]);
    });
  },
  methods: {
    forceGuideChartInit(data) {
      let nodes = data.node;
      let edges = data.edge;
      let fisheye = new G6.Fisheye({
        r: 200,
        showLabel: true,
      });
      const graph = new G6.Graph({
        container: document.getElementById("ForceGuideChart"),
        width: document.getElementById("ForceGuideChart").scrollWidth,
        height: document.getElementById("ForceGuideChart").scrollHeight,
        layout: {
          type: "force",
          preventOverlap: true,
        },
        plugins: [fisheye],
        // fitView: true,
        modes: {
          default: ["drag-canvas", "zoom-canvas", "activate-relations"],
        },
        // 配置默认节点参数
        defaultNode: {
          // 设置节点填充色、描边等属性
          // style: {
          //   fill: "#bae637",
          //   stroke: "#eaff8f",
          //   lineWidth: 5,
          // },
          // 指定不同情感对应的色板
          donutColorMap: {
            喜: "#C29D73",
            哀: "#717A84",
            思: "#3A4457",
          },
          // 配置标签文本
          labelCfg: {
            position: "bottom",
            offset: 10,
            style: {
              // ... 文本样式的配置
            },
          },
          // 指定节点周围「上、下、左、右」四个方向上的四个小圆点
          // linkPoints: {
          //   top: true,
          //   bottom: true,
          //   left: true,
          //   right: true,
          //   fill: "#fff",
          //   size: 5,
          // },
          // 通过配置 icon，可以在节点上显示小图标
          // icon: {
          //   show: true,
          //   //img: '...', 可更换为其他图片地址
          //   width: 25,
          //   height: 25,
          //   // img: '...', 可更换为其他图片地址
          //   // text: '...', 使用 iconfont
          // },
        },
      });
      graph.data({
        nodes,
        edges,
      });
      graph.render();
      graph.getNodes().forEach((node) => {
        node
          .getContainer()
          .getChildren()
          .forEach((shape) => {
            if (shape.get("type") === "text") shape.hide();
          });
      });
      graph.on("node:dragstart", function (e) {
        graph.layout();
        refreshDragedNodePosition(e);
      });
      graph.on("node:drag", function (e) {
        const forceLayout = graph.get("layoutController").layoutMethods[0];
        forceLayout.execute();
        refreshDragedNodePosition(e);
      });
      graph.on("node:dragend", function (e) {
        e.item.get("model").fx = null;
        e.item.get("model").fy = null;
      });
      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
      function refreshDragedNodePosition(e) {
        const model = e.item.get("model");
        model.fx = e.x;
        model.fy = e.y;
      }
    },
  },
  watch: {},
};
</script>

<style>
#ForceGuideChart {
  height: 100%;
  width: 100%;
}
</style>