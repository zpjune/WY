<template>
  <div id="NDJCJH" class="app-container calendar-list-container">
    <el-row style="margin-bottom:10px;">
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-input placeholder="计划名称" style="width:95%;" size="mini" clearable></el-input>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-button type="primary" icon="el-icon-search" size="mini">查询</el-button>
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
          <el-table-column label="计划年度" prop="JHND"  ></el-table-column>
          <el-table-column label="计划名称" prop="JHMC" ></el-table-column>
          <el-table-column label="计划说明" prop="JHSM" ></el-table-column>
          <el-table-column label="计划时间" prop="JHSJ" ></el-table-column>
          <el-table-column label="备注" prop="REMARK" ></el-table-column>
          <!-- <el-table-column label="出差事由" prop="CCSY"></el-table-column>
          <el-table-column label="出差开始时间" prop="CCKSSJ"></el-table-column>
          <el-table-column label="出差结束时间" prop="CCJSSJ"></el-table-column>
          <el-table-column label="出差天数" prop="CCTS"></el-table-column>
          <el-table-column label="报销金额" prop="BXJE"></el-table-column>
          <el-table-column label="报销金额(大写)" prop="BXJEDX"></el-table-column>
          <el-table-column label="预借差旅费" prop="YJCLF"></el-table-column>
          <el-table-column label="应退补金额" prop="YTBJE"></el-table-column> -->
          <el-table-column align="center" width="230" label="操作" fixed="right">
              <template slot-scope="scope">
                <!-- <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button> -->
                <el-button type="primary"  size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                <el-button type="danger"  size="mini" @click="handleDelete(scope.row)">删除</el-button>
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
          :total="1"
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
            <el-col :span="12">
             <el-form-item label="计划年度" prop="JHND">
              <el-date-picker
                 type="year"
                placeholder="选择年度"
                v-model="temp.JHND"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计划名称" prop="JHMC">
                <el-input v-model="temp.JHMC"></el-input>
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
                  </el-form-item> -->
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
          </el-row> -->
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="REMARK">
                <el-input v-model="temp.REMARK" type="textarea" :rows="3"></el-input>
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
          </el-row> -->
    <el-row>
                 <el-col :span="24">
    <el-form :model="inServForm" ref="inServForm" label-width="130px" size="mini" highlight-current-row border >
      <el-form-item label="计划内容" prop="servin">
        <el-button type="primary" @click="addRow(infiledList)">添加</el-button>

        <el-table :data="infiledList" size="mini"  highlight-current-row border  style="width: 100%" >
          <el-table-column prop="fildna" label="区域" >
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.fildna"></el-input>
            </template>
          </el-table-column>
           <el-table-column prop="fildna" label="检查内容" >
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.fildnasl"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="fildtp" label="检查类型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.fildtp" clearable>
                <el-option
                  v-for="(item,index) in fildtps"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="排查次数">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.remark"></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="primary"  size="mini" >修改</el-button>
              <el-button type="danger" 
                @click.native.prevent="deleteRow(scope.$index, infiledList)"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
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
export default {
  name: "NDJCJH",
  data() {
    return {
            infiledList: [],
            workFlowVisible:false,
      fildtps: [{ text: "消防", value: "1" }, { text: "安全", value: "2" }],
         textMap: {
        update: "修改年度计划",
        create: "添加年度计划"
      },
            temp: {
        JHND:"",
        JHMC:"",
        JHSM:"",
        JHSJ:"",
        REMARK:""
      },
      editVisible: false,
      dialogStatus: "",
      listloading: false,
      fac: [
        {
          JHND:"2018",
JHMC:"2018年检查工作计划",
JHSM:"针对辖区内存在的安全隐患进行排查",
JHSJ:"2018-01-10",
REMARK:""
        },
        {
          JHND:"2019",
JHMC:"2019年检查工作计划",
JHSM:"针对辖区内存在的安全隐患进行排查",
JHSJ:"2019-01-11",
REMARK:""
        },
        {
          JHND:"2018",
JHMC:"2018年检查工作计划",
JHSM:"针对辖区内存在的安全隐患进行排查",
JHSJ:"2018-01-10",
REMARK:""
        },
        {
          JHND:"2019",
JHMC:"2018年检查工作计划",
JHSM:"针对辖区内存在的安全隐患进行排查",
JHSJ:"2019-02-10",
REMARK:""
        }
      ]
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

        handleCreate() {
      this.resetTemp();
      this.editVisible = true;
      this.dialogStatus = "create";
      if (this.$refs["dataForm"] !== undefined) {
        this.$refs["dataForm"].resetFields();
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.editVisible = true;
      this.dialogStatus = "update";
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
      getList() {
      //   this.listLoading = true;
      //   getTaxOrgList(this.listQuery).then(response => {
      //     if (response.data.code === 2000) {
      //       this.list = response.data.items;
      this.total = 15;
      //       this.listLoading = false;
      //     } else {
      //       this.listLoading = false;
      //       this.$notify({
      //         position: "bottom-right",
      //         title: "失败",
      //         message: response.data.message,
      //         type: "error",
      //         duration: 2000
      //       });
      //     }
      //   });
    },

      resetTemp() {
      this.temp = {
        JHND:"",
        JHMC:"",
        JHSM:"",
        JHSJ:"",
        REMARK:""
      };
    },
    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    handleProcess()
    {
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
  }
};
</script>



<style lang="scss" scoped>
</style>


