
<template>
  <div id="CSSHDA" class="app-container calendar-list-container">
    <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-input
            placeholder="业主姓名"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQuery.ZHXM"
          ></el-input>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <!-- <el-input placeholder="业主类型" style="width:95%;" size="mini" clearable></el-input> -->
          <!-- <el-select
            v-model="listQuery.FWSX"
            size="mini"
            style="width:95%;"
            placeholder="房屋使用类型"
            clearable
            filterable
          >
            <el-option
              v-for="(item,key) in usedOptions"
              :key="key"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>-->
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
            <el-table-column align="center" prop="FWBH" label="房屋编号" fixed="left"></el-table-column>
            <el-table-column align="right" prop="FWMC" label="房屋名称" fixed="left"></el-table-column>
            <el-table-column align="right" prop="Name" label="隶属分公司" fixed="left"></el-table-column>
            <el-table-column align="right" prop="SHOPBH" label="商户编号"></el-table-column>
            <el-table-column align="right" prop="SHOP_NAME" label="商户名称"></el-table-column>
            <el-table-column align="right" prop="ZHXM" label="租户姓名"></el-table-column>
            <el-table-column align="right" prop="SFZH" label="身份证号" show-overflow-tooltip></el-table-column>
            <el-table-column align="right" prop="MOBILE_PHONE" label="租户手机"></el-table-column>
            <el-table-column align="right" prop="TELEPHONE" label="租户固话"></el-table-column>
            <el-table-column align="right" prop="JYNR" label="经营内容"></el-table-column>
            <el-table-column align="right" prop="IS_PASS" label="审核状态">
              <template slot-scope="scope">{{scope.row.IS_PASS|ChangeIS_PASS}}</template>
            </el-table-column>

            <el-table-column align="center" width="300" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row,0)">查看详情</el-button>
                <el-button
                  type="success"
                  size="mini"
                  v-if="scope.row.IS_PASS==0"
                  @click="handleUpdate(scope.row,1)"
                >审核通过</el-button>
                <el-button
                  type="warning"
                  v-if="scope.row.IS_PASS==1"
                  size="mini"
                  @click="unpass(scope.row)"
                >取消审核</el-button>
                <el-button type="danger" size="mini" @click="EndLease(scope.row)">终止租赁</el-button>
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
    <el-dialog
      :visible.sync="editVisible2"
      class="selecttrees"
      title="商户详情"
      width="75%"
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
          <el-card style="margin-top:20px;">
            <div slot="header">
              <span>房屋信息</span>
            </div>
            <div>
              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="房屋编号">
                    <el-input v-model="temp.FWBH" disabled></el-input>
                    <!-- <el-button
                      size="small"
                      type="primary"
                      @click="GetHouseInfo"
                      style="width:28%;margin-left:1%;"
                    >选择房屋</el-button>-->
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="房屋名称">
                    <el-input size="small" v-model="temp.FWMC" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="隶属分公司">
                    <el-input v-model="temp.Name" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="房屋面积">
                    <el-input size="small" v-model="temp.JZMJ" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="坐落位置">
                    <el-input size="small" v-model="temp.ZLWZ" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card style="margin-top:20px;">
            <div slot="header">
              <span>租户信息</span>
            </div>
            <div>
              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="租户姓名">
                    <el-input size="small" v-model="temp.ZHXM" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="租户类型">
                    <el-select style="width:100%" size="small" v-model="temp.ZHLX" disabled>
                      <el-option value="0" label="个人"></el-option>
                      <el-option value="1" label="公司"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="租户性别">
                    <el-select style="width:100%" size="small" v-model="temp.ZHXB" disabled>
                      <el-option value="0" label="男"></el-option>
                      <el-option value="1" label="女"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="身份证号">
                    <el-input size="small" v-model="temp.SFZH" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="手机号码">
                    <el-input size="small" v-model="temp.MOBILE_PHONE" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="固定电话">
                    <el-input size="small" v-model="temp.TELEPHONE" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="电子邮箱">
                    <el-input size="small" v-model="temp.E_MAIL" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="商户编号">
                    <el-input size="small" v-model="temp.SHOPBH" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="商户名称">
                    <el-input size="small" v-model="temp.SHOP_NAME" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <el-form-item label="经营内容" prop="JYNR">
                    <el-input v-model="temp.JYNR" type="textarea" :rows="3" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>
          <el-card style="margin-top:20px;">
            <div slot="header">
              <span>物业信息</span>
            </div>
            <el-row>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item label="物业费缴纳方式">
                  <el-select style="width:100%" size="small" v-model="temp.WYJFFS" disabled>
                    <el-option value="0" label="半年"></el-option>
                    <el-option value="1" label="一年"></el-option>
                    <el-option :value="2" label="全部"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item label="物业费标准">
                  <el-input size="small" v-model="temp.WYDJ" disabled>
                    <template slot="append">元/平/月</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item label="物业基准日期">
                  <el-date-picker style="width:100%" size="mini" v-model="temp.WYJZSJ" disabled></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
        <div style="text-align:center;margin-top:10px;">
          <el-button type="primary" v-if="dialogStatus==='pass'" @click="pass">审核通过</el-button>
          <el-button @click="editVisible2 = false">取消</el-button>
        </div>
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
  GetShopInfoDetail,
  GetShopInfo,
  PassInfo,
  UnpassInfo,
  EndLease
} from "@/app_src/api/SHDAGL/SHOPDA";
import { GetOptions } from "@/app_src/api/commonApi";
export default {
  name: "CSSHDA",
  directives: {
    waves
  },
  //   components: {
  //     Treeselect
  //   },
  data() {
    return {
      editVisible2: false,
      usedOptions: [
        {
          value: "0",
          name: "出租"
        },
        {
          value: "1",
          name: "出售"
        }
      ],
      listQuery: {
        limit: 10,
        page: 1,
        ZHXM: "",
        IS_PASS: "",
        FWSX: 2,
        FWID: ""
      },
      temp: {
        //以下是房屋字段
        FWID: "",
        FWMC: "",
        FWBH: "",
        Name: "",
        JZMJ: "",
        ZLWZ: "",
        OLDID: "",
        //以下是物业信息
        FEE_ID: "",
        WYJFFS: "",
        WYJZSJ: "",
        WYJZ: "",
        WYDJ: "",
        //以下是商户信息
        CZ_SHID: "",
        ZHXM: "",
        ZHLX: "",
        ZHXB: "",
        SFZH: "",
        MOBILE_PHONE: "",
        TELEPHONE: "",
        E_MAIL: "",
        SHOPBH: "",
        SHOP_NAME: "",
        JYNR: "",
        IS_SUBLET: 0,
        //以下是租赁信息
        LEASE_ID: "",
        ZLKSSJ: "",
        ZLZZSJ: "",
        ZLZE: "",
        ZLYJ: "",
        ZLYS: "",
        //以下是基础信息
        userId: this.$store.state.user.userId,
        userType: 1 //出租用户
      },
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
      PAY_WAYOPTIONS: [],
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
      taxofficeoptions: [], //税务机关
      orgregionoptions: [], //机关所在地
      taxcodeoptions: [], //税号
      responsibilityoptions: [], //责任中心

      textMap: {
        update: "修改房屋信息",
        create: "添加房屋信息",
        pass: "审核商铺信息"
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
        FWID: "",
        FWMC: "",
        FWBH: "",
        Name: "",
        JZMJ: "",
        ZLWZ: "",
        OLDID: "",
        //以下是物业信息
        FEE_ID: "",
        WYJFFS: "",
        WYJZSJ: "",
        WYJZ: "",
        WYDJ: "",
        //以下是商户信息
        CZ_SHID: "",
        ZHXM: "",
        ZHLX: "",
        ZHXB: "",
        SFZH: "",
        MOBILE_PHONE: "",
        TELEPHONE: "",
        E_MAIL: "",
        SHOPBH: "",
        SHOP_NAME: "",
        JYNR: "",
        IS_SUBLET: 0,
        //以下是租赁信息
        LEASE_ID: "",
        ZLKSSJ: "",
        ZLZZSJ: "",
        ZLZE: "",
        ZLYJ: "",
        ZLYS: "",
        //以下是基础信息
        userId: this.$store.state.user.userId,
        userType: 1
      };
    },
    getList() {
      this.listLoading = true;
      GetShopInfo(this.listQuery).then(response => {
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

    handleCreate() {
      this.resetTemp();
      // this.editVisible = true;
      // this.dialogStatus = "create";
      // if (this.$refs["dataForm"] !== undefined) {
      //   this.$refs["dataForm"].resetFields();
      // }
      this.$router.push({ path: "/SHDAGL/CZDAEDIT" });
    },
    handleUpdate(row, type) {
      let temp = {
        CZ_SHID: row.CZ_SHID
      };
      GetShopInfoDetail(temp).then(res => {
        if (res.data.code === 2000) {
          this.temp = res.data.items[0];
        }
      });
      if (type == 0) {
        this.dialogStatus = "update";
      } else {
        this.dialogStatus = "pass";
      }
      // this.temp = Object.assign({}, row); // copy obj
      this.editVisible2 = true;

      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
      // this.$router.push({ path: "/SHDAGL/CZDAEDIT" });
    },
    handleDelete(row) {
      if (row.SFQF == 0) {
        this.$confirm("确认终止租赁吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // row.SHZT="待审核"
            // this.getList();
            //   const query = { S_ID: row.S_Id };
            //   deleteTaxOrg(query).then(response => {
            //     this.message = response.data.message;
            //     this.title = "失败";
            //     this.type = "error";
            //     if (response.data.code === 2000) {
            //       // const index = this.list.indexOf(row)
            //       // this.list.splice(index, 1)
            //this.getList();
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
      } else {
        this.$confirm("该商户存在欠缴记录，是否确认终止租赁", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
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
      }
    },
    pass() {
      let temp = {
        CZ_SHID: this.temp.CZ_SHID
      };
      PassInfo(temp).then(res => {
        if (res.data.code === 2000) {
          this.$notify({
            position: "bottom-right",
            title: "成功",
            message: res.data.message,
            type: "success",
            duration: 3000
          });
          this.editVisible2 = false;
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
    unpass(row) {
      this.$confirm("确认取消审核吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let temp = {
          CZ_SHID: row.CZ_SHID
        };
        UnpassInfo(temp).then(res => {
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
      });
    },
    EndLease(row) {
      this.$confirm(
        "您确定解除编号为" +
          row.FWBH +
          "的租赁关系吗?解除后，商户的信息以及租赁物业信息等都将消失！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        let temp = {
          FWID: row.FWID,
          CZ_SHID: row.CZ_SHID
        };
        EndLease(temp).then(res => {
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
    GetOptions() {
      let temp = {
        ParentCode: "PAY_WAY"
      };
      GetOptions(temp).then(res => {
        if (res.data.code === 2000) {
          this.PAY_WAYOPTIONS = res.data.items;
        }
      });
    }
  },
  created() {
    this.listLoading = false;
    this.getList();
    this.GetOptions();
  },
  filters: {
    ChangeIS_PASS(val) {
      if (val === 0) {
        return "未审核";
      } else {
        return "已通过";
      }
    }
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
#CZSHDA {
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

