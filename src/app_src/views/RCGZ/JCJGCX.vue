
<template>
  <div id="JCJGCX" class="app-container calendar-list-container">
    <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="5">
          <el-date-picker
            type="year"
            placeholder="选择年度"
            v-model="listQuery.year"
            value-format="yyyy"
            size="mini"
            style="width:95%;"
          ></el-date-picker>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-input
            placeholder="房屋编号"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQuery.FWBH"
          ></el-input>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-input
            placeholder="任务名称"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQuery.RWMC"
          ></el-input>
        </el-col>

        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="5">
          <el-button
            size="mini"
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="getList"
          >搜索</el-button>

          <!-- <el-button type="primary" icon="el-icon-document" size="mini">导出</el-button> -->
          <!-- <el-button
            size="mini"
            class="filter-item"
            style="margin-left: 10px;"
            @click="handleCreate"
            type="primary"
            icon="el-icon-edit"
          >新增</el-button>-->
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
          >
            <el-table-column align="right" prop="RWMC" label="任务名称" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.RWMC}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" width="150" prop="JCQY" label="检查区域" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.JCQY}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" width="100" prop="JCXM" label="检查情况">
              <template slot-scope="scope">
                <span>{{scope.row.JCQK}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="FWBH" label="房屋编号">
              <template slot-scope="scope">
                <span>{{scope.row.FWBH}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="YZMC" label="业主名称">
              <template slot-scope="scope">
                <span>{{scope.row.ZHXM}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="JCJG" label="检查结果">
              <template slot-scope="scope">
                <span>{{scope.row.JCJG}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" width="100" prop="JCSJ" label="检查时间">
              <template slot-scope="scope">
                <span>{{scope.row.JCSJ}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" width="100" prop="JCR" label="检查人">
              <template slot-scope="scope">
                <span>{{scope.row.JCR}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="任务状态">
              <template slot-scope="scope">
                <span>{{scope.row.RWZT}}</span>
              </template>
            </el-table-column>-->

            <!-- <el-table-column align="center" width="240" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">查看详情</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">发送整改通知</el-button>
              </template>
            </el-table-column> -->
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
      usedOptions: [
        {
          value: "0",
          name: "一季度安全检查"
        },
        {
          value: "1",
          name: "节前消防检查"
        },
        {
          value: "2",
          name: "临时安全检查"
        }
      ],

      tableKey: 0,
      selectOptions: [
        {
          value: 0,
          label: "出售"
        },
        {
          value: 1,
          label: "出租"
        }
      ],
      areaOptions: [
        {
          value: 0,
          label: "A区"
        },
        {
          value: 1,
          label: "B区"
        },
        {
          value: 2,
          label: "C区"
        },
        {
          value: 3,
          label: "D区"
        }
      ],
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
      total:0,
      listLoading: false,
      listQuery: {
        year: "",
        FWBH: "",
        RWMC: "",
        page: 1,
        limit: 10
      },
      temp: {
        FWBH: "D-211",
        FWMC: "房屋5",
        JZMJ: "127㎡",
        LSFGS: "云计算技术部",
        ZLWZ: "D区",
        FZFJE: 25000,
        WYFJE: 1350,
        FWSX: "出售"
      },
      textMap: {
        update: "修改房屋信息",
        create: "添加房屋信息"
      },
      editVisible: false,
      dialogStatus: "",

      treeData: []
    };
  },
  methods: {
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

      //     }
      //   });
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

