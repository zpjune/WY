<template>
  <div id="ShopCheckSummary" class="app-container calendar-list-container">
    <el-row :gutter="20">
      <el-col :xs="5" :sm="4" :md="4" :lg="3" :xl="3">
        <el-date-picker
          placeholder="请选择报表年份"
          style="width:100%"
          size="mini"
          v-model="listQuery.date"
          type="year"
          value-format="yyyy-MM-dd"
          clearable
        ></el-date-picker>
      </el-col>
      <el-col :xs="5" :sm="4" :md="4" :lg="3" :xl="3">
        <el-input
          @keyup.enter.native="handleFilter"
          class="filter-item"
          placeholder="请输入房屋编号"
          v-model="listQuery.FWBH"
          size="mini"
          clearable
        ></el-input>
      </el-col>
      <el-col :xs="5" :sm="4" :md="4" :lg="3" :xl="3">
        <el-input
          @keyup.enter.native="handleFilter"
          class="filter-item"
          placeholder="请输入房屋名称"
          v-model="listQuery.FWMC"
          size="mini"
          clearable
        ></el-input>
      </el-col>
      <el-col :xs="5" :sm="4" :md="4" :lg="3" :xl="3">
        <el-select v-model="listQuery.SSQY" size="mini" clearable>
          <el-option
            v-for="(item,key) in SSQYOptions"
            :key="key"
            :value="item.Code"
            :label="item.Name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :xs="5" :sm="4" :md="4" :lg="3" :xl="3">
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
      >
        <el-table-column label="房屋编号" prop="FWBH"></el-table-column>
        <el-table-column label="房屋名称" prop="FWMC"></el-table-column>
        <el-table-column
          v-for="(item,key) in ColumnList"
          :key="key"
          :label="item.Name+'不合格次数'"
          :prop="item.Code.replace(/\s+/g,'')"
        ></el-table-column>
      </el-table>
      <div style="text-align:center">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.page"
          :page-sizes="[10,20,30,40]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import { GetOptions } from "@/app_src/api/commonApi.js";
import { ShopCheckSummary } from "@/app_src/api/TJFX/BBTJ/ShopCheckSummary.js";
export default {
  name: "ShopCheckSummary",
  data() {
    return {
      listQuery: {
        FWBH: "",
        FWMC: "",
        date: "",
        page: 1,
        limit: 10
      },
      list: [],
      detailList: [],
      total: 0,
      spanArr: [],
      ColumnList: [],
      list: [],
      SSQYOptions: []
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
      ShopCheckSummary(this.listQuery).then(res => {
        if (res.data.code === 2000) {
          this.ColumnList = res.data.ColumnInfo;
          this.list = res.data.DataInfo;
          this.total = res.data.total;
        } else {
          this.$notify({
            position: "bottom-right",
            title: "失败",
            message: res.message,
            type: "error",
            duration: 3000
          });
        }
      });
    },
    getOptions() {
      let temp = {
        ParentCode: "SSQY"
      };
      GetOptions(temp).then(res => {
        if (res.data.code === 2000) {
          this.SSQYOptions = res.data.items;
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
    }
  },
  mounted() {
    this.getOptions();
    this.getList();
  }
};
</script>

<style scoped>
</style>