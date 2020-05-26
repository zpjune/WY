<template>
  <div id="NDJCJH" class="app-container calendar-list-container">
    <el-row style="margin-bottom:10px;">
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
          placeholder="任务名称"
          style="width:95%;"
          size="mini"
          clearable
          v-model="listQuery.RWMC"
        ></el-input>
      </el-col>
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
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">查询</el-button>
        <!-- <el-button type="primary" icon="el-icon-document" size="mini">导出</el-button> -->
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
          <el-table-column label="任务编号" prop="RWBH" fixed="left" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="任务名称" prop="RWMC" fixed="left" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="任务开始时间" prop="RWKSSJ" fixed="left" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="任务结束时间" prop="RWJSSJ" fixed="left" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="任务范围" prop="Name" align="center" show-overflow-tooltip ></el-table-column>
          <el-table-column label="应查任务总数" prop="total" align="center" show-overflow-tooltip ></el-table-column>
          <el-table-column label="已完成数量" prop="complete" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="未完成数量" prop="incomplete" align="center" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column align="center" width="280" label="操作" fixed="right">
              <template slot-scope="scope">

                <el-button type="primary"  size="mini"  v-if="scope.row.TASK_STATE=='0'" @click="handleUpdate(scope.row)">修改</el-button>
                <el-button type="danger"  size="mini"  v-if="scope.row.TASK_STATE=='0'" @click="handleDelete(scope.row)">删除</el-button>
                <el-button type="success" v-if="scope.row.TASK_STATE=='0'" size="mini">任务下发</el-button>
                   <el-button type="info"  v-if="scope.row.TASK_STATE=='1'" @click="handleDetail(scope.row)"  size="mini" >查看详情</el-button>
              </template>
          </el-table-column>-->
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
    >
      <el-card>
        <el-form ref="dataForm" :model="temp" label-width="120px" style="width: 99%;">
          <el-row>
            <!-- <el-col :span="12">
             <el-form-item label="计划年度" prop="SQSJ">
              <el-date-picker
                 type="year"
                placeholder="选择年度"
                v-model="temp.JHND"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            </el-col>-->
            <el-col :span="12">
              <el-form-item label="任务编号" prop="RWBH">
                <el-input v-model="temp.RWBH"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务名称" prop="RWMC">
                <el-input v-model="temp.RWMC"></el-input>
              </el-form-item>
              <!-- <el-form-item label="费用项目" prop="FYXM">
                    <el-select size="mini" style="width:100%;" v-model="temp.FYXM">
                      <el-option
                        v-for="(item,key) in selectOptions"
                        :key="key"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
              </el-form-item>-->
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务开始时间" prop="RWKSSJ">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="temp.RWKSSJ"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务结束时间" prop="RWJSSJ">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="temp.RWJSSJ"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务范围" prop="NAME">
                <el-select v-model="value1" multiple placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="REMARK">
                <el-input v-model="temp.REMARK"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="报销金额" prop="BXJE">
                <el-input v-model="temp.BXJE"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额大写" prop="BXJEDX">
                <el-input v-model="temp.BXJEDX"></el-input>
              </el-form-item>
            </el-col>
          </el-row>-->
          <el-row>
            <el-col :span="24">
              <el-form-item label="任务内容" prop="RWNR">
                <el-input v-model="temp.RWNR" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="预借差旅费" prop="YJCLF">
                <el-input v-model="temp.YJCLF"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应退补金额" prop="YTBJE">
                <el-input v-model="temp.YTBJE"></el-input>
              </el-form-item>
            </el-col>
          </el-row>-->
        </el-form>
        <div style="text-align:center">
          <el-button @click="editVisible = false">取消</el-button>
          <!-- <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-else type="primary" @click="updateData">保存</el-button>-->
        </div>
      </el-card>
    </el-dialog>
    <el-dialog
      :visible.sync="detailVisible"
      class="selecttrees"
      :title="textMap[dialogStatus]"
      width="1000px"
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
  </div>
</template>

<script>
import { GetTaskProcessInfo } from "@/app_src/api/RCGZ/JCJGCX";
export default {
  name: "NDJCJH",
  data() {
    return {
      options: [
        {
          value: "A区",
          label: "A区"
        },
        {
          value: "B区",
          label: "B区"
        },
        {
          value: "C区",
          label: "C区"
        },
        {
          value: "D区",
          label: "D区"
        }
      ],
      listQuery: {
        year: "",
        RWBH: "",
        RWMC: "",
        page: 1,
        limit: 10
      },
      total: 0,
      value1: [],
      value2: [],
      infiledList: [],
      detailVisible: false,
      workFlowVisible: false,
      fildtps: [
        { text: "消防", value: "1" },
        { text: "安全", value: "2" }
      ],
      textMap: {
        update: "修改检查任务",
        create: "添加检查任务",
        detail: "查看检查任务"
      },
      temp: {
        RWBH: "",
        RWMC: "",
        RWKSSJ: "",
        RWJSSJ: "",
        RWNR: "",
        RWFW: "",
        REMARK: "",
        TASK_STATE: ""
      },
      editVisible: false,
      dialogStatus: "",
      listloading: false,
      list: [
      ]
    };
  },
  methods: {
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.editVisible = true;
      this.dialogStatus = "update";
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDetail(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.detailVisible = true;
      this.dialogStatus = "detail";
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    getList() {
      this.listLoading = true;
      GetTaskProcessInfo(this.listQuery).then(response => {
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
        REMARK: ""
      };
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
    handleSizeChange() {},
    handleCurrentChange() {},
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
    getYear() {
      let date = new Date();
      let year = date.getFullYear();
      this.listQuery.year = year.toString();
    }
  },
  mounted() {
    this.getYear();
    this.getList();
  }
};
</script>



<style lang="scss" scoped>
</style>


