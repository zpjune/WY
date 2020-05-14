<template>
  <div id="WorkloadStatistics" class="app-container calendar-list-container">
    <el-row :gutter="20">
      <el-col :xs="6" :sm="6" :md="5" :lg="4" :xl="4">
        <span>报表类型：</span>
        <el-radio-group v-model="listQuery.type" size="mini">
          <el-radio-button :label="0">年度</el-radio-button>
          <el-radio-button :label="1">月度</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <el-input
          @keyup.enter.native="handleFilter"
          class="filter-item"
          placeholder="请输入检查人姓名"
          v-model="listQuery.JCR"
          size="mini"
        ></el-input>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <el-date-picker
          placeholder="请选择报表月份"
          style="width:100%"
          size="mini"
          v-model="listQuery.date"
          type="month"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-col>

      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <el-button size="mini" type="primary" icon="el-icon-search" @click="getList">查询</el-button>
      </el-col>
    </el-row>
    <el-card style="margin-top:10px;">
      <el-table
        :header-cell-class-name="tableRowClassName"
        size="mini"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;text-align:left;"
        :span-method="objectSpanMethod"
      >
        <el-table-column label="检查人姓名" prop="FZR" align="center"></el-table-column>
        <el-table-column label="检查年份" prop="yyyy" align="center"></el-table-column>
        <el-table-column label="检查月份" prop="mon" align="center"></el-table-column>
        <el-table-column label="检查次数" prop="JCCS" align="center"></el-table-column>
        <el-table-column label="超期次数" prop="overdue" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="getDetail(scope.row)" size="mini">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.page"
          :page-sizes="[12,24,36, 48]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog :visible.sync="detailDialog" title="检查详情" width="70%">
      <el-table
        :header-cell-class-name="tableRowClassName"
        size="mini"
        :data="detailList"
        border
        fit
        highlight-current-row
        style="width: 100%;text-align:left;"
      >
        <el-table-column label="任务编号" prop="RWBH"></el-table-column>
        <el-table-column label="任务名称" prop="RWMC"></el-table-column>
        <el-table-column label="检查房屋编号" prop="FWBH"></el-table-column>
        <el-table-column label="检查房屋名称" prop="FWMC"></el-table-column>
        <el-table-column label="检查结果" prop="JCJG"></el-table-column>
        <el-table-column label="检查时间" prop="JCSJ"></el-table-column>
        <el-table-column label="是否逾期检查" prop="overdue"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  WorkloadStatistics,
  WorkloadStatisticsDetail
} from "@/app_src/api/TJFX/BBTJ/WorkloadStatistics.js";
export default {
  data() {
    return {
      listQuery: {
        type: 0,
        FZR: "",
        date: "",
        limit: 20,
        page: 1
      },
      list: [],
      detailList: [],
      total: 0,
      spanArr: [],
      detailDialog: false
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    getList() {
      WorkloadStatistics(this.listQuery).then(res => {
        if (res.data.code === 2000) {
          this.list = res.data.items;
          this.total = res.data.total;
          let contactDot = 0;
          this.spanArr = [];
          this.list.forEach((item, index) => {
            if (index === 0) {
              this.spanArr.push(1); //首条数据肯定为不相同数据
            } else {
              if (item.FZR === this.list[index - 1].FZR) {
                this.spanArr[contactDot] += 1; //首条相同数据数量+1
                this.spanArr.push(0); //其后的数据标识为0
              } else {
                contactDot = index; //记录当前的索引
                this.spanArr.push(1); //不同数据标识为1
              }
            }
          });
        } else {
          this.$notify({
            position: "bottom-right",
            title: title,
            message: res.message,
            type: "error",
            duration: 3000
          });
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (this.spanArr[rowIndex]) {
          //游标数组内对应索引不为0的返回合并数据,为0的直接返回原数据
          return {
            rowspan: this.spanArr[rowIndex],
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    getDetail(row) {
      this.detailDialog = true;
      let temp = {
        RD_ID: row.RD_ID,
        mon: row.mon,
        yyyy: row.yyyy
      };
      WorkloadStatisticsDetail(temp).then(res => {
        if (res.data.code === 2000) {
          this.detailList = res.data.items;
        }
      });
      console.log(temp);
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
</style>