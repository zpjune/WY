
<template>
  <div id="ToalCheckReport" class="app-container calendar-list-container">
    <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-date-picker
            type="year"
            placeholder="选择年度"
            v-model="listQuery.year"
            value-format="yyyy"
            size="mini"
            style="width:95%;"
          ></el-date-picker>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-input
            placeholder="房屋编号"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQuery.FWBH"
          ></el-input>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-input
            placeholder="任务名称"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQuery.RWMC"
          ></el-input>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-select
            placeholder="请选择检查结果"
            v-model="listQuery.JCJG"
            clearable
            size="mini"
            style="width:95%"
          >
            <el-option label="合格" :value="1"></el-option>
            <el-option label="不合格" :value="0"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-select
            placeholder="不合格大类"
            v-model="listQuery.DLID"
            clearable
            size="mini"
            style="width:95%"
          >
            <el-option
              v-for="(item,key) in DLOptions"
              :key="key"
              :label="item.Name"
              :value="item.ID"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="5" :xl="5">
          <el-button
            size="mini"
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="getList"
          >搜索</el-button>
          <el-button size="mini" class="filter-item" type="success" v-waves @click="exprotReport">导出</el-button>
        </el-col>
      </el-row>
    </div>
    <el-card>
      <el-row>
        <el-col :span="24">
          <el-table
            :key="tableKey"
            :data="list"
            size="mini"
            :header-cell-class-name="tableRowClassName"
            v-loading="listLoading"
            element-loading-text="给我一点时间"
            border
            fit
            highlight-current-row
            style="width: 100%;text-align:left;"
            @select="select"
            @select-all="selectall"
            ref="table"
          >
            <!-- <el-table-column type="selection" width="55" v-if="listQuery.JCJG===0"></el-table-column> -->
            <el-table-column align="center"  label="任务名称" fixed="left"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.RWMC}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center"  label="检查区域" fixed="left" width="400"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.JCQY}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="房屋编号"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.FWBH}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="房屋名称"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.FWMC}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="房屋区域"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.Name}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="业主名称"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.ZHXM}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="检查结果"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.JCJG|change}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="复查次数 "  show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="是否反馈"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.IS_REVIEW|changeFK}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="检查时间 "  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.JCSJ}}</span>
              </template>
            </el-table-column> 
            <el-table-column align="center" label="检查人"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.FZR}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="120px">
              <template slot-scope="scope">
                <el-button type="primary" @click="GetDetail(scope.row)" size="mini">查看检查明细</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align:center">
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
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :visible.sync="detailDialog" title="检查结果详情">
      <el-card>
        <el-table
          :data="detaillist"
          size="mini"
          :header-cell-class-name="tableRowClassName"
          v-loading="listLoading"
          border
          fit
          highlight-current-row
          style="width: 100%;text-align:left;"
          :span-method="objectSpanMethod"
        >
          <el-table-column label="检查大类" prop="DL"></el-table-column>
          <el-table-column label="检查内容" prop="XL"></el-table-column>
          <el-table-column label="检查结果" prop="result"></el-table-column>
          <el-table-column label="复查结果" prop="result" v-if="JCJG==3"></el-table-column>
          <el-table-column label="复查结果" v-if="JCJG==2">
            <template slot-scope="scope">
              <span>合格</span>
              <span v-if="1===2">{{scope.row.result}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-dialog>
  </div>
</template>



<script>
// import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
import {
  GetCheckResult,
  GetCheckResultDetail,
  GetParentCheckCodeOptions,
  ExportTotalCheckReport
} from "@/app_src/api/TJFX/BBTJ/TotalCheckReport.js";

const passTypeOptions = [
  { key: 0, type_name: "不合格" },
  { key: 1, type_name: "合格" },
  { key: 2, type_name: "复查不合格" },
  { key: 3, type_name: "复查合格" },
];
const passTypeKeyValue = passTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.type_name;
  return acc;
}, {});

