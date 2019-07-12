<template>
  <div id="NDJCJH" class="app-container calendar-list-container">
    <el-row style="margin-bottom:10px;">
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-input placeholder="任务名称" style="width:95%;" size="mini" clearable></el-input>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
        <el-button type="primary" icon="el-icon-search" size="mini">查询</el-button>
                          <el-button type="primary" icon="el-icon-document" size="mini">导出</el-button>
         <!-- <el-button
            size="mini"
            class="filter-item"
            style="margin-left: 10px;"
            @click="handleCreate"
            type="primary"
            icon="el-icon-edit"
          >新增</el-button> -->

      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-table
          size="mini"
          :data="fac"
          :header-cell-class-name="tableRowClassName"

          element-loading-text="给我一点时间"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column label="房屋编号" prop="FWBH"  ></el-table-column>
          <el-table-column label="房屋名称" prop="FWMC" ></el-table-column>
          <el-table-column label="隶属分公司" prop="LSFGS"></el-table-column>
          <el-table-column label="业主姓名" prop="YZXM"></el-table-column>
          <el-table-column label="业主类型" prop="YZLX" ></el-table-column>
          <el-table-column label="业主手机" prop="YZSJ" ></el-table-column>
          <el-table-column label="业主固话" prop="YZGH" ></el-table-column>
          <el-table-column label="商户状态" prop="SHZT" ></el-table-column>
          <el-table-column align="center" width="280" label="操作" fixed="right">
              <template slot-scope="scope">
                   <el-button type="primary"   @click="handleDetail(scope.row)"  size="mini" >查看详情</el-button>
                  <el-button type="success"  size="mini" @click="handleUpdate(scope.row)">缴费记录</el-button>
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
          <el-table

        :data="list2"
        size="mini"
        :header-cell-class-name="tableRowClassName"

        element-loading-text="给我一点时间"
        border
        fit
        highlight-current-row
        style="width: 100%;text-align:left;"
      >
        <el-table-column align="center" label="开始时间">
          <template slot-scope="scope">
            <span>{{scope.row.KSSJ}}</span>
          </template>
        </el-table-column>

        <el-table-column label="结束时间">
          <template slot-scope="scope">
            <span>{{scope.row.JSSJ}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" prop="SYLX" label="缴费类型">
          <template slot-scope="scope">
            <span>{{scope.row.JFLX}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" prop="LSFGS" label="缴费金额">
          <template slot-scope="scope">
            <span>{{scope.row.JFJE}}</span>
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

        <div style="text-align:center;margin-top:10px">
          <el-button @click="editVisible = false">取消</el-button>

        </div>
      </el-card>
    </el-dialog>
 <el-dialog
      :visible.sync="detailVisible"
      class="selecttrees"
      :title="textMap[dialogStatus]"
      width="1000px"
    >
          <el-form ref="dataForm" :model="temp"  label-width="120px" style="width: 99%;">
       <el-card style="margin-top:20px;">
          <div slot="header">
            <span>商户信息</span>
          </div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="房屋编号">
                  <el-input v-model="temp.FWBH" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房屋名称">
                  <el-input size="small" v-model="temp.FWMC" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="隶属分公司">
                  <el-select style="width:100%" size="small" v-model="temp.LSFGS" disabled>
                    <el-option :value="0" label="分公司1"></el-option>
                    <el-option :value="1" label="分公司2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="房屋面积">
                  <el-input size="small" v-model="temp.JZMJ" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="坐落位置">
                  <el-input size="small" v-model="temp.ZLWZ" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业基准日期">
                  <el-date-picker
                    style="width:100%"
                    format="yyyy-MM-dd"
                    size="small"
                    v-model="temp.JZR"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="商户名称">
                  <el-input size="small" v-model="temp.SHMC"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业费标准">
                  <el-input size="small" v-model="temp.WYFBZ">
                    <template slot="append">元/月</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业缴纳方式">
                  <el-select style="width:100%" size="small" v-model="temp.JNFS">
                    <el-option :value="0" label="半年"></el-option>
                    <el-option :value="1" label="一年"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="经营内容" prop="JYNR">
                  <el-input v-model="temp.JYNR" type="textarea" :rows="3"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card style="margin-top:20px;">
          <div slot="header">
            <span>业主信息</span>
          </div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="业主姓名">
                  <el-input size="small" v-model="temp.YZXM"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业主类型">
                  <el-select style="width:100%" size="small" v-model="temp.YZLX">
                    <el-option :value="0" label="个人"></el-option>
                    <el-option :value="1" label="公司"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业主姓名">
                  <el-input size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号">
                  <el-input size="small" v-model="temp.YZSFZH"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码">
                  <el-input size="small" v-model="temp.YZSJHM"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="固定电话">
                  <el-input size="small" v-model="temp.YZGDDH"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="电子邮箱">
                  <el-input size="small" v-model="temp.YZDZYX"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用类型">
                  <el-select style="width:100%" size="small" v-model="temp.SYLEX">
                    <el-option :value="0" label="自用"></el-option>
                    <el-option :value="1" label="出租"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card style="margin-top:20px;" v-if="temp.SYLEX==1">
          <div slot="header">
            <span>租户信息</span>
          </div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="租户姓名">
                  <el-input size="small" v-model="temp.ZHXM"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="租户类型">
                  <el-select style="width:100%" size="small" v-model="temp.ZHLX">
                    <el-option :value="0" label="个人"></el-option>
                    <el-option :value="1" label="公司"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="租户性别">
                  <el-input size="small" v-model="temp.ZHXM"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号">
                  <el-input size="small" v-model="temp.ZHSFZH"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码">
                  <el-input size="small" v-model="temp.ZHSJHM"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="固定电话">
                  <el-input size="small" v-model="temp.ZHGDHM"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="电子邮箱">
                  <el-input size="small" v-model="temp.ZHDZYX"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
          </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "NDJCJH",
  data() {
    return {

       listQuery: {
        limit: 10,
        page: 1,
        S_OrgCode: null,
        ResponsibilityCenter: "",
        TaxOffice: "",
        ImportModel: "",
        TaxNumber: "",
        OrgRegion: "",
        LSFGS:""
      },
        options: [{
          value: 'A区',
          label: 'A区'
        }, {
          value: 'B区',
          label: 'B区'
        }, {
          value: 'C区',
          label: 'C区'
        }, {
          value: 'D区',
          label: 'D区'
        }],
      total: 15,
         list2: [
        {
          KSSJ: "2015-6-27",
          JSSJ: "2016-6-27",
          JFLX: "物业费",
          JFJE: "2000.00"
        },
        {
          KSSJ: "2017-6-27",
          JSSJ: "2018-6-27",
          JFLX: "物业费",
          JFJE: "2000.00"
        },
        {
          KSSJ: "2015-6-27",
          JSSJ: "2019-6-27",
          JFLX: "房租",
          JFJE: "200000.00"
        }
      ],
        temp: {
        FWBH: "",
        FWMC: "",
        LSFGS: "",
        JZMZ: "",
        ZLWZ: "",
        JZR: "",
        SHMC: "",
        WYFBZ: "",
        JNFS: "",
        JYNR: "",
        YZXM: "",
        YZLX: "",
        YZXB: "",
        YZSFZH: "",
        YZSJH: "",
        YZGD: "",
        YZDZYX: "",
        SYLX: "",
        ZHXM: "",
        ZHLX: "",
        ZHXB: "",
        ZHSFZH: "",
        ZHSJHM: "",
        ZHGD: "",
        ZHDZYX: ""
      },
        value1: [],
        value2: [],
            infiledList: [],
            detailVisible:false,
            workFlowVisible:false,
      fildtps: [{ text: "消防", value: "1" }, { text: "安全", value: "2" }],
         textMap: {
        update: "修改商户信息",
        create: "缴费记录",
        detail:"查看商户信息"
      },
    temp: {
RWBH:"",
RWMC:"",
RWKSSJ:"",
RWJSSJ:"",
RWNR:"",
RWFW:"",
REMARK:"",
TASK_STATE:""
      },
      editVisible: false,
      dialogStatus: "",
      listloading: false,
      fac: [
        {
         FWBH:"A-101",
FWMC:"港新新城",
LSFGS:"物业分公司",
YZXM:"张三",
YZLX:"企业",
YZSJ:"13323422322",
YZGH:"43433322",
SHZT:"正常物业"
        },
        {
         FWBH:"A-101",
FWMC:"港新新城",
LSFGS:"物业分公司",
YZXM:"张三",
YZLX:"企业",
YZSJ:"13323422322",
YZGH:"43433322",
SHZT:"终止物业"
        },
        {
         FWBH:"A-101",
FWMC:"港新新城",
LSFGS:"房地产分公司",
YZXM:"张三",
YZLX:"企业",
YZSJ:"13323422322",
YZGH:"43433322",
SHZT:"正常出租"
        },
        {
         FWBH:"A-101",
FWMC:"港新新城",
LSFGS:"房地产分公司",
YZXM:"张三",
YZLX:"企业",
YZSJ:"13323422322",
YZGH:"43433322",
SHZT:"终止出租"
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
      // this.$nextTick(() => {
      //   this.$refs["dataForm"].clearValidate();
      // });
    },
    handleDetail(row)
    {
      this.temp = Object.assign({}, row); // copy obj
      this.detailVisible = true;
      this.dialogStatus = "detail";
      // this.$nextTick(() => {
      //   this.$refs["dataForm"].clearValidate();
      // });
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
 .page {
    text-align: center;
  }
</style>


