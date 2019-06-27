<template>
  <div id="aqwttj" class="app-container calendar-list-container">
    <div class="filter-container">
     <div>
          <el-date-picker
            v-model="dataYear"
            style="width:120px"
            type="year"
            placeholder="选择年"
            size="mini"
          ></el-date-picker>
          <el-button style="margin-left:5px" type="primary" size="mini" @click="handleFlush">刷新</el-button>
        </div>
        <el-row style="overflow-x: scroll;">
          <el-col :span="24">
            <div id="pic" style="width:1300px;height:400px;padding-top:10px;"></div>
          </el-col>
        </el-row>
    </div>
    <el-dialog
      :visible.sync="DetailVisible"
      class="selecttrees"
      title="详情"
      width="700px"
    >
      <el-card>
       
         <el-table
      :key="tableKeydetail"
      :data="listdetail"
      :header-cell-class-name="tableRowClassName"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      size="mini"
      id="table"
    >
      <el-table-column width="120px" align="center" label="区域">
        <template slot-scope="scope">
          <span>{{scope.row.quyu}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="200px"  label="安全问题类型">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="次数">
        <template slot-scope="scope">
          <span>{{scope.row.cishu}}</span>
        </template>
      </el-table-column>
    </el-table>
      </el-card>
    </el-dialog>
  </div>
</template>
            
<script>
export default {
  name: "aqwttj",
  data() {
    return {
      listLoading: false,
      dataYear:"2019-06-01",
      listQuery: {
        QuYu: "",
        Name: ""
      },
      dateQuery:"",
      options: [
        {
          value: "选项1",
          label: "A区"
        },
        {
          value: "选项2",
          label: "B区"
        },
        {
          value: "选项3",
          label: "C区"
        }
      ],
      anquanleixing:[

      ],
      anquan :"",
      value: "",
      listdetail: [
        {
          quyu: "A区",
          name: "安全",
          cishu:"3"
        },
        {
          quyu: "A区",
          name: "消防",
          cishu:"5"
        }
      ],
      DetailVisible: false,
      tableKey:0,
      tableKeydetail:0,
       option: {
        title: {
          text: "",
          subtext: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["区域"]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "A区",
              "B区",
              "C区",
              "D区",
              "E区",
              "F区",
              "G区",
              "I区",
              "J区",
              "K区",
              "K区",
              "L区",
              "M区"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "区域",
            type: "bar",
            data: [
              2.0,
              6,
              7.0,
              10,
              3,
              5,
             6,
              7,
              2,
              1,
              3,
             4,
             3
            ]
          }
        ]
      }
    };
  },
  methods: {
    handleFilter() {
       
    },
    handleDetail(){
        
    },
    handleDownload() {

    },
    drawline() {
      let _this = this;
      ///绘制echarts 饼状图
      let mycharts = this.$echarts.init(document.getElementById("pic"));
      mycharts.setOption(this.option, true);
      mycharts.on("click", function(param) {
        _this.DetailVisible=true;
        _this.crkDetailTitle = param.dataIndex + 1 + "月份出入库明细";
        console.log(param.dataIndex);
        console.log(param.seriesIndex);
        console.log(param.seriesName);
      });
    },
    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    }
  },
  mounted(){
    this.drawline()
  }
};
</script>
            
<style>
</style>
            