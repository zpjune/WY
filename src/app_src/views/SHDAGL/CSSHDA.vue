
<template>
  <div id="CZSHDA" class="app-container calendar-list-container">
    <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-input
            placeholder="租户姓名"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQuery.ZHXM"
          ></el-input>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <!-- <el-input placeholder="业主类型" style="width:95%;" size="mini" clearable></el-input> -->
          <el-select
            v-model="listQuery.IS_PASS"
            size="mini"
            style="width:95%;"
            placeholder="审核状态"
            clearable
            filterable
          >
            <el-option
              v-for="(item,key) in usedOptions"
              :key="key"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :xs="14" :sm="14" :md="14" :lg="10" :xl="4">
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
            style="margin-left: 10px;"
            @click="handleCreate"
            type="primary"
            icon="el-icon-edit"
          >新增</el-button>
           <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-upload2"
            size="mini"
            @click="showUpload = true;"
          >导入</el-button>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-download"
            size="mini"
            @click="handleDownload"
          >导出</el-button>
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
            <el-table-column align="center" prop="FWBH" label="房屋编号" show-overflow-tooltip fixed="left"></el-table-column>
            <el-table-column align="right" prop="FWMC" label="房屋名称" show-overflow-tooltip fixed="left"></el-table-column>
            <el-table-column align="right" prop="Name" width="120" label="隶属分公司" show-overflow-tooltip fixed="left"></el-table-column>
            <el-table-column align="right" prop="SHOPBH" label="商户编号" show-overflow-tooltip></el-table-column>
            <el-table-column align="right" prop="SHOP_NAME" label="商户名称" show-overflow-tooltip></el-table-column>
            <el-table-column align="right" prop="ZHXM" label="租户姓名" show-overflow-tooltip></el-table-column>
            <el-table-column align="right" prop="SFZH" label="身份证号" show-overflow-tooltip></el-table-column>
            <el-table-column align="right" prop="MOBILE_PHONE" label="租户手机" show-overflow-tooltip></el-table-column>
            <el-table-column align="right" prop="TELEPHONE" label="租户固话" show-overflow-tooltip></el-table-column>
            <el-table-column align="right" prop="JYNR" label="经营内容" show-overflow-tooltip></el-table-column>
            <el-table-column align="right" prop="IS_PASS" label="审核状态">
              <template slot-scope="scope">{{scope.row.IS_PASS|ChangeIS_PASS}}</template>
            </el-table-column>

            <el-table-column align="center" width="180" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleUpdate(scope.row)"
                  v-if="scope.row.IS_PASS===0"
                >修改</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  v-if="scope.row.IS_PASS==0"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
                <el-button
                  type="success"
                  size="mini"
                  v-if="scope.row.IS_PASS==1"
                  @click="handleXZ(scope.row)"
                >转售</el-button>
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
    <el-dialog :visible.sync="showUpload">
      <el-card class="box-card">
        <div class="filter-container" style="height:80px;">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="urlUpload"
            :auto-upload="false"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :headers="headers"
            :file-list="fileList"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="btnSubmit"
            >导&nbsp;&nbsp;入</el-button>
            <a :href="urldownload" style="text-decoration:underline;">模板下載</a>
          </el-upload>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>



