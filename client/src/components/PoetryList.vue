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
        stripe
        @row-dblclick="selectPoetry"
        :cell-style="{
          padding: '5px 0'
        }"
        :row-style="{
          background: 'rgb(251, 252, 210)',
          fontSize: '10px',
        }"
        :header-cell-style="{
          background: 'rgb(251, 252, 210)',
          fontSize: '12px',
          padding: '5px 0'
        }"
      >
        <el-table-column
          prop="title"
          label="诗歌名称"
          width="120"
        ></el-table-column>
        <el-table-column prop="author" label="作者" width="80"></el-table-column>
        <el-table-column prop="emotion" label="诗歌情感"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { Chart } from "@antv/g2";
import DataSet from "@antv/data-set";
import axios from "axios";
export default {
  name: "PoetryList",
  data() {
    return {
      barchart: null,
      bardata: null,
      tabledata: null,
      dynasty: '',
      place: '',
    };
  },
  computed: {
    getPlace(){
      return this.place;
    },
    getDynasty(){
      return this.$store.state.dynasty; 
    }
  },
  watch:{
    getPlace: function(newVal,oldVal){
      if(this.dynasty !== ''){
        this.dynasty = '';
      }
      this.place = newVal;
      this.updateData(newVal,oldVal);
    },
    getDynasty: function(newVal,oldVal){
      if(this.place !== ''){
        this.place = '';
      }
      this.dynasty = newVal;
      this.updateData(newVal,oldVal);
    }
  },
  created () {
    axios.get(`http://localhost:3000/content?dynasty=${this.dynasty}&place=${this.place}`).then((res)=>{
      this.tabledata = res.data;
    });
  },
  mounted() {
    axios.get("http://localhost:3000/bar").then((res) => {
      this.bardata = res.data;
      this.barChartInit(this);
    });
  },
  methods: {
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
        .color("#FF8800")
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
      that.barchart.on('axis-label:click',(e)=>{
        this.place = e.target.attrs.text;
      })
      that.barchart.render();
    },
    selectPoetry(row,column,event){
      console.log(row);
      this.$store.state.content = row;
    },
    updateData(newVal,oldVal){
      if(newVal !== oldVal){
        axios.get(`http://localhost:3000/content?dynasty=${this.dynasty}&place=${this.place}`).then((res)=>{
          this.tabledata = res.data;
        });
      }else{
        axios.get(`http://localhost:3000/content?dynasty=${this.dynasty}&place=${this.place}`).then((res)=>{
          this.tabledata = res.data;
        });
      }
    }
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
  background-color: rgb(251, 252, 210);
}
#barChart {
  width: 100%;
  height: auto;
}
#second ::-webkit-scrollbar {
  width: 16px;
  height: 10px;
  background-color: rgb(251, 252, 210);
}
#second ::-webkit-scrollbar-thumb {
  background-color: rgb(196, 197, 197);
  border-radius: 3px;
}
</style>