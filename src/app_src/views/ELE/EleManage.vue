<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input
        size="mini"
        @keyup.enter.native="handleFilter"
        style="width: 150px;"
        :placeholder="$t('logInfoTable.USER_NAME')"
        v-model="listQuery.USER_NAME"
      ></el-input>
      <el-input
        size="mini"
        v-model="listQuery.USER_DOMAIN"
        type="text"
        placeholder="输入用户账号"
        style="width: 150px;"
      ></el-input>

      <el-button size="mini" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button size="mini" type="primary" :loading="downloadLoading" v-waves @click="kaihu">开户</el-button>
      <el-button size="mini" type="primary" :loading="downloadLoading" v-waves @click="qingling">清零</el-button>
    </div>
    <el-card class="box-card">
      <el-table
        size="mini"
        :key="tableKey"
        @selection-change="handleSelectionChange"
        :header-cell-class-name="tableRowClassName"
        :data="list"
        v-loading="listLoading"
        element-loading-text="给我一点时间"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column width="160px" class="filter-item" align="center" :label="'电表号'">
          <template slot-scope="scope">
            <span>{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column width="140px" class="link-type" align="center" :label="'采集器id'">
          <template slot-scope="scope">
            <span>{{scope.row.cid}}</span>
          </template>
        </el-table-column>
        <el-table-column width="110px" align="center" :label="'充值金额（元）'">
          <template slot-scope="scope">
            <span>{{scope.row.Cost}}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" :label="'充值状态'">
          <span>失败</span>
        </el-table-column>

        <el-table-column width="250px" align="center" :label="'失败原因'" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.CMessage}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" :label="'开户状态'">
          <template slot-scope="scope">
            <span v-if="scope.row.KaiHu==1">已开户</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          width="250px"
          align="center"
          :label="'开户失败原因'"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{scope.row.KaiHuMsg}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" :label="'清零状态'">
          <template slot-scope="scope">
            <span v-if="scope.row.QingLing==1">已清零</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          width="250px"
          align="center"
          :label="'清零失败原因'"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{scope.row.QingLingMsg}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="pagination-container">
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
  </div>
</template>
<script>
import { GetData } from "@/app_src/api/ELE/EleManage";
import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { parseTime } from "@/frame_src/utils/index.js";

export default {
  name: "uidpConfigManager",
  directives: {
    waves
  },

  data() {
    return {
      tableKey: 0,
      list: null,

      total: null,
      listLoading: true,
      value1: "",
      listQuery: {
        page: 1,
        limit: 10
      },

      downloadLoading: false,
      multipleSelection: []
    };
  },
  filters: {
    parseTime
  },
  methods: {
    getList() {
      this.listLoading = true;
      GetData(this.listQuery).then(response => {
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
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    kaihu() {
        if(this.multipleSelection.length==0){
            this.$notify({
            position: "bottom-right",
            title: "提示",
            message: "请选择一行数据！",
            type: "error",
            duration: 2000
          });
            return false;
        }
      this.$confirm("您确定要对选中的表进行开户操作么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         
        })
        .catch(() => {
         
        });
    },
    qingling() {
        if(this.multipleSelection.length==0){
            this.$notify({
            position: "bottom-right",
            title: "提示",
            message: "请选择一行数据！",
            type: "error",
            duration: 2000
          });
            return false;
        }
      this.$confirm("您确定要对选中的表进行清零操作么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         
        })
        .catch(() => {
         
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    tableRowClassName({ row, rowIndex }) {
      // 可以通过指定 Table 组件的 :header-cell-class-name 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className属性来为 Table 中的某一行添加 class，表明该行处于某种状态
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    }
  },
  created() {
    // 获取登陆信息的俩种方式
    this.listLoading = false;
  }
};
</script>