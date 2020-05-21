<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row style="margin-bottom:10px;">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="3">
          <el-date-picker
            v-model="month"
            style="width:97%;"
            size="mini"
            type="month"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="3">
          <el-input
            size="mini"
            style="width:97%;"
            placeholder="请输入商铺名称"
            v-model="listQuery.HouseName"
          ></el-input>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-input
            size="mini"
            v-model="listQuery.YeZhuName"
            type="text"
            placeholder="输入业主名称"
            style="width:97%;"
          ></el-input>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-select
            style="width:97%;"
            size="mini"
            v-model="listQuery.yjstate"
            :clearable="true"
            placeholder="请选择预警状态"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-button
            size="mini"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="handleFilter"
          >查询</el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-download"
            v-waves
            @click="btnexport"
          >导出</el-button>
        </el-col>
      </el-row>
    </div>
    <el-card class="box-card">
      <el-table
        size="mini"
        :key="tableKey"
        :header-cell-class-name="tableRowClassName"
        :data="list"
        v-loading="listLoading"
        element-loading-text="给我一点时间"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          width="160px"
          class="filter-item"
          align="center"
          :label="'月度'"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{scope.row.UpdateDateMonth}}</span>
          </template>
        </el-table-column>
          <el-table-column width="150px" align="center" :label="'用电度数'" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.eleAmountDiff}}</span>
          </template>
        </el-table-column>
         <el-table-column width="120px" align="center" :label="'预警状态'" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.yjstate==1" style="color:red">异常</span>
            <span v-else style="color:green">正常</span>
          </template>
        </el-table-column>
        <el-table-column
          width="120px"
          align="center"
          :label="'预警标准(度)'"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{scope.row.AmountLimit}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="120px"
          align="center"
          :label="'预警百分比(±%)'"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{scope.row.elePercent}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="200px"
          class="link-type"
          align="center"
          :label="'商铺编号'"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{scope.row.FWBH}}</span>
          </template>
        </el-table-column>
        <el-table-column width="350px" align="center" :label="'商铺名称'" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.FWMC}}</span>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="center" :label="'电表号'" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.ELE_NUMBER}}</span>
          </template>
        </el-table-column>
         <el-table-column width="120px" align="center" :label="'采集器id'" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.CID}}</span>
          </template>
        </el-table-column>WATER_NUMBER
        <el-table-column width="120px" align="center" :label="'业主姓名'" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.ZHXM}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="120px"
          align="center"
          :label="'业主手机号'"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{scope.row.MOBILE_PHONE1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="130px"
          align="center"
          :label="'转租商户姓名'"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{scope.row.ZHXM1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="120px"
          align="center"
          :label="'转租商户手机号'"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{scope.row.MOBILE_PHONE1}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { GetEleData, ExportEleData } from "@/app_src/api/ELE/EleManage";
import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { parseTime, dateFormatNew } from "@/frame_src/utils/index.js";
const yjstateOptions = [
  { key: 0, type_name: "正常" },
  { key: 1, type_name: "异常" }
];
const TZKeyValue = yjstateOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.type_name;
  return acc;
}, {});
export default {
  name: "EleReport",
  directives: {
    waves
  },

  data() {
    return {
      tableKey: 0,
      list: null,
      options: [
        {
          value: "1",
          label: "异常"
        },
        {
          value: "0",
          label: "正常"
        }
      ],
      total: null,
      listLoading: true,
      value1: "",
      month: "",
      listQuery: {
        yjstate: "",
        month: "",
        HouseName: "",
        YeZhuName: "",
        ZhuanZuName: "",
        page: 1,
        limit: 10
      },

      downloadLoading: false
    };
  },
  filters: {
    parseTime
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    btnexport() {
      // 导出
      import("@/frame_src/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "月度",
          "用电度数",
          "预警状态",
          "预警标准(度)",
          "预警百分比(±%)",
          "房屋编号",
          "房屋名称",
          "电表号",
          "采集器id",
          "业主姓名",
          "业主电话",
          "转租商户姓名",
          "转租商户电话"
        ];
        const filterVal = [
          "UpdateDateMonth",
           "eleAmountDiff",
           "yjstate",
          "AmountLimit",
          "elePercent",
          "FWBH",
          "FWMC",
          "ELE_NUMBER",
          "CID",
          "ZHXM",
          "MOBILE_PHONE",
          "ZHXM1",
          "MOBILE_PHONE1"
         
        ];
       let monthnew = dateFormatNew(this.month);
      if (monthnew == "1970-01-01") {
        this.listQuery.month = "";
      } else {
        this.listQuery.month = monthnew;
      }
        ExportEleData(this.listQuery).then(res => {
          if (res.data.code === 2000) {
            let list = res.data.items;
            const data = this.formatJson(filterVal, this.list);
             let month1 = dateFormatNew(this.month);
            if (month1 == "1970-01-01") {
              month1 = "";
            }
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename:
                month1.substr(0, 7)  + "月度用电报表"
            });
          } else {
            this.$notify({
              position: "bottom-right",
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000
            });
          }
        });
      });
    },
     formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "yjstate") {
            return TZKeyValue[v[j]];
          } else {
            return v[j];
          }
        })
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    getList() {
      let monthnew = dateFormatNew(this.month);
      if (monthnew == "1970-01-01") {
        this.listQuery.month = "";
      } else {
        this.listQuery.month = monthnew;
      }
      this.listLoading = true;
      GetEleData(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items;
          this.total = response.data.total;
          this.listLoading = false;
        } else {
          this.listLoading = false;
          this.$notify({
            position: "bottom-right",
            title: "失败",
            message: response.data.message,
            type: "error",
            duration: 2000
          });
        }
      });
    },
    tableRowClassName({ row, rowIndex }) {
      // 可以通过指定 Table 组件的 :header-cell-class-name 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className属性来为 Table 中的某一行添加 class，表明该行处于某种状态
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    }
  },
  created() {
    // 获取登陆信息的俩种方式
    this.month = new Date();
    this.listLoading = false;
  },
  mounted() {
    this.getList();
  }
};
</script>