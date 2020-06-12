<template>
  <div id="DJFQR" class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-select
            v-model="listQuery.JFLX"
            placeholder="缴费类型"
            size="mini"
            class="filter-item"
            style="width:95%;"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width:95%;"
            class="filter-item"
            placeholder="请输入房屋名称"
            v-model="listQuery.FWMC"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width:95%;"
            class="filter-item"
            placeholder="请输入房号"
            v-model="listQuery.FWBH"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :xs="14" :sm="14" :md="13" :lg="12" :xl="12">
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
          <el-button type="success" size="mini" @click="create" class="filter-item">生成通知单</el-button>
          <el-button
            type="success"
            size="mini"
            @click="handleConfirm"
            class="filter-item"
            :disabled="selectList.length==0"
          >确认通知单</el-button>
          <el-button
            type="warning"
            size="mini"
            @click="handlePush"
            class="filter-item"
            :disabled="selectList.length==0"
          >催缴</el-button>
        </el-col>
      </el-row>
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
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column align="center" label="缴费类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.JFLX|changeType}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="房屋编号" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.FWBH}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="房屋名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.FWMC}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="业主姓名" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.ZHXM}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="业主电话" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.MOBILE_PHONE}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="缴费金额" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.JFJE}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="有效期起" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.YXQS|parseTime}}</template>
      </el-table-column>
      <el-table-column align="center" label="有效期止" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.YXQZ|parseTime}}</template>
      </el-table-column>
      <el-table-column align="center" label="是否发送通知单" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.SFTZ|changeSFTZ}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="催缴次数" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.JFCS}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="催缴日期" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.JFRQ|parseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看详情</el-button> -->
          <el-button
            type="warning"
            size="mini"
            v-if="scope.row.JFZT===0"
            @click="handleCreate(scope.row)"
          >手动缴费</el-button>
          <el-button
            type="danger"
            size="mini"
            v-if="scope.row.JFZT===0"
            @click="handelDel(scope.row)"
          >删除</el-button>
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
    <el-dialog title="缴费通知" :visible.sync="innerVisible" append-to-body>
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

    <el-dialog :visible.sync="editVisible" class="selecttrees" :title="textMap[dialogStatus]">
      <el-card>
        <el-form ref="dataForm" :model="temp" label-width="120px" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="业主姓名">
                <el-input v-model="temp.ZHXM" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋编号">
                <el-input v-model="temp.FWBH" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="缴费类型">
                <el-select v-model="temp.JFLX" disabled style="width:100%">
                  <el-option label="物业费" value="0"></el-option>
                  <el-option label="水费" value="1"></el-option>
                  <el-option label="电费" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋名称">
                <el-input v-model="temp.FWMC" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="费用金额(物业费)" v-if="temp.JFLX==='0'">
                <el-input v-model="temp.JFJE" disabled>
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="费用金额(水费)" v-if="temp.JFLX==='1'">
                <el-input v-model="TotalWaterFee" disabled>
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="费用金额(电费)" v-if="temp.JFLX==='2'">
                <el-input v-model="temp.JFJE">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="购买数量" v-if="temp.JFLX==='1'" prop="GMSL">
                <el-input v-model.number="temp.GMSL">
                  <template slot="prepend">{{PER_WATER_PRICE}}元/吨</template>
                  <template slot="append">吨</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="有效期（起）">
                <el-date-picker v-model="temp.YXQS" disabled style="width:100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效期（止）">
                <el-date-picker v-model="temp.YXQZ" disabled style="width:100%"></el-date-picker>
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
          <el-button type="primary" @click="handleFee">确定</el-button>
        </div>
      </el-card>
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
  ExportFeeResult,
  DeleteRecord,
  GetPER_WATER_PRICE
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
  name: "DJFQR",

  data() {
    return {
      listLoading: false,
      dialogStatus: "",
      listQuery: {
        JFLX: "",
        FWMC: "",
        FWBH: "",
        JFSTATUS: 0,
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
      PER_WATER_PRICE: 0,
      selectList: [],
      list: [],
      temp: {},
      tableKey: 0,
      rules: {
        GMSL: [
          { required: true, message: "购买数量不能为空" },
          { type: "number", message: "购买数量必须为整数" }
        ]
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
          FWBH: items.FWBH,
          FWMC: items.FWMC,
          YXQS: items.YXQS,
          YXQZ: items.YXQZ,
          JFJE: items.JFJE,
          ZHXM: items.ZHXM,
          JFLX: items.JFLX,
          SURPLUSVALUE: items.SURPLUSVALUE
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
          FWBH: items.FWBH,
          FWMC: items.FWMC,
          YXQS: items.YXQS,
          YXQZ: items.YXQZ,
          JFJE: items.JFJE,
          ZHXM: items.ZHXM,
          JFLX: items.JFLX,
          SURPLUSVALUE: items.SURPLUSVALUE
        };
        this.selectList.push(temp);
      });
    },
    handleFee() {
      let MapJFLX = new Map([
        ["0", "物业费"],
        ["1", "水费"],
        ["2", "电费"]
      ]);
      let MapJFJE=new Map([
        ["0",this.temp.JFJE],
        ["1",this.TotalWaterFee],
        ["2",this.temp.JFJE]
      ]);
      this.$confirm(
        "您确定执行本次手动缴费操作吗？本次的缴费类型为"+MapJFLX.get(this.temp.JFLX)+",缴费金额为"+MapJFJE.get(this.temp.JFLX)+"元",
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$refs["dataForm"].validate(valid => {
          if (valid) {
            let temp = {
              RECORD_ID: this.temp.RECORD_ID,
              JFLX: this.temp.JFLX,
              JFJE: this.temp.JFJE
            };
            if (this.temp.JFLX.toString() === "1") {
              temp.GMSL = this.temp.GMSL;
            } else {
            }
            ConfirmFee(temp).then(response => {
              if (response.data.code === 2000) {
                this.$notify({
                  position: "bottom-right",
                  title: "成功",
                  message: response.data.message,
                  type: "success",
                  duration: 2000
                });
                this.editVisible = false;
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
          }
        });
      });
    },
    handelDel(row) {
      this.$confirm(
        "您确定要删除本条通知单吗?本操作的目的是可以成功的解除因提前生成通知单而无法解除物业的限制，您确定要继续吗？",
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        let temp = {
          RECORD_ID: row.RECORD_ID
        };
        DeleteRecord(temp).then(res => {
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
      });
    },
    handlePush() {
      this.$confirm("确定催缴所勾选的通知单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        PushNotification(this.selectList).then(response => {
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
    handleCreate(row) {
      this.temp = {};
      this.temp = Object.assign({}, row);
      this.editVisible = true;
      this.dialogStatus = "create";
      if (this.$refs["dataForm"] !== undefined) {
        this.$refs["dataForm"].resetFields();
      }
      if (row.JFLX === 1 || this.PER_WATER_PRICE === 0) {
        this.GetPER_WATER_PRICE();
      }
    },
    handleConfirm() {
      this.$confirm("确定确认所勾选的通知单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ConfirmNotificationList(this.selectList).then(response => {
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
    GetPER_WATER_PRICE() {
      GetPER_WATER_PRICE().then(res => {
        if (res.data.code === 2000) {
          this.PER_WATER_PRICE = parseFloat(res.data.items[0].CONF_VALUE);
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
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
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
          JFSTATUS: 0
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
  computed: {
    TotalWaterFee: function() {
      let TotalFee = this.PER_WATER_PRICE * this.temp.GMSL * 100;
      if (Number.isNaN(TotalFee)) {
        return 0;
      } else {
        return Math.round(TotalFee) / 100;
      }
    }
  },
  mounted() {
    this.getList();
    this.GetPER_WATER_PRICE();
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
            