const IS_REVIEW_Options = [
  { key: 0, type_name: "未反馈" },
  { key: 1, type_name: "已反馈" },
];
const IS_REVIEW_KeyValue = IS_REVIEW_Options.reduce((acc, cur) => {
  acc[cur.key] = cur.type_name;
  return acc;
}, {});
export default {
  name: "ToalCheckReport",
  directives: {
    waves
  },
  //   components: {
  //     Treeselect
  //   },
  data() {
    return {
      tableKey: 0,
      DLOptions: [],
      list: [],
      detaillist: [],
      JCJG:0,
      total: 0,
      listLoading: false,
      listQuery: {
        JCJG: "",
        year: "",
        FWBH: "",
        RWMC: "",
        DLID: "",
        page: 1,
        limit: 10
      },
      textMap: {
        update: "修改房屋信息",
        create: "添加房屋信息"
      },
      editVisible: false,
      dialogStatus: "",
      treeData: [],
      detailDialog: false,
      spanArr: [],
      selectList: []
    };
  },
  methods: {
    select(selection, row) {
      this.selectList = [];
      this.selectList.push(selection.RESULT_ID);
    },
    elselectchange() {
      this.getList();
    },
    selectall(selection) {
      this.selectList = [];
      selection.forEach(item => {
        this.selectList.push(item.RESULT_ID);
      });
    },
    deleteRow(index, rows) {
      //删除改行
      rows.splice(index, 1);
    },
    addRow(tableData, event) {
      tableData.push({ fildna: "", fildtp: "", remark: "" });
    },

    resetTemp() {
      this.temp = {
        FWBH: "",
        FWMC: "",
        JZMJ: "",
        LSFGS: "",
        ZLWZ: "",
        FZFJE: "",
        WYFJE: "",
        FWSX: ""
      };
    },
    notice() {
      this.$confirm("确定要推送整改消息吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Rectification(this.selectList).then(res => {
          if (res.data.code === 2000) {
            this.$notify({
              position: "bottom-right",
              title: "成功",
              message: res.data.message,
              type: "success",
              duration: 2000
            });
          } else {
            this.$notify({
              position: "bottom-right",
              title: "失败",
              message: res.data.message,
              type: "error",
              duration: 2000
            });
          }
        });
      });
    },
    exprotReport() {
      ExportTotalCheckReport(this.listQuery).then(res => {
        if (res.data.code === 2000) {
          let list = res.data.items;
          import("@/frame_src/vendor/Export2Excel").then(excel => {
            const tHeader = [
              "任务名称",
              "检查区域",
              "房屋编号",
              "房屋区域",
              "业主名称",
              "总体检查结果",
              "复查次数",
              "是否反馈",
              "检查时间",
              "检查大类",
              "检查内容",
              "明细检查结果",
              "检查人"
            ];
            const filterVal = [
              "RWMC",
              "JCQY",
              "FWBH",
              "FWQY",
              "ZHXM",
              "JCJG",
              "JCCS",
              "IS_REVIEW",
              "JCSJ",
              "DL",
              "XL",
              "result",
              "FZR"
            ];
            const data = this.formatJson(filterVal, list);
            //console.log(data);
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: "任务结果报表"
            });
          });
        }
        else{
           this.$notify({
            position: "bottom-right",
            title: "失败",
            message: res.message,
            type: "error",
            duration: 2000
          });
        }
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "JCJG") {
            return passTypeKeyValue[v[j]];
          }
          else if(j==="IS_REVIEW"){
            return IS_REVIEW_KeyValue[v[j]];
          } 
          else {
            return v[j];
          }
        })
      );
    },
    getList() {
      this.listLoading = true;
      GetCheckResult(this.listQuery).then(res => {
        if (res.data.code === 2000) {
          this.list = res.data.items;
          this.total = res.data.total;
          this.listLoading = false;
        } else {
          this.$notify({
            position: "bottom-right",
            title: "失败",
            message: res.data.message,
            type: "error",
            duration: 2000
          });
        }
      });
    },
    GetDetail(row) {
      this.detailDialog = true;
      let temp = {
        RESULT_ID: row.RESULT_ID
      };
      GetCheckResultDetail(temp).then(res => {
        if (res.data.code === 2000) {
          this.detaillist = res.data.items;
          let contactDot = 0;
          this.spanArr = [];
          this.detaillist.forEach((item, index) => {
            if (index === 0) {
              this.spanArr.push(1); //首条数据肯定为不相同数据
            } else {
              if (item.DL === this.detaillist[index - 1].DL) {
                this.spanArr[contactDot] += 1; //首条相同数据数量+1
                this.spanArr.push(0); //其后的数据标识为0
              } else {
                contactDot = index; //记录当前的索引
                this.spanArr.push(1); //不同数据标识为1
              }
            }
          });
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (this.spanArr[rowIndex]) {
          //游标数组内对应索引不为0的返回合并数据,为0的直接返回原数据
          return {
            rowspan: this.spanArr[rowIndex],
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    handleCreate() {
      this.resetTemp();
      this.editVisible = true;
      this.dialogStatus = "create";
      if (this.$refs["dataForm"] !== undefined) {
        this.$refs["dataForm"].resetFields();
      }
    },
    handleUpdate(row) {
      this.$router.push({ path: "/RCGZ/JCJGCXXQ" });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    getYear() {
      let date = new Date();
      let year = date.getFullYear();
      this.listQuery.year = year.toString();
    },
    getOptions() {
      GetParentCheckCodeOptions().then(res => {
        if (res.data.code === 2000) {
          this.DLOptions = res.data.items;
        }
      });
    }
  },
  created() {
    this.listLoading = false;
    this.getOptions();
    this.getYear();
    this.getList();
  },
  computed: {
    getRoleLevel() {
      if (this.$store.state.user.roleLevel === "admin") {
        return true;
      } else {
        return false;
      }
    }
  },
  filters: {
    change(val) {
      switch (val) {
        case 0:
          return "不合格";
        case 1:
          return "合格";
        case 2:
          return "复查合格";
        case 3:
          return "复查不合格";
        default:
          return "不合格";
      }
    },
    changeFK(val) {
      if (val === 0) {
        return "未反馈";
      } else {
        return "已反馈";
      }
    }
  }
};
</script>

<style lang="scss" >
#JCJGCX {
  .topSearh {
    margin-bottom: 15px;
  }
  .page {
    text-align: center;
  }
  .buttom {
    float: right;
  }
  .vue-treeselect__control {
    height: 28px !important;
    width: 100%;
  }
  .vue-treeselect__placeholder,
  .vue-treeselect__single-value {
    line-height: 28px;
  }
}
.selecttrees {
  .vue-treeselect--searchable .vue-treeselect__input-container {
    height: 28px !important;
    width: 100%;
  }
  .el-dialog__body {
    padding: 0px 10px 10px !important;
  }
}
</style>

