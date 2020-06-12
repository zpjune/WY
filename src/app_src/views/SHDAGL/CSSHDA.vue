
<template>
  <div id="CZSHDA" class="app-container calendar-list-container">
    <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-input
            placeholder="房屋编号"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQuery.FWBH"
          ></el-input>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-input
            placeholder="租户姓名"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQuery.ZHXM"
          ></el-input>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
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

        <el-col :xs="14" :sm="14" :md="14" :lg="10" :xl="10">
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
            <el-table-column
              align="center"
              prop="FWBH"
              label="房屋编号"
              fixed="left"
              show-overflow-tooltip
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="FWMC"
              label="房屋名称"
              fixed="left"
              show-overflow-tooltip
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="Name"
              width="120"
              label="隶属分公司"
              fixed="left"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column align="center" prop="SHOPBH" label="商户编号" show-overflow-tooltip></el-table-column>
            <el-table-column
              align="center"
              prop="SHOP_NAME"
              label="商户名称"
              show-overflow-tooltip
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="ZHXM"
              label="租户姓名"
              show-overflow-tooltip
              width="120"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="SFZH"
              label="身份证号"
              show-overflow-tooltip
              width="200"
            ></el-table-column>
            <el-table-column align="center" prop="MOBILE_PHONE" label="租户手机" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="TELEPHONE" label="租户固话" show-overflow-tooltip></el-table-column>
            <el-table-column
              align="center"
              prop="JYNR"
              label="经营内容"
              show-overflow-tooltip
              width="200"
            ></el-table-column>
            <el-table-column align="center" prop="IS_PASS" label="审核状态">
              <template slot-scope="scope">{{scope.row.IS_PASS|ChangeIS_PASS}}</template>
            </el-table-column>

            <el-table-column align="left" width="300" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleDetail(scope.row,0)">查看详情</el-button>
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
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="装修押金" prop="ZXYJ">
                    <el-input size="small" v-model="temp.ZXYJ" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="缴费时间">
                    <el-date-picker
                      style="width:100%"
                      size="mini"
                      v-model="temp.ZXYJJFSJ"
                      value-format="yyyy-MM-dd"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="退费时间">
                    <el-date-picker
                      style="width:100%"
                      size="mini"
                      v-model="temp.ZXYJTFSJ"
                      value-format="yyyy-MM-dd"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="消防保证金" prop="XFBZJ">
                    <el-input size="small" v-model="temp.XFBZJ" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="缴费时间">
                    <el-date-picker
                      style="width:100%"
                      size="mini"
                      v-model="temp.XFBZJJFSJ"
                      value-format="yyyy-MM-dd"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="退费时间">
                    <el-date-picker
                      style="width:100%"
                      size="mini"
                      v-model="temp.XFBZJTFSJ"
                      value-format="yyyy-MM-dd"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="违约保证金">
                    <el-input size="small" v-model="temp.WYBZJ" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="缴费时间">
                    <el-date-picker
                      style="width:100%"
                      size="mini"
                      v-model="temp.WYBZJJFSJ"
                      value-format="yyyy-MM-dd"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="退费时间">
                    <el-date-picker
                      style="width:100%"
                      size="mini"
                      v-model="temp.WYBZJTFSJ"
                      value-format="yyyy-MM-dd"
                      disabled
                    ></el-date-picker>
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
                  <el-input style="width:100%" size="small" v-model="temp.NAME2" disabled></el-input>
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
                  <el-date-picker
                    style="width:100%"
                    size="mini"
                    v-model="temp.WYJZSJ"
                    disabled
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="物业费备注">
                  <el-input size="small" v-model="temp.REMARK" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <el-card style="margin-top:20px;">
            <div slot="header">
              <span>租赁信息</span>
            </div>
            <div>
              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="租赁起始日期">
                    <el-date-picker
                      style="width:100%"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      size="small"
                      v-model="temp.ZLKSSJ"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="租赁终止日期">
                    <el-date-picker
                      style="width:100%"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      size="small"
                      v-model="temp.ZLZZSJ"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="租赁总额">
                    <el-input size="small" v-model="temp.ZLZE" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="租赁押金">
                    <el-input size="small" v-model="temp.ZLYJ" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item label="租赁月数">
                    <el-input size="small" v-model="temp.ZLYS" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-input style="width:100%" size="small" v-model="temp.NAME1" disabled></el-input>
                </el-col>
              </el-row>
            </div>
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
import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
import {
  GetShopInfo,
  DeleteShopInfo,
  ExportShopInfo,
  GetShopInfoDetail
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
      temp: {},
      dialogStatus: "",
      editVisible2: false,
      listLoading: false,
      listQuery: {
        ORG_CODE: this.$store.state.user.orgCode,
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
      fileList: []
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
    handleDetail(row, type) {
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
      this.editVisible2 = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
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
      let temp = {
        FWSX: 2
      };
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

