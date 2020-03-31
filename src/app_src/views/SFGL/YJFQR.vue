<template>
  <div id="YJFQR" class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.JFLX"
        placeholder="缴费类型"
        size="mini"
        class="filter-item"
        clearable
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        class="filter-item"
        placeholder="请输入房屋名称"
        v-model="listQuery.FWMC"
        size="mini"
      ></el-input>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        class="filter-item"
        placeholder="请输入房号"
        v-model="listQuery.FWBH"
        size="mini"
      ></el-input>

      <!-- <el-date-picker
        class="filter-item"
        v-model="dateQuery"
        type="daterange"
        range-separator="至"
        size="mini"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>-->
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getList"
        size="mini"
      >查询</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
        size="mini"
      >导出</el-button>
      <el-button
        type="success"
        size="mini"
        @click="confirmReciveMoney"
        class="filter-item"
        :disabled="selectList.length==0"
      >确认缴费</el-button>
    </div>
    <el-table
      :key="tableKey"
      :data="list"
      :header-cell-class-name="tableRowClassName"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      size="mini"
      id="table"
      @select="select"
      @select-all="selectall"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column width="150px" align="center" label="缴费类型">
        <template slot-scope="scope">
          <span>{{scope.row.JFLX|changeType}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120px" label="房屋编号">
        <template slot-scope="scope">
          <span>{{scope.row.FWBH}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="房屋名称">
        <template slot-scope="scope">
          <span>{{scope.row.FWMC}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="业主姓名">
        <template slot-scope="scope">
          <span>{{scope.row.ZHXM}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="业主电话">
        <template slot-scope="scope">
          <span>{{scope.row.MOBILE_PHONE}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="缴费金额">
        <template slot-scope="scope">
          <span>{{scope.row.JFJE}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="有效期起">
        <template slot-scope="scope">{{scope.row.YXQS|parseTime}}</template>
      </el-table-column>
      <el-table-column align="center" label="有效期止">
        <template slot-scope="scope">{{scope.row.YXQZ|parseTime}}</template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="是否确认收据">
        <template slot-scope="scope">
          <span>{{scope.row.CONFIRM_RECIVEMONEY|changeSFTZ}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="催缴次数">
        <template slot-scope="scope">
          <span>{{scope.row.JFCS}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="催缴日期">
        <template slot-scope="scope">
          <span>{{scope.row.JFRQ}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center">
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
    <el-dialog width="50%" title="缴费通知" :visible.sync="innerVisible" append-to-body>
      <el-card class="box-card">
        <h2 style="text-align:center;">缴费通知单</h2>
        <pre style="font-size:18px;">
  <span style="text-decoration:underline">尊敬的丰收道730号业主：</span>

  根据合同，该房屋已欠缴物业费，现请您务必在<span style="text-decoration:underline">2019年6月25日</span>前缴纳该房屋的物业费578.16元

  <span style="text-decoration:underline">（2019年1月1日至2019年6月30日）</span>请尽快到普丰物业公司（创新北里物业楼210室缴纳物业费）。

  缴费方式：刷借记卡、微信、支付宝。

  联系电话：63950600


  <label
  style="float:right"
>天津市普丰物业管理有限公司</label>
  <label style="float:right">2019年5月27日</label>
  </pre>
      </el-card>
    </el-dialog>

    <el-dialog
      :visible.sync="editVisible"
      class="selecttrees"
      :title="textMap[dialogStatus]"
      width="70%"
    >
      <el-form ref="dataForm" :model="temp" label-width="120px" style="width: 99%;">
        <el-row>
          <el-col :span="12">
            <el-form-item label="业主姓名" prop="yezhu">
              <el-input v-model="temp.ZHXM" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋编号" prop="fanghao">
              <el-input v-model="temp.FWBH" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="缴费类型" prop="jflx">
              <el-input v-model="temp.JFLX" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋名称" prop="name">
              <el-input v-model="temp.FWMC" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="费用金额" prop="jiaonajine">
              <el-input v-model="temp.JFJE" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="有效期（起）" prop="YXQQ">
              <el-date-picker v-model="temp.YXQS" disabled></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效期（止）" prop="YXQZ">
              <el-date-picker v-model="temp.YXQZ" disabled></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="REMARK">
              <el-input v-model="temp.REMARK" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
      </el-form>
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="editVisible = false">取消</el-button>
        <!-- <el-button type="primary" @click="handleFee">确定</el-button> -->
      </div>
    </el-dialog>
    <el-dialog :visible.sync="createdialogVisible" class="selecttrees" title="选择生成方式" width="20%">
      <el-card>
        <el-row style="text-align:center">
          <el-col>
            <el-radio v-model="radio" label="0">当月</el-radio>
            <el-radio v-model="radio" label="1">季度</el-radio>
          </el-col>
        </el-row>
        <el-row style="margin-top:30px;text-align:center">
          <el-col>
            <el-button type="primary" @click="submit">生成</el-button>
            <el-button @click="createdialogVisible = false">取消</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-dialog>
  </div>
</template>
            
<script>
import {
  GetFeeResult,
  GetShopInfo,
  CreateNotification,
  ConfirmNotificationList,
  PushNotification,
  ConfirmFee,
  ConfirmReciveMoney,
  ExportFeeResult
} from "@/app_src/api/SFGL/SFGL";
import { parseTime } from "@/frame_src/utils";
const TypeOptions = [
  { key: 0, type_name: "物业费" },
  { key: 1, type_name: "水费" },
  { key: 2, type_name: "电费" }
];
const TypeKeyValue = TypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.type_name;
  return acc;
}, {});

const TZOptions = [
  { key: 0, type_name: "否" },
  { key: 1, type_name: "是" }
];
const TZKeyValue = TZOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.type_name;
  return acc;
}, {});
export default {
  name: "YJFQR",
  data() {
    return {
      listLoading: false,
      dialogStatus: "",
      listQuery: {
        JFLX: "",
        FWMC: "",
        FWBH: "",
        JFSTATUS: 1,
        page: 1,
        limit: 10
      },
      total: 0,
      radio: "",
      innerVisible: false,
      dateQuery: "",
      options: [
        {
          value: "0",
          label: "物业费"
        },
        {
          value: "1",
          label: "水费"
        },
        {
          value: "2",
          label: "电费"
        }
      ],
      anquan: "",
      list: [],
      selectList: [],
      tableKey: 0,
      temp: {
        yezhu: "",
        fanghao: "",
        jflx: "",
        name: "",
        jfrq: "",
        jiaonajine: "",
        YXQQ: "",
        YXQZ: "",
        REMARK: ""
      },
      textMap: {
        update: "确认缴费",
        create: "手动缴费"
      },
      editVisible: false,
      createdialogVisible: false
    };
  },
  methods: {
    select(selection, row) {
      this.selectList = [];
      selection.forEach(items => {
        let temp = {
          RECORD_ID: items.RECORD_ID,
          CZ_SHID: items.CZ_SHID,
          OPEN_ID: items.OPEN_ID,
          CONFIRM_RECIVEMONEY: items.CONFIRM_RECIVEMONEY
        };
        this.selectList.push(temp);
      });
    },
    selectall(selection) {
      this.selectList = [];
      selection.forEach(items => {
        let temp = {
          RECORD_ID: items.RECORD_ID,
          CZ_SHID: items.CZ_SHID,
          OPEN_ID: items.OPEN_ID,
          CONFIRM_RECIVEMONEY: items.CONFIRM_RECIVEMONEY
        };
        this.selectList.push(temp);
      });
    },
    confirmReciveMoney() {
      this.$confirm("确定发送所勾选的用户的收据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ConfirmReciveMoney(this.selectList).then(response => {
          if (response.data.code === 2000) {
            this.$notify({
              position: "bottom-right",
              title: "成功",
              message: response.data.message,
              type: "success",
              duration: 2000
            });
            this.getList();
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
      });
    },
    create() {
      this.createdialogVisible = true;
    },
    submit() {
      let temp = {
        type: this.radio
      };
      CreateNotification(temp).then(response => {
        if (response.data.code === 2000) {
          this.$notify({
            position: "bottom-right",
            title: "成功",
            message: response.data.message,
            type: "success",
            duration: 2000
          });
          this.createdialogVisible = false;
          this.getList();
          this.selectList = [];
        } else {
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
        yezhu: "",
        fanghao: "",
        jflx: "",
        name: "",
        jfrq: "",
        jiaonajine: "",
        YXQQ: "",
        YXQZ: "",
        REMARK: ""
      };
    },
    getList() {
      this.listLoading = true;
      GetFeeResult(this.listQuery).then(response => {
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
    handleDetail(row) {
      this.DetailVisible = true;
      let temp = {
        FWID: row.FWID
      };
      GetShopInfo(temp).then(res => {
        // if(res.data.code===2000){
        //   this.temp
        // }
      });
    },
    handleDownload() {},
    handleDetail(data) {
      this.innerVisible = true;
    },
    tixingclick() {},
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
    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
    },
    handleFilter() {
      this.listQuery.page = 1;
    },
    handleDownload() {
      // 导出
      import("@/frame_src/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "缴费类型",
          "房屋编号",
          "房屋名称",
          "业主姓名",
          "业主电话",
          "缴费金额",
          "有效期起",
          "有效期止",
          "是否发送通知单",
          "催缴次数",
          "催缴日期"
        ];
        const filterVal = [
          "JFLX",
          "FWBH",
          "FWMC",
          "ZHXM",
          "MOBILE_PHONE",
          "JFJE",
          "YXQS",
          "YXQZ",
          "SFTZ",
          "JFCS",
          "JFRQ"
        ];
        let temp = {
          JFSTATUS: 1
        };
        ExportFeeResult(temp).then(res => {
          if (res.data.code === 2000) {
            let list = res.data.items;
            const data = this.formatJson(filterVal, this.list);
            //console.log(data);
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: "待缴费信息表"
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
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "JFLX") {
            return TypeKeyValue[v[j]];
          }
          if (j === "SFTZ") {
            return TZKeyValue[v[j]];
          } else {
            return v[j];
          }
        })
      );
    }
  },
  mounted() {
    this.getList();
  },
  filters: {
    changeType(val) {
      if (val === "0") {
        return "物业费";
      } else if (val === "1") {
        return "水费";
      } else if (val === "2") {
        return "电费";
      }
    },
    changeSFTZ(val) {
      if (val === 0) {
        return "否";
      } else {
        return "是";
      }
    },
    parseTime
  }
};
</script>
            
<style>
</style>
            