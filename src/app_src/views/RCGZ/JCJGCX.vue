
<template>
  <div id="JCJGCX" class="app-container calendar-list-container">
    <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <el-date-picker
            type="year"
            placeholder="选择年度"
            v-model="listQuery.year"
            value-format="yyyy"
            size="mini"
            style="width:95%;"
          ></el-date-picker>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <el-input
            placeholder="房屋编号"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQuery.FWBH"
          ></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <el-input
            placeholder="任务名称"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQuery.RWMC"
          ></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <el-select
            placeholder="请选择检查结果"
            v-model="listQuery.JCJG"
            clearable
            size="mini"
            style="width:95%"
            @change="elselectchange"
          >
            <el-option label="合格" :value="1"></el-option>
            <el-option label="不合格" :value="0"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <el-button
            size="mini"
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="getList"
          >搜索</el-button>
          <!-- <el-button
            size="mini"
            class="filter-item"
            type="success"
            v-waves
            @click="notice"
            :disabled="selectList.length===0"
          >提醒</el-button>-->
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
            <el-table-column
              align="center"
              prop="RWMC"
              label="任务名称"
              fixed="left"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{scope.row.RWMC}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="JCQY"
              label="检查区域"
              fixed="left"
              width="300"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{scope.row.JCQY}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="FWBH" label="房屋编号" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.FWBH}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="FWMC" label="房屋名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.FWMC}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="FWBH" label="房屋区域" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.Name}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="YZMC" label="业主名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.ZHXM}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="检查结果" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.JCJG|change}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="JCCS" label="复查次数" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="是否反馈">
              <template slot-scope="scope">
                <span>{{scope.row.IS_REVIEW|changeFK}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="JCSJ" label="检查时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.JCSJ}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="JCR" label="检查人" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.FZR}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="JCR" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" @click="GetDetail(scope.row)" size="mini">查看检查明细</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
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
    <el-dialog :visible.sync="detailDialog" title="检查结果详情" :close-on-click-modal="false">
      <el-card>
        <div slot="header" class="clearfix">
          <span>检查明细</span>
        </div>
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
      <el-card style="margin-top:20px;">
        <div slot="header" class="clearfix">
          <span>现场照片</span>
        </div>
        <img  v-for="(item,key) in PicList" :key="key" :src="item" alt="" style="margin: 0 auto">
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
  Rectification
} from "@/app_src/api/RCGZ/JCJGCX";
export default {
  name: "JCJGCX",
  directives: {
    waves
  },
  //   components: {
  //     Treeselect
  //   },
  data() {
    return {
      tableKey: 0,
      list: [],
      detaillist: [],
      PicList: [],
      total: 0,
      listLoading: false,
      JCJG: 0,
      listQuery: {
        JCJG: "",
        year: "",
        FWBH: "",
        RWMC: "",
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
      //this.selectList.push(selection.RESULT_ID);
      selection.forEach(item => {
        this.selectList.push(item.RESULT_ID);
      });
    },
    elselectchange() {
      this.getList();
    },
    selectall(selection) {
      this.selectList = [];
      //console.log(selection);
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
      this.JCJG = row.JCJG;
      let temp = {
        RESULT_ID: row.RESULT_ID
      };
      this.PicList =JSON.parse(row.IMGS);
      console.log(this.PicList);
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
    decodeBase64Content(base64Content){
      let commonContent = base64Content.replace(/\s/g, "+");
      commonContent = Buffer.from(commonContent, "base64").toString();
      return commonContent;
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
    }
  },
  created() {
    this.listLoading = false;
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

