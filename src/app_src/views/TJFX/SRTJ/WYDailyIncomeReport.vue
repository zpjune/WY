<template>
  <div id="WYDailyIncomeReport" class="app-container calendar-list-container">
    <el-row :gutter="20" style="margin-bottom:15px;">
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <el-date-picker
          type="date"
          placeholder="请选择报表日期"
          v-model="listQuery.date"
          value-format="yyyy-MM-dd"
          size="mini"
          style="width:95%;"
        ></el-date-picker>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <el-button
          size="mini"
          class="filter-item"
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="getList"
        >搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table
          :data="list"
          size="mini"
          :header-cell-class-name="tableRowClassName"
          v-loading="listLoading"
          element-loading-text="给我一点时间"
          border
          fit
          highlight-current-row
          style="width: 100%;text-align:left;"
          ref="table"
        >
          <el-table-column label="缴费日期" prop="payday" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="底商地址商铺号" prop="SHOPBH" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="商户姓名" prop="USER_NAME" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="物业费(元)" prop="WYF" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="水费(元)" prop="SF" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="违约保证金(元)" prop="WYBZJ" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="装修押金(元)" prop="ZXYJ" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="消防保证金(元)" prop="XFBZJ" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="今日缴费金额(元)" prop="WYTotal" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="物业费有效期" prop="YXQ" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作"  align="center" >
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="print(scope.row)">下载收据</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
  </div>
</template>

<script>
import waves from "@/frame_src/directive/waves";
import { GetWYIncomeReport,ExportRecipet} from "@/app_src/api/TJFX/SRTJ/DailyIncomeReport";
export default {
  name: "WYDailyIncomeReport",
  directives: {
    waves
  },
  data() {
    return {
      listQuery: {
        date: "",
        limit: 10,
        page: 1
      },
      listLoading: false,
      list: [],
      total: 0
    };
  },
  methods: {
    getList() {
      GetWYIncomeReport(this.listQuery).then(res => {
        if (res.data.code === 2000) {
          this.list = res.data.items;
          this.total = res.data.total;
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
    },
    print(row){
      let temp=Object.assign({},row);
      temp.ExportType=0;
      ExportRecipet(temp).then(res=>{
        if(res.data.code===2000){
          window.open(process.env.BASE_API+res.data.path);
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    getDateTimeNow() {
      let date = new Date();
      this.listQuery.date =
        date.getFullYear().toString() +
        "-" +
        (date.getMonth() + 1).toString() +
        "-" +
        date.getDate().toString();
    }
  },
  mounted() {
    this.getDateTimeNow();
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
</style>