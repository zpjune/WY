<template>
  <div id="NDJCJH" class="app-container calendar-list-container">
    <el-row style="margin-bottom:10px;">
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-input
          placeholder="计划名称"
          style="width:95%;"
          size="mini"
          clearable
          v-model="listQuery.JHMC"
        ></el-input>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-date-picker
          type="year"
          placeholder="选择年度"
          v-model="listQuery.JHND"
          style="width: 100%;"
          value-format="yyyy"
          size="mini"
        ></el-date-picker>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">查询</el-button>
        <el-button
          size="mini"
          class="filter-item"
          style="margin-left: 10px;"
          @click="handleCreate"
          type="primary"
          icon="el-icon-edit"
        >新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-table
          size="mini"
          :data="list"
          :header-cell-class-name="tableRowClassName"
          v-loading="listloading"
          element-loading-text="给我一点时间"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column label="计划年度" prop="JHND"></el-table-column>
          <el-table-column label="计划名称" prop="JHMC"></el-table-column>
          <el-table-column label="计划说明" prop="JHSM"></el-table-column>
          <el-table-column label="计划时间" prop="JHSJ"></el-table-column>
          <el-table-column label="备注" prop="REMARK"></el-table-column>
          <el-table-column align="center" width="200" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10,20,30, 50]"
          :page-size="1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="text-align: center;"
        ></el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="editVisible"
      class="selecttrees"
      :title="textMap[dialogStatus]"
      width="1000px"
      :close-on-click-modal="false"
    >
      <el-card>
        <el-form
          ref="dataForm"
          :model="temp"
          :rules="rules"
          label-width="120px"
          style="width: 99%;"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="计划年度" prop="JHND">
                <el-date-picker
                  type="year"
                  placeholder="选择年度"
                  v-model="temp.JHND"
                  style="width: 100%;"
                  value-format="yyyy"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计划名称" prop="JHMC">
                <el-input v-model="temp.JHMC"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="计划说明" prop="JHSM">
                <el-input v-model="temp.JHSM"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计划时间" prop="JHSJ">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="temp.JHSJ"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="REMARK">
                <el-input v-model="temp.REMARK" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="计划内容" prop="servin">
                <el-button type="primary" @click="addRow(DetailList)">添加</el-button>
                <el-table
                  :data="DetailList"
                  size="mini"
                  highlight-current-row
                  border
                  style="width: 100%"
                >
                  <el-table-column label="区域">
                    <template slot-scope="scope">
                      <!-- <el-input size="mini" v-model="scope.row.JCQY"></el-input> -->
                      <el-select style="width:100%;" v-model="scope.row.JCQY" multiple>
                        <el-option
                          v-for="(item,key) in areaOptions"
                          :key="key"
                          :label="item.Name"
                          :value="item.Code"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="检查内容">
                    <template slot-scope="scope">
                      <el-input size="mini" v-model="scope.row.JCNR"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="检查类型">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.JCLX" clearable size="mini">
                        <el-option
                          v-for="(item,index) in fildtps"
                          :key="index"
                          :label="item.text"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="排查次数">
                    <template slot-scope="scope">
                      <el-input size="mini" v-model="scope.row.PCCS"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        type="danger"
                        @click.native.prevent="deleteRow(scope.$index, DetailList)"
                        size="small"
                        v-if="!scope.row.PLAN_DETAIL_ID"
                      >移除</el-button>
                      <el-button
                        type="danger"
                        @click.native.prevent="RemoveInfo(scope.$index, DetailList,scope.row)"
                        size="small"
                        v-else-if="scope.row.PLAN_DETAIL_ID"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-else type="primary" @click="updateData">保存</el-button>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetCheckPlan,
  GetCheckPlanDetail,
  DeleteCheckPlan,
  DeleteCheckPlanDetail,
  CreateCheckPlan,
  UpdateCheckPlan
} from "@/app_src/api/RCGZ/NDJHJC";
import { GetOptions } from "@/app_src/api/commonApi";
export default {
  name: "NDJCJH",
  data() {
    return {
      DetailList: [],
      DeleteList: [],
      total: 0,
      workFlowVisible: false,
      listQuery: {
        JHMC: "",
        JHND: "",
        page: 1,
        limit: 10
      },
      fildtps: [
        { text: "消防", value: "1" },
        { text: "安全", value: "2" }
      ],
      textMap: {
        update: "修改年度计划",
        create: "添加年度计划"
      },
      temp: {
        JHND: "",
        JHMC: "",
        JHSM: "",
        JHSJ: "",
        REMARK: "",
        userId: this.$store.state.user.userId,
        CheckPlanDetail: []
      },
      inServForm: {},
      editVisible: false,
      dialogStatus: "",
      listloading: false,
      list: [],
      areaOptions:[],
      rules: {
        JHND: [
          {
            required: true,
            message: "请输入计划年度",
            trigger: "change"
          }
        ],
        JHMC: [
          {
            required: true,
            message: "请输入计划名称",
            trigger: "change"
          }
        ],
        JHSM: [
          {
            required: true,
            message: "请输入计划说明",
            trigger: "change"
          }
        ],
        JHSJ: [
          {
            required: true,
            message: "请输入计划时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    deleteRow(index, rows) {
      //删除改行
      rows.splice(index, 1);
    },
    RemoveInfo(index, rows, row) {
      this.$confirm("确认删除本条任务明细吗!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          row.IS_DELETE = 1;
          this.DeleteList.push(row);
          console.log(this.DeleteList);
          this.deleteRow(index, rows);
        })
        .catch(() => {});
    },
    addRow(tableData, event) {
      tableData.push({
        JCQY: "",
        JCNR: "",
        JCLX: "",
        PCCS: ""
      });
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
      let temp = {
        PLAN_ID: row.PLAN_ID
      };
      GetCheckPlanDetail(temp).then(res => {
        if (res.data.code === 2000) {
          this.DetailList = res.data.items;
        }
      });
      this.resetTemp();
      this.temp = Object.assign({}, row); // copy obj
      this.editVisible = true;
      this.dialogStatus = "update";

      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    getList() {
      this.listLoading = true;
      GetCheckPlan(this.listQuery).then(response => {
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

    resetTemp() {
      this.temp = {
        JHND: "",
        JHMC: "",
        JHSM: "",
        JHSJ: "",
        REMARK: "",
        userId: this.$store.state.user.userId
      };
      this.DetailList = [];
      this.DeleteList = [];
    },
    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    handleProcess() {
      this.workFlowVisible = true;
    },
    handleSizeChange(val) {
      this.listQuery.limit=val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page=val;
      this.getList();
    },
    handleCreate() {
      this.resetTemp();
      this.editVisible = true;
      this.dialogStatus = "create";
      if (this.$refs["dataForm"] !== undefined) {
        this.$refs["dataForm"].resetFields();
      }
    },

    handleDelete(row) {
      this.$confirm("确认删除本条数据吗!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let temp = {
            PLAN_ID: row.PLAN_ID
          };
          DeleteCheckPlan(temp).then(res => {
            if (res.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: res.data.message,
                type: "success",
                duration: 2000
              });
              this.getList();
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
        })
        .catch(() => {});
    },
    createData() {
      // 创建
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.CheckPlanDetail = this.DetailList;
          CreateCheckPlan(this.temp).then(response => {
            if (response.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: response.data.message,
                type: "success",
                duration: 3000
              });
              this.getList();
              this.editVisible = false;
            } else {
              this.$notify({
                position: "bottom-right",
                title: "失败",
                message: response.data.message,
                type: "error",
                duration: 3000
              });
            }
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          let tempData = Object.assign({}, this.temp); // 这样就不会共用同一个对象
          tempData.CheckPlanDetail = this.DetailList;
          tempData.CheckPlanDetail = tempData.CheckPlanDetail.concat(
            this.DeleteList
          );
          tempData.userId = this.$store.state.user.userId;
          UpdateCheckPlan(tempData).then(res => {
            if (res.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: res.data.message,
                type: "success",
                duration: 3000
              });
              this.getList();
              this.editVisible = false;
            } else {
              this.$notify({
                position: "bottom-right",
                title: "失败",
                message: res.data.message,
                type: "error",
                duration: 3000
              });
            }
          });
        }
      });
    },
    GetOptions() {
      let temp2 = {
        ParentCode: "SSQY"
      };
      GetOptions(temp2).then(res => {
        if (res.data.code === 2000) {
          this.areaOptions = res.data.items;
        }
      });
    }
  },
  mounted() {
    this.getList();
    this.GetOptions();
  }
};
</script>



<style lang="scss" scoped>
</style>


