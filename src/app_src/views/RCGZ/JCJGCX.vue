
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
          <el-select placeholder="请选择检查结果" v-model="listQuery.JCJG" clearable size="mini"  style="width:95%">
            <el-option label="合格" :value="1"></el-option>
            <el-option label="不合格" :value="0" ></el-option>
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
          <el-button
            size="mini"
            class="filter-item"
            type="success"
            v-waves
            @click="getList"
          >提醒</el-button>
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
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column align="center" prop="RWMC" label="任务名称" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.RWMC}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="JCQY" label="检查区域" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.JCQY}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="FWBH" label="房屋编号">
              <template slot-scope="scope">
                <span>{{scope.row.FWBH}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="FWBH" label="房屋区域">
              <template slot-scope="scope">
                <span>{{scope.row.Name}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="YZMC" label="业主名称">
              <template slot-scope="scope">
                <span>{{scope.row.ZHXM}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="JCJG" label="检查结果">
              <template slot-scope="scope">
                <span>{{scope.row.JCJG|change}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="JCSJ" label="检查时间">
              <template slot-scope="scope">
                <span>{{scope.row.JCSJ}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="JCR" label="检查人">
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
    <el-dialog :visible.sync="detailDialog" title="检查结果详情">
      <el-card>

      </el-card>
    </el-dialog>
  </div>
</template>



<script>
// import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
import { GetCheckResult } from "@/app_src/api/RCGZ/JCJGCX";
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
      rules: {
        FWMC: [
          { required: true, message: "请输入房屋名称", trigger: "change" }
        ],
        LSFGS: [
          { required: true, message: "请输入所属分公司", trigger: "change" }
        ],
        FZFJE: [
          { required: true, message: "请输入房租金额", trigger: "change" }
        ],
        WYFJE: [
          { required: true, message: "请输入物业费金额", trigger: "change" }
        ]
      },
      total: 0,
      listLoading: false,
      listQuery: {
        JCJG:"",
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
      detailDialog:false,
    };
  },
  methods: {
     select(selection, row) {
      this.selectList =selection;
      
    },
    selectall(selection) {
      this.selectList = selection;
      
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
    GetDetail(row){
      this.detailDialog=true;
      console.log(row.RESULT_ID);
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

    handleDelete(row) {
      this.$confirm("确认发送整改通知吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //   const query = { S_ID: row.S_Id };
          //   deleteTaxOrg(query).then(response => {
          //     this.message = response.data.message;
          //     this.title = "失败";
          //     this.type = "error";
          //     if (response.data.code === 2000) {
          //       // const index = this.list.indexOf(row)
          //       // this.list.splice(index, 1)
          this.getList();
          this.title = "成功";
          this.type = "success";
          //     }
          this.$notify({
            position: "bottom-right",
            title: this.title,
            message: this.message,
            type: this.type,
            duration: 2000
          });
          //   });
        })
        .catch(() => {});
    },
    createData() {
      // 创建
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          //   createTaxOrg(this.temp).then(response => {
          //     var message = response.data.message;
          var message = "成功";
          var title = "失败";
          var type = "error";
          //     if (response.data.code === 2000) {
          this.getList();
          title = "成功";
          type = "success";
          // this.list.unshift(this.temp)
          //     }
          this.editVisible = false;
          this.$notify({
            position: "bottom-right",
            title: title,
            message: message,
            type: type,
            duration: 3000
          });
          //   });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp); // 这样就不会共用同一个对象
          //   tempData.S_UpdateBy = this.$store.state.user.userId;
          //   //tempData.NOTICE_CONTENT=this.content
          //   updateTaxOrg(tempData).then(response => {
          //     var message = response.data.message;
          var message = "成功";
          var title = "失败";
          var type = "error";
          //     if (response.data.code === 2000) {
          this.getList();
          title = "成功";
          type = "success";
          // }
          this.editVisible = false;
          this.$notify({
            position: "bottom-right",
            title: title,
            message: message,
            type: type,
            duration: 3000
          });
          //   });
        }
      });
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
      if (val === 1) {
        return "合格";
      } else {
        return "不合格";
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

