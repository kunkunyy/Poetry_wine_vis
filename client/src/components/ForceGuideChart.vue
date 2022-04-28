<template>
  <div id="ForceGuideChart">
    <div id="option">
      <div>
        <el-tooltip
          class="item"
          effect="light"
          content="清除现存的放大镜"
          placement="right-start"
        >
          <el-button icon="el-icon-brush" circle @click="clearFishEyes"></el-button>
        </el-tooltip>
      </div>
      <div>
        <el-tooltip
          class="item"
          effect="light"
          content="是否开启放大镜"
          placement="right-start"
        >
          <el-button icon="el-icon-search" type="warning" circle @click="changeState"></el-button>
        </el-tooltip>
      </div>
      <div>
        <el-dropdown @command="changeModel">
          <el-button ref="setting" icon="el-icon-setting" type="warning" circle></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command ="mousemove">mousemove</el-dropdown-item>
            <el-dropdown-item command ="drag">drag</el-dropdown-item>
            <el-dropdown-item command ="click">click</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { Graph } from "@antv/x6";
import G6 from "@antv/g6";
import axios from "axios";
export default {
  name: "ForceGuideChart",
  data() {
    return {
      able: "默认状态",
      fisheye: null,
      graph: null,
      setting: null,
    };
  },
  computed: {},
  mounted() {
    this.setting = this.$refs.setting;
    axios.get("http://localhost:3000/force").then((res) => {
      this.dataset = res.data;
      this.forceGuideChartInit(this.dataset["三国"]);
    });
  },
  methods: {
    forceGuideChartInit(data) {
      let nodes = data.node;
      let edges = data.edge;
      this.fisheye = new G6.Fisheye({
        r: 200,
        showLabel: true,
      });
      this.graph = new G6.Graph({
        container: document.getElementById("ForceGuideChart"),
        width: document.getElementById("ForceGuideChart").scrollWidth,
        height: document.getElementById("ForceGuideChart").scrollHeight,
        layout: {
          type: "force",
          preventOverlap: true,
        },
        plugins: [this.fisheye],
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
      this.graph.data({
        nodes,
        edges,
      });
      this.graph.render();
      this.graph.getNodes().forEach((node) => {
        node
          .getContainer()
          .getChildren()
          .forEach((shape) => {
            if (shape.get("type") === "text") shape.hide();
          });
      });
      this.graph.on("node:dragstart", function (e) {
        graph.layout();
        refreshDragedNodePosition(e);
      });
      this.graph.on("node:drag", function (e) {
        const forceLayout = this.graph.get("layoutController").layoutMethods[0];
        forceLayout.execute();
        refreshDragedNodePosition(e);
      });
      this.graph.on("node:dragend", function (e) {
        e.item.get("model").fx = null;
        e.item.get("model").fy = null;
      });
      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!this.graph || this.graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          this.graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
      function refreshDragedNodePosition(e) {
        const model = e.item.get("model");
        model.fx = e.x;
        model.fy = e.y;
      }
    },
    clearFishEyes(){
      this.fisheye.clear();
    },
    changeState(e){
      let arr = e.target.className.split(" ");
      if(arr.indexOf('el-button--default')!== -1){
        this.setting.type = 'warning';
        this.fisheye = new G6.Fisheye({
          r: 200,
          showLabel: true,
        });
        this.graph.addPlugin(this.fisheye);
        arr[arr.indexOf('el-button--default')] = "el-button--warning";
        e.target.className = arr.join(" ");
      }else{
        arr[arr.indexOf('el-button--warning')] = "el-button--default";
        e.target.className = arr.join(" ");
        this.setting.type = '';
        // this.node.className.replace('el-button--warning','el-button--default');
        this.graph.removePlugin(this.fisheye);
      }
    },
    changeModel(type){
      const fisheyConfigs = this.fisheye._cfgs;
      this.graph.removePlugin(this.fisheye);
      this.fisheye = new G6.Fisheye({
        ...fisheyConfigs,
        trigger: type,
      });
      this.graph.addPlugin(this.fisheye);
      this.$message({
        type: 'success',
        showClose: true,
        message:`鱼眼放大镜移动模式被设置为：${type}!`
      });
    }
  },
  watch: {},
};
</script>

<style>
#ForceGuideChart {
  height: 100%;
  width: 100%;
  position: relative;
}
#option {
  position: absolute;
  width: 15%;
  height: 30%;
  left: 1%;
  bottom: 5%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}
#option > div {
  flex: 1;
}
</style>