<template>
  <div id="PoetList">
    <div id="first">
      <div id="barChart"></div>
    </div>
    <div id="second">
      <el-table
        :data="table1"
        height="100%"
        style="width: 100%"
        stripe
        :cell-style="{ border: '0px solid #F00' }"
        :row-style="{
          background: 'rgb(251, 252, 210)',
          fontSize: '10px',
        }"
        :header-cell-style="{
          background: 'rgb(251, 252, 210)',
          fontSize: '12px',
        }"
      >
        <el-table-column
          prop="date"
          label="诗歌名称"
          width="100"
        ></el-table-column>
        <el-table-column prop="name" label="作者" width="100"></el-table-column>
        <el-table-column prop="address" label="诗歌情感"></el-table-column>
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
      table1: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: " 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: " 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: " 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: " 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: " 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: " 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: " 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: " 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: " 1518 弄",
        },
      ],
      barchart: null,
      bardata: null
    };
  },
  computed: {
    
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
        console.log(e.target.attrs.text)
      })
      that.barchart.render();
    },

  },
  watch: {

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