<script>
import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
import {
  GetShopInfo,
  DeleteShopInfo,
  ExportShopInfo
} from "@/app_src/api/SHDAGL/SHOPDA";
const passOptions = [
  { key: 0, type_name: "未通过" },
  { key: 1, type_name: "通过" }
];
const passTypeKeyValue = passOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.type_name;
  return acc;
}, {});
const typeOptions = [
  { key: 0, type_name: "空闲" },
  { key: 1, type_name: "出租" },
  { key: 2, type_name: "出售" }
];
const typeTypeKeyValue = typeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.type_name;
  return acc;
}, {});
export default {
  name: "CZSHDA",
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      usedOptions: [
        {
          value: "0",
          name: "待审核"
        },
        {
          value: "1",
          name: "已审核"
        }
      ],
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
      total: 0,
      listLoading: false,
      listQuery: {
        ORG_CODE:this.$store.state.user.orgCode,
        limit: 10,
        page: 1,
        ZHXM: "",
        IS_PASS: "",
        FWSX: 2,
        FWID: ""
      },
       showUpload: false,
      urlUpload: process.env.BASE_API + "ShopInfo/uploadCSSHOPInfo",
      urldownload: process.env.BASE_API + "WY_API/ExcelModel/出售商户模板.xls",
      fileList:[],
    };
  },
  methods: {
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
     handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleSuccess(res, file, fileList) {
      if (res.code === 2000) {
        this.getList();
        title = "导入成功";
        type = "success";
        this.$notify({
          position: "bottom-right",
          title: title,
          message: message,
          type: type,
          duration: 2000
        });
        this.showUpload = false;
        this.fileList = [];
      } else {
        var message = res.message;
        var title = "导入失败";
        var type = "error";
        this.$notify({
          position: "bottom-right",
          title: title,
          message: message,
          type: type,
          duration: 2000
        });
        this.showUpload = false;
        this.fileList = [];
      }
    },
    btnSubmit() {
      this.$refs.upload.submit();
    },
    handleCreate() {
      this.$router.push({ path: "/SHDAGL/CSDAEDIT" });
    },
    handleUpdate(row) {
      // this.temp = Object.assign({}, row); // copy obj
      // this.editVisible = true;
      // this.dialogStatus = "update";
      // this.$nextTick(() => {
      //   this.$refs["dataForm"].clearValidate();
      // });
      this.$router.push({
        path: "/SHDAGL/CSDAEDIT",
        query: { param: row.CZ_SHID }
      });
    },
    handleXZ(row) {
      this.$router.push({
        path: "/SHDAGL/CSDAZS",
        query: { param: row.CZ_SHID }
      });
    },
    handleDelete(row) {
      this.$confirm("确认删除信息吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let temp = {
            CZ_SHID: row.CZ_SHID,
            FWID: row.FWID
          };
          DeleteShopInfo(temp).then(res => {
            if (res.data.code === 2000) {
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
              this.getList();
            } else {
              this.$notify({
                position: "bottom-right",
                title: "失败 ",
                message: res.data.message,
                type: "error",
                duration: 2000
              });
            }
          });

          //   });
        })
        .catch(() => {});
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
    handleDownload() {
      // 导出
      let temp={
        FWSX:2
      }
      ExportShopInfo(temp).then(res => {
        if (res.data.code === 2000) {
          let list = res.data.items;
          this.downloadLoading = true;
          import("@/frame_src/vendor/Export2Excel").then(excel => {
            const tHeader = [
              "房屋编号",
              "房屋名称",
              "隶属分公司",
              "商户编号",
              "商户名称",
              "商户姓名",
              "身份证号",
              "租户手机",
              "租户固话",
              "经营内容",
              "审核状态"
            ];
            const filterVal = [
              "FWBH",
              "FWMC",
              "Name",
              "SHOPBH",
              "SHOP_NAME",
              "ZHXM",
              "SFZH",
              "MOBILE_PHONE",
              "TELEPHONE",
              "JYNR",
              "IS_PASS"
            ];
            const data = this.formatJson(filterVal, list);
            //console.log(data);
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: "出售商户档案表"
            });
            this.downloadLoading = false;
          });
        } else {
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
          if (j === "FWSX") {
            return typeTypeKeyValue[v[j]];
          } else if (j === "IS_PASS") {
            return passTypeKeyValue[v[j]];
          } else {
            return v[j];
          }
        })
      );
    }
  },
  created() {
    this.listLoading = false;
    this.getList();
  },

  computed: {
    getRoleLevel() {
      if (this.$store.state.user.roleLevel === "admin") {
        return true;
      } else {
        return false;
      }
    },
    headers() {
      return {
        "X-Token": getToken()
      };
    }
  },
  filters: {
    ChangeIS_PASS(val) {
      if (val === 0) {
        return "未审核";
      } else {
        return "已通过";
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
}
</style>

