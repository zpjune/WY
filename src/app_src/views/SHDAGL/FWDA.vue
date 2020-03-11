
<template>
  <div id="FWDA" class="app-container calendar-list-container">
    <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-input
            placeholder="房屋名称"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQuery.FWMC"
          ></el-input>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-select
            placeholder="隶属分公司"
            style="width:95%"
            size="mini"
            v-model="listQuery.LSFGS"
            clearable
          >
            <el-option v-for="(item,key) in GSOptions" :key="key" :label="name" :value="Code"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-select
            v-model="listQuery.FWSX"
            size="mini"
            style="width:95%;"
            placeholder="房屋属性"
            clearable
            filterable
          >
            <el-option
              v-for="(item,key) in selectOptions"
              :key="key"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <!-- <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <el-date-picker
            style="width:95%;"
            class="filter-item"
            v-model="dateQuery"
            type="daterange"
            range-separator="~"
            size="mini"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>-->
        <el-col :xs="10" :sm="9" :md="8" :lg="7" :xl="6">
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
            @click="handleCreate"
            type="primary"
            icon="el-icon-edit"
          >新增</el-button>
          <el-button class="filter-item" type="primary" @click="btnImpot" icon="el-icon-upload2" size="mini">导入</el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-download" size="mini">导出</el-button>
        </el-col>
      </el-row>
    </div>
    <el-card>
      <el-row>
        <el-col>
          <div style="text-align:right">
            <!-- <img src="@/app_src/img/free.png" alt class="tableicon" title="空闲"><span style="font-weight:bold;color:gray;">空闲</span>
            <img src="@/app_src/img/rent.png" alt class="tableicon" title="出租"><span style="font-weight:bold;color:gray;">出租</span>
            <img src="@/app_src/img/sale.png" alt class="tableicon" title="出售"><span style="font-weight:bold;color:gray;">出售</span>-->
            <div style="width:70px;height:18px;float:right;margin:2px;">
              <span style="float:right;">出售</span>
              <span
                style="width:30px;height:18px;float:right;display:block;background-color:#67C23A;"
              ></span>
            </div>
            <div style="width:70px;height:18px;float:right;margin:2px;">
              <span style="float:right;">出租</span>
              <span
                style="width:30px;height:18px;float:right;display:block;background-color:#E6A23C;"
              ></span>
            </div>
            <div style="width:70px;height:18px;float:right;margin:2px;">
              <span style="float:right;">空闲</span>
              <span
                style="width:30px;height:18px;float:right;display:block;background-color:#909399;"
              ></span>
            </div>
          </div>
        </el-col>
      </el-row>
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
            :cell-style="cellStyle"
          >
            <el-table-column align="center" label="房屋属性" width="80px"></el-table-column>
            <el-table-column align="center" label="房屋编号">
              <template slot-scope="scope">
                <span>{{scope.row.FWBH}}</span>
              </template>
            </el-table-column>

            <el-table-column label="房屋名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.FWMC}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="JZMJ" label="建筑面积">
              <template slot-scope="scope">
                <span>{{scope.row.JZMJ}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="LSFGS" label="隶属分公司">
              <template slot-scope="scope">
                <span>{{scope.row.LSFGS}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="ZLWZ" label="坐落位置">
              <template slot-scope="scope">
                <span>{{scope.row.ZLWZ}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="FZFJE" label="结构类型">
              <template slot-scope="scope">
                <span>{{scope.row.JGLX }}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="WYFJE" label="资产原值">
              <template slot-scope="scope">
                <span>{{scope.row.ZCYZ |NumFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="WYFJE" label="总房款">
              <template slot-scope="scope">
                <span>{{scope.row.ZFK |NumFormat}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="260" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                <el-button type="success" size="mini" @click="handleCondition(scope.row)">使用情况</el-button>
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
      :visible.sync="editVisible"
      class="selecttrees"
      :title="textMap[dialogStatus]"
      width="1000px"
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
              <el-form-item label="房屋编号" prop="FWBH">
                <el-input v-model="temp.FWBH"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋名称" prop="FWMC">
                <el-input v-model="temp.FWMC"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="建筑面积" prop="JZMJ">
                <el-input v-model="temp.JZMJ"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="隶属分公司" prop="LSFGS">
                <!-- <el-input v-model="temp.LSFGS"></el-input> -->
                <el-select
                  placeholder="隶属分公司"
                  style="width:95%"
                  size="small"
                  v-model="temp.LSFGS"
                  clearable
                >
                  <el-option v-for="(item,key) in GSOptions" :key="key" :label="name" :value="Code"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="坐落位置" prop="ZLWZ">
                <el-input v-model="temp.ZLWZ" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="结构类型" prop="JGLX">
                <el-select
                  placeholder="结构类型"
                  style="width:95%"
                  size="small"
                  v-model="temp.JGLX"
                  clearable
                >
                  <el-option v-for="(item,key) in JGOptions" :key="key" :label="name" :value="Code"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="资产原值" prop="ZCYZ">
                <el-input v-model="temp.ZCYZ"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="总房款" prop="ZFK">
                <el-input v-model="temp.ZFK"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电表号" prop="ELE_NUMBER">
                <el-input v-model="temp.ELE_NUMBER"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="水表号" prop="WATER_NUMBER">
                <el-input v-model="temp.WATER_NUMBER"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="房屋属性" prop="FWSX">
                <el-select  style="width:100%;" v-model="temp.FWSX">
                  <el-option
                    v-for="(item,key) in selectOptions"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>-->
            <el-col :span="12">
              <el-form-item label="所属区域" prop="FWSX">
                <el-select style="width:100%;" v-model="temp.SSQY">
                  <el-option
                    v-for="(item,key) in areaOptions"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="24">
            <el-form-item label="平面图" prop="PMT">
              <el-upload
                :action="UploadURL"
                list-type="picture-card"
                :auto-upload="true"
                :on-success="GetUrl"
                :headers="headers"
                :file-list="temp.PMT"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" title="图片预览">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-form>
        <div style="text-align:center">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-else type="primary" @click="updateData">保存</el-button>
        </div>
      </el-card>
    </el-dialog>
    <el-dialog :visible.sync="editVisible2" class="selecttrees" title="商户详情" width="1000px">
      <el-table
        :key="tableKey"
        :data="list2"
        size="mini"
        :header-cell-class-name="tableRowClassName"
        v-loading="listLoading"
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
        <el-table-column align="right" prop="SYLX" label="使用类型">
          <template slot-scope="scope">
            <span>{{scope.row.SYLX}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" prop="LSFGS" label="商户名称">
          <template slot-scope="scope">
            <span>{{scope.row.SHMC}}</span>
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
      <div style="text-align:center;margin-top:10px;">
        <el-button @click="editVisible2 = false">取消</el-button>
      </div>
    </el-dialog>
     <el-dialog :visible.sync="showUpload" >
              <el-card class="box-card" >
                <div class="filter-container" style="height:80px;">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="urlUpload"
                    :auto-upload="false"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-success="handleSuccess"
                    :before-remove="beforeRemove"
                    :headers="headers"
                    :file-list="fileList"
                  >
                   <el-button slot="trigger" size="small"  type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="btnSubmit">导&nbsp;&nbsp;入</el-button>
                  <a :href="urldownload" style="text-decoration:underline;">模板下載</a>
                  </el-upload>
                  
                </div>
              </el-card>
            </el-dialog>
  </div>
</template>



<script>
// import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {
  GetHouseInfo,
  uploadHouseImg,
  CreateHouseInfo,
  UpdateHouseInfo,
  DeleteHouseInfo
} from "@/app_src/api/SHDAGL/FWDA";
import { GetOptions } from "@/app_src/api/commonApi";
import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
export default {
  name: "CBJHSQ",
  directives: {
    waves
  },
  //   components: {
  //     Treeselect
  //   },
  data() {
    return {
      UploadURL: process.env.BASE_API + "HouseInfo/uploadHouseImg",
      dateQuery: "",
      dialogImageUrl: "",
      dialogVisible: false,
      editVisible2: false,
      disabled: false,
      tableKey: 0,
      listQuery: {
        FWMC: "",
        LSFGS: "",
        FWSX: "",
        limit: 10,
        page: 1,
        baseURL: process.env.BASE_API + "/UploadFiles/HouseImg//"
      },
      temp: {
        FWID: "",
        FWSX: "",
        FWBH: "",
        FWMC: "",
        JZMJ: "",
        LSFGS: "",
        ZLWZ: "",
        JGLX: "",
        ZCYZ: "",
        SSQY: "",
        PMT: [],
        WATER_NUMBER: "",
        ELE_NUMBER: "",
        CZ_SHID: "",
        LEASE_ID: "",
        FEE_ID: "",
        CJR: "",
        BJR: "",
        ZFK: "",
        userId: this.$store.state.user.userId,
        newFilePath: ""
      },
      selectOptions: [
        {
          value: "空闲",
          label: "空闲"
        },
        {
          value: "出租",
          label: "出租"
        },
        {
          value: "出售",
          label: "出售"
        }
      ],
      areaOptions: [
        {
          value: "A区",
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
      list2: [
        {
          KSSJ: "2015-6-27",
          JSSJ: "2017-6-27",
          SYLX: "出租",
          SHMC: "张三"
        },
        {
          KSSJ: "2017-6-27",
          JSSJ: "2018-6-27",
          SYLX: "续租",
          SHMC: "张三"
        },
        {
          KSSJ: "2018-6-27",
          JSSJ: "2019-6-27",
          SYLX: "出租",
          SHMC: "李四"
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
      total: 15,
      listLoading: false,
      // temp: {
      //   FWBH: "D-211",
      //   FWMC: "房屋5",
      //   JZMJ: "127㎡",
      //   LSFGS: "云计算技术部",
      //   ZLWZ: "D区",
      //   FZFJE: 25000,
      //   WYFJE: 1350,
      //   FWSX: "出售"
      // },
      textMap: {
        update: "修改房屋信息",
        create: "添加房屋信息"
      },
      editVisible: false,
      dialogStatus: "",
      imageUrl: "",
      treeData: [],
      GSOptions: [],
      JGOptions: [],
      showUpload:false,
       urlUpload: process.env.BASE_API + "HouseInfo/uploadHouseInfo",
      urldownload: process.env.BASE_API + "ExcelModel/房屋档案表模板.xlsx",
      fileList:[]
    };
  },
  methods: {
    cellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label === "房屋属性" && row.row.FWSX == 0) {
        return "background:#909399";
      } else if (row.column.label === "房屋属性" && row.row.FWSX == 1) {
        return "background:#E6A23C";
      } else if (row.column.label === "房屋属性" && row.row.FWSX == 2) {
        return "background:#67C23A";
      }
    },
    handleRemove(file) {
      let arr = file.url.split("//");
      let url = arr[arr.length - 1];
      this.temp.newFilePath = this.temp.newFilePath.replace(url + ",", "");
    },
    GetUrl(res, file, filelist) {
      this.temp.newFilePath == undefined ? "" : this.temp.newFilePath;
      this.temp.newFilePath += res.fileName + ",";
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
        FWID: "",
        FWSX: "",
        FWBH: "",
        FWMC: "",
        JZMJ: "",
        LSFGS: "",
        ZLWZ: "",
        JGLX: "",
        ZCYZ: "",
        SSQY: "",
        PMT: [],
        WATER_NUMBER: "",
        ELE_NUMBER: "",
        CZ_SHID: "",
        LEASE_ID: "",
        FEE_ID: "",
        CJR: "",
        BJR: "",
        ZFK: "",
        userId: this.$store.state.user.userId,
        newFilePath: ""
      };
    },

    getList() {
      this.listLoading = true;
      GetHouseInfo(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items;
          this.total = response.data.totoal;
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
    handleCondition(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.editVisible2 = true;
      this.dialogStatus = "update";
      // this.$nextTick(() => {
      //   this.$refs["dataForm"].clearValidate();
      // });
    },
    handleDelete(row) {
      console.log(row);
      this.$confirm("您确定要删除此条信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let temp = {
            FWID: row.FWID
          };
          DeleteHouseInfo(temp).then(response => {
            this.message = response.data.message;
            this.title = "失败";
            this.type = "error";
            if (response.data.code === 2000) {
              // const index = this.list.indexOf(row)
              // this.list.splice(index, 1)
              this.getList();
              this.title = "成功";
              this.type = "success";
            }
            this.$notify({
              position: "bottom-right",
              title: this.title,
              message: this.message,
              type: this.type,
              duration: 2000
            });
          });
        })
        .catch(() => {});
    },
    createData() {
      // 创建
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.PMT.forEach(item => {
            this.temp.newFilePath += item.url;
          });
          CreateHouseInfo(this.temp).then(response => {
            var message = response.data.message;
            if (response.data.code === 2000) {
              this.getList();
              title = "成功";
              type = "success";
            }
            this.editVisible = false;
            this.$notify({
              position: "bottom-right",
              title: title,
              message: message,
              type: type,
              duration: 3000
            });
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp); // 这样就不会共用同一个对象
          this.temp.PMT.forEach(item => {
            this.temp.newFilePath += item.url;
            console.log(item.url);
          });
          UpdateHouseInfo(tempData).then(response => {
            var message = response.data.message;
            var title = "失败";
            var type = "error";
            if (response.data.code === 2000) {
              this.getList();
              title = "成功";
              type = "success";
            }
            this.editVisible = false;
            this.$notify({
              position: "bottom-right",
              title: title,
              message: message,
              type: type,
              duration: 3000
            });
          });
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
    GetOptions() {
      let temp = {
        ParentCode: "LSFGS"
      };
      let temp1 = {
        ParentCode: "JGLX"
      };
      GetOptions(temp).then(res => {
        if (res.data.code === 2000) {
          this.GSOptions = res.data.items;
        }
      });
      GetOptions(temp1).then(res => {
        if (res.data.code === 2000) {
          this.JGOptions = res.data.items;
        }
      });
     
    },
     btnImpot(){
       this.showUpload=true;
     },
     handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
    },
    handleSuccess(res, file, fileList) {
      if (res.code === 2000) {
        this.getList();
        title = "导入成功";
        type = "success";
      }
      else{
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
        this.fileList=[];
      }
      
    },
    btnSubmit(){
       this.$refs.upload.submit();
    }
  },
  created() {
    this.listLoading = false;
    this.getList();
    this.GetOptions();
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
  }
};
</script>

<style lang="scss" >
#FWDA {
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
.tableicon {
  width: 25px;
  height: 25px;
}
</style>

