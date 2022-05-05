<template>
  <div id="Content">
    <div id="title">{{title}}</div>
    <div id="infor">[{{dynasty}}]  {{author}}</div>
    <div id="detail">
      <el-table 
      height="100%" 
      style="width: 100%"
      :data="detail"
      :show-header="false"
      :row-style="{
          background: 'rgba(226,224,199,0)',
          fontSize: '16px',
          fontWeight: 'bold'
      }"
      :cell-style='cellStyle'
      >
        <el-table-column prop="parag" label="诗歌名称">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content",
  data() {
    return {
        basedata: null,
        detail: [{"parag":"床前明月光，疑是地上霜。"},{"parag":"举头望明月，低头思故乡。"}],
        title: "静夜思",
        dynasty: "唐",
        author: "李白"
    };
  },
  computed: {
      getBaseData(){
          return this.$store.state.content;
      }
  },
  watch: {
      getBaseData:function(newVal,oldVal){
          this.basedata = newVal;
          this.dataTransfrom(newVal);
      }
  },
  mounted() {

  },
  methods: {
      dataTransfrom(data){
          this.title = data.title;
          this.dynasty = data.dynasty;
          this.author = data.author;
          let r = [];
          let len = data.content.length;
          for(let i=0;i<len;i++){
              let tmp = {}
              tmp['parag'] = data.content[i];
              tmp['emotion'] = data.emotion_list[i];
              r.push(tmp);
          }
          this.detail = r;
      },
      cellStyle({row,column}){
          let str = "text-align:center;padding:5px 0;border:0px solid #F00;";
          if(row.emotion==='哀'){
            return str + "color: #1B9CFC";
          }else if(row.emotion==='喜'){
            return str + "color: #F97F51";
          }else if(row.emotion==='思'){
              return str + "color: #82589F";
          }else{
              return str;
          }
      }
  },
};
</script>

<style>
#Content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#title {
  width: 100%;
  height: 15%;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
#infor {
  width: 100%;
  height: 10%;
  font-size: 14px;
  text-align: center;
}
#detail {
  width: 100%;
  height: 60%;
  overflow: auto;
}
</style>