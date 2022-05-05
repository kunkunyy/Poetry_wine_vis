<template>
  <div id="PoetList">
    <div id="first">
      <div id="barChart"></div>
    </div>
    <div id="second">
      <el-table
        :data="tabledata"
        height="100%"
        style="width: 100%"
        @row-dblclick="selectPoetry"
        :cell-style="{
          padding: '5px 0',
        }"
        :row-style="{
          background: 'rgba(226,224,199,0)',
          fontSize: '10px',
        }"
        :header-cell-style="{
          background: 'rgba(241,241,241)',
          fontSize: '12px',
          padding: '5px 0',
        }"
      >
        <el-table-column
          prop="title"
          label="诗歌名称"
          width="120"
        ></el-table-column>
        <el-table-column prop="author" label="作者" width="100">
          <template slot="header">
            <span style="width: 50">作者：</span>
            <el-select v-model="showname" style="width: 50">
              <el-option
                v-for="item in this.namep"
                :key="item"
                :lable="item"
                :value="item"
                >{{ item }}</el-option
              >
            </el-select>
          </template>
        </el-table-column>

        <el-table-column prop="emotion" label="诗歌情感">
          <template slot="header">
            <span style="width: 50">诗歌情感：</span>
            <el-select v-model="showemotion" style="width: 50">
              <el-option
                v-for="item in this.emotion"
                :key="item"
                :lable="item"
                :value="item"
                >{{ item }}</el-option
              >
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { Chart } from "@antv/g2";
import DataSet, { CONSTANTS } from "@antv/data-set";
import axios from "axios";
export default {
  name: "PoetryList",
  data() {
    return {
      barchart: null,
      bardata: null,
      tabledata: null,
      dynasty: "",
      place: "",
      showname: "",
      showemotion: "",
      namep: ["无名氏", "诗经", "文种", "屈原", "宋玉"],
      emotion: ["哀", "喜", "思"],
    };
  },
  computed: {
    getPlace() {
      return this.place;
    },
    getDynasty() {
      return this.$store.state.dynasty;
    },
  },
  watch: {
    getPlace: function (newVal, oldVal) {
      if (this.dynasty !== "") {
        this.dynasty = "";
      }
      this.place = newVal;
      this.updateData(newVal, oldVal);
    },
    getDynasty: function (newVal, oldVal) {
      if (this.place !== "") {
        this.place = "";
      }
      this.dynasty = newVal;
      this.updateData(newVal, oldVal);
    },
    showname: function (newVal, oldVal) {
      this.updateTable(newVal, oldVal);
    },
    showemotion: function (newVal, oldVal) {
      this.updateTable1(newVal, oldVal);
    },
  },
  created() {
    axios
      .get(
        `http://localhost:3000/content?dynasty=${this.dynasty}&place=${this.place}`
      )
      .then((res) => {
        const z = [];
        const y = [];
        this.namep = [];
        this.emotion = [];
        for (let i = 0; i < res.data.length; i++) {
          z.push(res.data[i].author);
          y.push(res.data[i].emotion);
        }
        this.namep = this.namep.concat(Array.from(new Set(z)));
        this.emotion = this.emotion.concat(Array.from(new Set(y)));
        this.tabledata = res.data;
        console.log(this.namep);
        console.log(this.emotion);
      });
  },
  mounted() {
    axios.get("http://localhost:3000/bar").then((res) => {
      this.bardata = res.data;
      const z = [];
      const y = [];
      this.namep = [];
      this.emotion = [];
      for (let i = 0; i < res.data.length; i++) {
        z.push(res.data[i].author);
        y.push(res.data[i].emotion);
      }
      this.namep = this.namep.concat(Array.from(new Set(z)));
      this.emotion = this.emotion.concat(Array.from(new Set(y)));
      this.barChartInit(this);
    });
  },

  methods: {
    updateTable(newVal, oldVal) {
      axios
      .get(
        `http://localhost:3000/content?dynasty=${this.dynasty}&place=${this.place}`
      )
      .then((res) => {
        var update = []
        for(var i=0;i<res.data.length;i++){
          if(res.data[i].author==newVal){
            update.push(res.data[i])
          }
        }
        this.tabledata = update;
      })

    },
    updateTable1(newVal, oldVal) {
      axios
      .get(
        `http://localhost:3000/content?dynasty=${this.dynasty}&place=${this.place}`
      )
      .then((res) => {
        var update = []
        for(var i=0;i<res.data.length;i++){
          if(res.data[i].emotion==newVal){
            update.push(res.data[i])
          }
        }
        this.tabledata = update;
      })
    },
    barChartInit(that) {
      const data = that.bardata;
      that.barchart = new Chart({
        container: "barChart",
        autoFit: true,
        tickline: null,
      });
      that.barchart.data(data);
      that.barchart.coordinate().transpose();
      that.barchart.scale("sales", {
        nice: true,
      });
      that.barchart.axis("sales", {
        title: null,
        position: "right",
        tickLine: null,
        line: {
          lineWidth: 1,
        },
        grid: null,
        label: {
          offset: 2,
        },
      });
      that.barchart.axis("year", {
        tickLine: null,
      });
      that.barchart.interaction("active-region");
      that.barchart
        .interval()
        .position("place*num")
        .color("#596275")
        .style({ radius: [20, 20, 0, 0] });
      that.barchart.option("scrollbar", {
        type: "vertical",
        style: {
          trackColor: "silver",
        },
      });
      that.barchart.interaction("element-visible-filter");
      that.barchart.interaction("plot-mousewheel-scroll", {
        start: [
          {
            trigger: "plot:mousewheel",
            action: "mousewheel-scroll:scroll",
            arg: { wheelDelta: 1 },
          },
        ],
      });
      that.barchart.on("axis-label:click", (e) => {
        this.place = e.target.attrs.text;
      });
      that.barchart.render();
    },
    selectPoetry(row, column, event) {
      console.log(row);
      this.$store.state.content = row;
    },
    updateData(newVal, oldVal) {
      if (newVal !== oldVal) {
        axios
          .get(
            `http://localhost:3000/content?dynasty=${this.dynasty}&place=${this.place}`
          )
          .then((res) => {
            this.tabledata = res.data;
            const z = [];
            const y = [];
            this.namep = [];
            this.emotion = [];
            for (let i = 0; i < res.data.length; i++) {
              z.push(res.data[i].author);
              y.push(res.data[i].emotion);
            }
            this.namep = this.namep.concat(Array.from(new Set(z)));
            this.emotion = this.emotion.concat(Array.from(new Set(y)));
          });
      } else {
        axios
          .get(
            `http://localhost:3000/content?dynasty=${this.dynasty}&place=${this.place}`
          )
          .then((res) => {
            this.tabledata = res.data;
            const z = [];
            const y = [];
            this.namep = [];
            this.emotion = [];
            for (let i = 0; i < res.data.length; i++) {
              z.push(res.data[i].author);
              y.push(res.data[i].emotion);
            }
            this.namep = this.namep.concat(Array.from(new Set(z)));
            this.emotion = this.emotion.concat(Array.from(new Set(y)));
          });
      }
    },
  },
};
</script>

<style>
#PoetList {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
#first {
  height: 50%;
  width: 100%;
  border: 1px solid rgb(163, 163, 163);
  display: flex;
  /* background: rgb(40, 194, 122); */
}
#second {
  height: 50%;
  width: calc(100% - 1px);
  border: 1px solid rgb(163, 163, 163);
  /* background: rgb(40, 194, 122); */
}
.el-table,
.el-table__expanded-cell {
  background-color: rgba(226,224,199,0);
}
#barChart {
  width: 100%;
  height: auto;
}
#second ::-webkit-scrollbar {
  width: 16px;
  height: 10px;
  background-color: rgba(226,224,199,0);
}
#second ::-webkit-scrollbar-thumb {
  background-color: rgba(196, 197, 197);
  border-radius: 3px;
}
</style>