<template>
  <div id="QJJLCX" class="app-container calendar-list-container">
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
        type="warning"
        size="mini"
        @click="PayOff"
        class="filter-item"
        :disabled="selectList.length==0"
      >清缴</el-button>
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
      <el-table-column align="center" label="缴费类型">
        <template slot-scope="scope">
          <span>{{scope.row.JFLX|changeType}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="房屋编号">
        <template slot-scope="scope">
          <span>{{scope.row.FWBH}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="房屋名称">
        <template slot-scope="scope">
          <span>{{scope.row.FWMC}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="业主姓名">
        <template slot-scope="scope">
          <span>{{scope.row.ZHXM}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="业主电话">
        <template slot-scope="scope">
          <span>{{scope.row.MOBILE_PHONE}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="欠费金额">
        <template slot-scope="scope">
          <span>{{scope.row.JFJE}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否发送通知单">
        <template slot-scope="scope">
          <span>{{scope.row.SFTZ|changeSFTZ}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="催缴次数">
        <template slot-scope="scope">
          <span>{{scope.row.JFCS}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="催缴日期">
        <template slot-scope="scope">
          <span>{{scope.row.JFRQ|parseTime}}</span>
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
              <el-input v-model="temp.yezhu"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋编号" prop="fanghao">
              <el-input v-model="temp.fanghao"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="缴费类型" prop="jflx">
              <el-input v-model="temp.jflx"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋名称" prop="name">
              <el-input v-model="temp.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="缴费时间" prop="jfrq">
              <el-date-picker
                style="width:100%"
                format="yyyy-MM-dd"
                size="small"
                v-model="temp.jfrq"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="费用金额" prop="jiaonajine">
              <el-input v-model="temp.jiaonajine"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="有效期（起）" prop="YXQQ">
              <el-input v-model="temp.YXQQ"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效期（止）" prop="YXQZ">
              <el-input v-model="temp.YXQZ"></el-input>
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
      </el-form>
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
        <el-button v-else type="primary" @click="updateData">保存</el-button>
      </div>
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
  GetHistoryFeeResult,
  GetBadFeeResult,
  PayOff
} from "@/app_src/api/SFGL/SFGL";
export default {
  name: "QJJLCX",
  data() {
    return {
      listLoading: false,
      dialogStatus: "",
      listQuery: {
        JFLX: "",
        FWMC: "",
        FWBH: "",
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
      selectList: [],
      list: [],
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
          OPEN_ID: items.OPEN_ID
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
          OPEN_ID: items.OPEN_ID
        };
        this.selectList.push(temp);
      });
    },
    PayOff() {
      this.$confirm("确定将勾选的通知标记为法律诉讼并发送通知单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        PayOff(this.selectList).then(response => {
          if (response.data.code === 2000) {
            this.$notify({
              position: "bottom-right",
              title: "成功",
              message: response.data.message,
              type: "success",
              duration: 2000
            });
            this.getList();
            this.selectList = [];
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
      GetBadFeeResult(this.listQuery).then(response => {
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
    handleCreate() {
      this.resetTemp();
      this.editVisible = true;
      this.dialogStatus = "create";
      if (this.$refs["dataForm"] !== undefined) {
        this.$refs["dataForm"].resetFields();
      }
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
      this.getList();
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
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
      } else if(val===1) {
        return "是";
      }
      else if(val===2){
        return "法律诉讼";
      }
    }
  }
};
</script>
            
<style>
</style>
            