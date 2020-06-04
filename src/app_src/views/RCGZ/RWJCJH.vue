<template>
  <div id="NDJCJH" class="app-container calendar-list-container">
    <el-row style="margin-bottom:10px;">
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-input
          placeholder="任务编号"
          style="width:95%;"
          size="mini"
          clearable
          v-model="listQuery.RWBH"
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
          :data="fac"
          :header-cell-class-name="tableRowClassName"
          v-loading="listloading"
          element-loading-text="给我一点时间"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column
            label="任务编号"
            align="center"
            prop="RWBH"
            fixed="left"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="任务名称"
            align="center"
            prop="RWMC"
            fixed="left"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="任务开始时间"
            align="center"
            prop="RWKSSJ"
            fixed="left"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="任务结束时间"
            align="center"
            prop="RWJSSJ"
            fixed="left"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="任务内容" align="center" prop="RWNR"></el-table-column>
          <el-table-column label="任务范围" align="center" prop="NAME" show-overflow-tooltip></el-table-column>
          <el-table-column label="备注" align="center" prop="REMARK" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" label="详情" fixed="right" min-width="100">
            <template slot-scope="scope">
              <el-button type="info" @click="handleDetail(scope.row)" size="mini">查看详情</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right" min-width="120">
            <template slot-scope="scope">
              <!-- <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>-->
              <el-button
                type="primary"
                size="mini"
                @click="handleUpdate(scope.row)"
                v-if="scope.row.IS_PUSH==0"
              >修改</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handleDelete(scope.row)"
                v-if="scope.row.IS_PUSH==0"
              >删除</el-button>
              <!-- <el-button
                type="success"
                v-if="scope.row.IS_PUSH==0"
                size="mini"
                @click="push(scope.row)"
              >推送</el-button>
              <el-button type="success" v-else-if="scope.row.IS_PUSH==1" size="mini">已推送</el-button>-->
              <!-- <el-button type="primary" v-if="scope.row.IS_PUSH=='2'" size="mini">执行情况</el-button> -->
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
          label-width="120px"
          style="width: 100%;"
          :rules="rules"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="年度计划">
                <el-input v-model="temp.JHMC" disabled style="width:89%;"></el-input>
                <el-button
                  size="small"
                  type="primary"
                  @click="ShowCheckPlan"
                  style="width:10%;"
                >选择计划</el-button>
              </el-form-item>
              <el-form-item label="计划明细" prop="PLAN_DETAIL_ID">
                <el-row>
                  <el-col>
                    <el-button
                      type="primary"
                      icon="el-icon-search"
                      size="mini"
                      @click="GetAllCheckPlanDetail"
                      style="float:right"
                    >查询</el-button>
                  </el-col>
                </el-row>
                <span style="display:none">{{temp.PLAN_DETAIL_ID}}</span>
                <el-row>
                  <el-table
                    :data="list3"
                    size="mini"
                    :header-cell-class-name="tableRowClassName"
                    element-loading-text="给我一点时间"
                    border
                    fit
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                    ref="multipleTable"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <!-- <el-table-column align="center" label="选择" width="50px">
                      <template slot-scope="scope">
                        <el-radio
                          class="radio"
                          v-model="radio1"
                          :label="scope.$index"
                          @change="selectCheckPlanDetail(scope.row)"
                        >&nbsp;</el-radio>
                      </template>
                    </el-table-column>-->
                    <el-table-column label="检查区域" prop="ALLPLACENAME" show-overflow-tooltip></el-table-column>
                    <el-table-column label="检查内容" :show-overflow-tooltip="true" prop="JCNR"></el-table-column>
                    <el-table-column prop="JCNAME" label="检查类型" show-overflow-tooltip></el-table-column>
                    <el-table-column label="年度检查次数" prop="PCCS" show-overflow-tooltip></el-table-column>
                    <el-table-column label="已创建任务次数" prop="ZXCS" show-overflow-tooltip></el-table-column>
                  </el-table>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务编号">
                <el-input v-model="temp.RWBH" :readonly="true" placeholder="自动生成"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务名称" prop="RWMC">
                <el-input v-model="temp.RWMC"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务开始时间" prop="RWKSSJ">
                <el-date-picker
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  v-model="temp.RWKSSJ"
                  style="width: 100%;"
                  @change="GetStartTime"
                  :picker-options="StarttimeOptions"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务结束时间" prop="RWJSSJ">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  v-model="temp.RWJSSJ"
                  style="width: 100%;"
                  @change="GetEndTime"
                  :picker-options="EndtimeOptions"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <!-- <el-form-item label="任务范围" prop="RWFW">
                <el-select v-model="temp.RWFW" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>-->
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="备注" >
                <el-input v-model="temp.REMARK"></el-input>
              </el-form-item>
            </el-col>-->
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="任务内容" prop="RWNR">
                <el-input v-model="temp.RWNR" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="temp.REMARK" type="textarea" :rows="2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-if="dialogStatus=='update'" type="primary" @click="updateData">保存</el-button>
        </div>
      </el-card>
    </el-dialog>
    <el-dialog
      :visible.sync="detailVisible"
      class="selecttrees"
      :title="textMap[dialogStatus]"
      width="1000px"
      :close-on-click-modal="false"
    >
      <el-card>
        <el-form ref="dataForm" :model="temp" label-width="120px" style="width: 99%;">
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务编号" prop="RWBH">
                <span>{{temp.RWBH}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务名称" prop="RWMC">
                <span>{{temp.RWMC}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务开始时间" prop="RWKSSJ">
                <span>{{temp.RWKSSJ}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务结束时间" prop="RWJSSJ">
                <span>{{temp.RWJSSJ}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="任务内容" prop="RWNR">
                <span>{{temp.RWNR}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务范围" prop="RWFW">
                <span>{{temp.NAME}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="REMARK">
                <span>{{temp.REMARK}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button type="success" @click="detailVisible = false">确定</el-button>
        </div>
      </el-card>
    </el-dialog>
    <el-dialog
      width="40%"
      :visible.sync="innerVisible"
      title="年度检查计划"
      append-to-body
      @close="close"
      :close-on-click-modal="false"
    >
      <el-card>
        <el-row>
          <el-col :span="5">
            <el-date-picker
              type="year"
              placeholder="选择年度"
              v-model="checkPlanQuery.JHND"
              style="width: 100%;"
              value-format="yyyy"
              size="small"
            ></el-date-picker>
          </el-col>
          <el-col :span="5">
            <el-button @click="GetCheckPlan" type="primary" size="small">搜索</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="list2"
          size="mini"
          @row-click="showRow"
          :header-cell-class-name="tableRowClassName"
          element-loading-text="给我一点时间"
          border
          fit
          highlight-current-row
          style="width: 100%;text-align:left;"
          @expand-change="GetCheckPlanDetail"
        >
          <el-table-column align="center" label="选择" width="50px">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.$index">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="计划年度" prop="JHND"></el-table-column>
          <el-table-column label="计划名称" prop="JHMC"></el-table-column>
          <el-table-column label="计划说明" prop="JHSM"></el-table-column>
          <el-table-column label="计划时间" prop="JHSJ"></el-table-column>
        </el-table>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { GetCheckPlan, GetCheckPlanDetail } from "@/app_src/api/RCGZ/NDJHJC";
import {
  GetTaskInfo,
  DeleteTask,
  CreateTask,
  UpdateTask,
  GetPlanCheckAndDetail,
  PushTask
} from "@/app_src/api/RCGZ/RWJCJH";
import { parseTime } from "@/frame_src/utils";
export default {
  name: "NDJCJH",
  filters: {
    parseTime
  },
  data() {
    return {
      listQuery: {
        RWBH: "",
        RWMC: "",
        page: 1,
        limit: 10
      },
      options: [],
      checkPlanQuery: {
        JHMC: "",
        JHND: "",
        page: 1,
        limit: 10
      },
      CheckPlanList: [],
      value1: [],
      value2: [],
      textMap: {
        update: "修改任务信息",
        create: "添加任务信息"
      },
      radio: "",
      radio1: "",
      total: 0,
      detailVisible: false,
      innerVisible: false,
      innerVisible1: false,
      temp: {
        JHMC: "",
        TASK_ID: "",
        PLAN_DETAIL_ID: "",
        RWBH: "",
        RWMC: "",
        RWKSSJ: "",
        RWJSSJ: "",
        RWNR: "",
        RWFW: "",
        REMARK: "",
        userId: this.$store.state.user.userId
      },
      multipleSelection: [],
      editVisible: false,
      dialogStatus: "",
      listloading: false,
      list2: [],
      list3: [],
      fac: [],
      StarttimeOptions: {},
      EndtimeOptions: {},
      rules: {
        JHMC: [
          {
            required: true,
            message: "请输入计划名称",
            trigger: "change"
          }
        ],
        PLAN_DETAIL_ID: [
          {
            required: true,
            message: "请选择计划明细",
            trigger: "change"
          }
        ],
        RWBH: [
          {
            required: true,
            message: "请输入任务编号",
            trigger: "change"
          }
        ],
        RWMC: [
          {
            required: true,
            message: "请输入任务名称",
            trigger: "change"
          }
        ],
        RWKSSJ: [
          {
            required: true,
            message: "请输入任务开始时间",
            trigger: "change"
          }
        ],
        RWJSSJ: [
          {
            required: true,
            message: "请输入任务结束时间",
            trigger: "change"
          }
        ],
        RWNR: [
          {
            required: true,
            message: "请输入任务内容",
            trigger: "change"
          }
        ],
        RWFW: [
          {
            required: true,
            message: "请输入任务范围",
            trigger: "change"
          }
        ],
        REMARK: [
          {
            required: true,
            message: "请输入备注",
            trigger: "change"
          }
        ],
        PLAN_DETAIL_ID: [
          {
            required: true,
            message: "请选择计划明细",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    GetStartTime() {
      this.EndtimeOptions = {
        disabledDate: time => {
          return time < new Date(this.temp.RWKSSJ);
        }
      };
    },
    GetEndTime() {
      this.StarttimeOptions = {
        disabledDate: time => {
          return time > new Date(this.temp.RWJSSJ);
        }
      };
    },
    showRow(row) {
      //赋值给radio
      this.radio = this.list2.indexOf(row);
      let temp = {
        PLAN_ID: row.PLAN_ID
      };
      GetCheckPlanDetail(temp).then(res => {
        if (res.data.code === 2000) {
          this.list3 = res.data.items;
        }
      });
      this.temp.PLAN_ID = row.PLAN_ID;
      this.temp.JHMC = row.JHMC;
      this.innerVisible = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => item.PLAN_DETAIL_ID);
      if (this.multipleSelection.length > 0) {
        this.temp.PLAN_DETAIL_ID = "已选中";
      } else {
        this.temp.PLAN_DETAIL_ID = "";
      }
    },
    GetAllCheckPlanDetail() {
      let temp = {
        PLAN_ID: this.temp.PLAN_ID
      };
      GetCheckPlanDetail(temp).then(res => {
        if (res.data.code === 2000) {
          this.list3 = res.data.items;
          this.radio1 = "";
          this.PLAN_DETAIL_ID = "";
        }
      });
    },
    selectCheckPlanDetail(row) {
      this.temp.PLAN_DETAIL_ID = row.PLAN_DETAIL_ID;
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
      this.resetTemp();
      this.dialogStatus == "update";
      this.temp = Object.assign({}, row); // copy obj
      let temp = {
        TASK_ID: row.TASK_ID
      };
      GetPlanCheckAndDetail(temp).then(res => {
        if (res.data.code === 2000) {
          this.temp.PLAN_ID = res.data.checkplan[0].PLAN_ID;
          this.temp.JHMC = res.data.checkplan[0].JHMC;
          this.temp.PLAN_DETAIL_ID = res.data.detail[0].PLAN_DETAIL_ID;
          this.list3 = res.data.detail;
          this.$nextTick(() => {
            this.list3.forEach(items => {
              this.$refs.multipleTable.toggleRowSelection(items, true);
            });
          });

          this.radio1 = 0;
        }
      });
      this.editVisible = true;
      this.dialogStatus = "update";
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDetail(row) {
      this.dialogStatus == "";
      this.handleUpdate(row);
    },
    GetCheckPlanDetail(row) {
      let temp = {
        PLAN_ID: row.PLAN_ID
      };
      GetCheckPlanDetail(temp).then(res => {
        if (res.data.code === 2000) {
        }
      });
    },
    ShowCheckPlan() {
      this.innerVisible = true;
      this.getYear();
      this.GetCheckPlan();
    },
    GetCheckPlan() {
      GetCheckPlan(this.checkPlanQuery).then(res => {
        if (res.data.code === 2000) {
          this.list2 = res.data.items;
        }
      });
    },
    close() {
      this.CheckPlanList = [];
    },
    getList() {
      this.listLoading = true;
      GetTaskInfo(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.fac = response.data.items;
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
        PLAN_ID: "",
        JHMC: "",
        TASK_ID: "",
        PLAN_DETAIL_ID: "",
        RWBH: "",
        RWMC: "",
        RWKSSJ: "",
        RWJSSJ: "",
        RWNR: "",
        RWFW: "",
        REMARK: "",
        userId: this.$store.state.user.userId
      };
      this.radio = "";
      this.radio1 = "";
      this.CheckPlanList = [];
      this.multipleSelection = [];
      this.list3 = [];
    },
    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
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
      this.$confirm("确认删除吗!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let temp = {
            TASK_ID: row.TASK_ID
          };
          DeleteTask(temp).then(res => {
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
          let tempData = Object.assign({}, this.temp);
          tempData.PLAN_DETAIL_ARR = this.multipleSelection;
          CreateTask(tempData).then(res => {
            if (res.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: res.data.message,
                type: "success",
                duration: 3000
              });
              this.editVisible = false;
              this.getList();
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
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          let tempData = Object.assign({}, this.temp); // 这样就不会共用同一个对象
          tempData.PLAN_DETAIL_ARR = this.multipleSelection;
          tempData.userId = this.$store.state.user.userId;
          UpdateTask(tempData).then(res => {
            if (res.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: res.data.message,
                type: "success",
                duration: 3000
              });
              this.editVisible = false;
              this.getList();
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
    push(row) {
      let temp = {
        TASK_ID: row.TASK_ID
      };
      PushTask(temp).then(res => {
        if (res.data.code === 2000) {
          this.$notify({
            position: "bottom-right",
            title: "成功",
            message: res.data.message,
            type: "success",
            duration: 3000
          });
          this.getList();
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
    },
    getYear() {
      let date = new Date();
      let year = date.getFullYear();
      this.checkPlanQuery.JHND = year.toString();
    }
  },
  mounted() {
    this.getList();
  }
};
</script>



<style lang="scss" scoped>
</style>


