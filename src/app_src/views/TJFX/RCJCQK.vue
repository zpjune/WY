<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select v-model="value" placeholder="请选择区域" size="mini" class="filter-item">
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
        v-model="listQuery.Name"
        size="mini"
      ></el-input>
 <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        class="filter-item"
        placeholder="请输入房号"
        v-model="listQuery.Name"
        size="mini"
      ></el-input>

<el-date-picker class="filter-item"
      v-model="dateQuery"
      type="daterange"
      range-separator="至"
      size="mini"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-select v-model="anquan" placeholder="请选择安全类型" size="mini" class="filter-item">
        <el-option
          v-for="item in anquanleixing"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        v-waves
        icon="el-icon-search"
        @click="handleFilter"
        size="mini"
      >查询</el-button>
      <el-button
        class="filter-item"
        type="primary"
        :loading="downloadLoading"
        v-waves
        icon="el-icon-download"
        @click="handleDownload"
        size="mini"
      >导出</el-button>
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
    >
      <el-table-column width="200px" align="center" label="区域名称">
        <template slot-scope="scope">
          <span>{{scope.row.quyu}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="房屋名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="200px"  label="房号">
        <template slot-scope="scope">
          <span>{{scope.row.fanghao}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="200px"  label="安全问题次数">
        <template slot-scope="scope">
          <span>{{scope.row.cishu}}</span>
        </template>
      </el-table-column>
       <el-table-column align="center" width="150px" label="操作">
              <template slot-scope="scope">
                <el-button type="primary"   size="mini" @click="handleDetail(scope.row)">详情</el-button>
              </template>
            </el-table-column>
    </el-table>
    <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="listQuery.page"
              :page-sizes="[10,20,30, 50]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="10"
            ></el-pagination>
    <el-dialog
      :visible.sync="DetailVisible"
      class="selecttrees"
      title="详情"
      width="700px"
    >
      <el-card>
       
         <el-table
      :key="tableKeydetail"
      :data="listdetail"
      :header-cell-class-name="tableRowClassName"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      size="mini"
      id="table"
    >
      <el-table-column width="120px" align="center" label="房屋名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px"  label="房号">
        <template slot-scope="scope">
          <span>{{scope.row.fanghao}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px"  label="安全问题类型">
        <template slot-scope="scope">
          <span>{{scope.row.leixing}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="安全问题描述">
        <template slot-scope="scope">
          <span>{{scope.row.miaoshu}}</span>
        </template>
      </el-table-column>
    </el-table>
      </el-card>
    </el-dialog>
  </div>
</template>
            
<script>
export default {
  name: "qyfzr",
  data() {
    return {
      listLoading: false,
      listQuery: {
        QuYu: "",
        Name: ""
      },
      dateQuery:"",
      options: [
        {
          value: "选项1",
          label: "港新新城"
        },
        {
          value: "选项2",
          label: "阳光家园"
        },
        {
          value: "选项3",
          label: "C区"
        }
      ],
      anquanleixing:[

      ],
      anquan :"",
      value: "",
      list: [
        {
          quyu: "港新新城",
          name: "日用品超市",
          fanghao: "2-203",
          cishu:"3"
        },
        {
          quyu: "阳光家园",
          name: "五金日用品百货",
          fanghao: "2-201",
          cishu:"5"
        },{
          quyu: "C区",
          name: "天天饭庄",
          fanghao: "1-202",
          cishu:"1"
        },{
          quyu: "港新新城",
          name: "日用品超市",
          fanghao: "4-203",
          cishu:"3"
        },{
          quyu: "阳光家园",
          name: "五金日用品百货",
          fanghao: "6-203",
          cishu:"4"
        },{
               quyu: "C区",
          name: "天天饭庄",
          fanghao: "7-203",
          cishu:"2"
        }
      ],
       listdetail: [
        {
          name: "日用品超市",
          fanghao:"2-201",
          leixing:"消防",
          miaoshu:"没有灭火器"
        },
        {
          name: "日用品超市",
          fanghao:"2-201",
          leixing:"消防",
          miaoshu:"水管破裂"
        },
        {
          name: "日用品超市",
          fanghao:"2-201",
          leixing:"安全",
          miaoshu:"房屋有裂痕"
        },
        {
          name: "日用品超市",
          fanghao:"2-201",
          leixing:"安全",
          miaoshu:"护栏老化"
        }
      ],
      DetailVisible: false,
      tableKey:0,
      tableKeydetail:0,
    };
  },
  methods: {
    handleFilter() {
       
    },
    handleDetail(){
        this.DetailVisible=true;
    },
    handleDownload() {

    },
    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    }
  }
};
</script>
            
<style>
</style>
            