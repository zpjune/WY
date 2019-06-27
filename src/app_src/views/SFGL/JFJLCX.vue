<template>
  <div id="JFJLCX" class="app-container calendar-list-container">
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
      <el-table-column width="150px" align="center" label="区域名称">
        <template slot-scope="scope">
          <span>{{scope.row.quyu}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="房屋名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px"  label="房号">
        <template slot-scope="scope">
          <span>{{scope.row.fanghao}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px"  label="业主姓名">
        <template slot-scope="scope">
          <span>{{scope.row.yezhu}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px"  label="业主电话">
        <template slot-scope="scope">
          <span>{{scope.row.yezhutel}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px"  label="租户姓名">
        <template slot-scope="scope">
          <span>{{scope.row.zuhu}}</span>
        </template>
      </el-table-column>
       <el-table-column align="center" width="120px"  label="租户电话">
        <template slot-scope="scope">
          <span>{{scope.row.zuhutel}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="房租费">
        <template slot-scope="scope">
          <span>{{scope.row.fangzufei}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px"  label="已缴房租费">
        <template slot-scope="scope">
          <span>{{scope.row.isfangzufei}}</span>
        </template>
      </el-table-column>
       <el-table-column align="center" width="120px"  label="房租费缴费日期">
        <template slot-scope="scope">
          <span>{{scope.row.fangzuriqi}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="物业费">
        <template slot-scope="scope">
          <span>{{scope.row.wuyefei}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px"  label="已缴物业费">
        <template slot-scope="scope">
          <span>{{scope.row.iswuyefei}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px"  label="物业费缴费日期">
        <template slot-scope="scope">
          <span>{{scope.row.wuyefeiriqi}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="装修押金">
        <template slot-scope="scope">
          <span>{{scope.row.zhuangxiuyajin}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px"  label="装修押金缴费日期">
        <template slot-scope="scope">
          <span>{{scope.row.iszhuangxiuyajin}}</span>
        </template>
      </el-table-column>
       <el-table-column align="center" width="120px"  label="装修押金缴费日期">
        <template slot-scope="scope">
          <span>{{scope.row.zhuangxiuyajinriqi}}</span>
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
    
  </div>
</template>
            
<script>
export default {
  name: "JFJLCX",
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
          label: "A区"
        },
        {
          value: "选项2",
          label: "B区"
        },
        {
          value: "选项3",
          label: "C区"
        }
      ],
      anquan :"",
      value: "",
      list: [
        {
          quyu: "A区",
          name: "",
          fanghao: "2-203",
          yezhu:"张三",
          yezhutel:"13333333333",
          zuhu:"李四",
          zuhutel:"13444444444",
          fangzufei:"6000",
          isfangzufei:"6000",
          wuyefei:"4000",
          iswuyefei:"",
          zhuangxiuyajin:"3500",
          iszhuangxiuyajin:"",
          fangzuriqi:"2019-06-30",
          wuyefeiriqi:"2019-05-30",
          zhuangxiuyajinriqi:"2019-06-30"
        },
        {
          quyu: "A区",
          name: "",
          fanghao: "2-203",
          yezhu:"王五",
          yezhutel:"18562532541",
          zuhu:"马六",
          zuhutel:"14526548524",
          fangzufei:"6000",
          isfangzufei:"",
          wuyefei:"4000",
          iswuyefei:"4000",
          zhuangxiuyajin:"3500",
          iszhuangxiuyajin:"",
          fangzuriqi:"2019-06-30",
          wuyefeiriqi:"2019-05-30",
          zhuangxiuyajinriqi:"2019-06-30"
        },{
          quyu: "B区",
          name: "",
          fanghao: "2-203",
          yezhu:"张爱玲",
          yezhutel:"18685626585",
          zuhu:"",
          zuhutel:"",
          fangzufei:"6000",
          isfangzufei:"",
          wuyefei:"4000",
          iswuyefei:"4000",
          zhuangxiuyajin:"3500",
          iszhuangxiuyajin:"",
          fangzuriqi:"2019-06-30",
          wuyefeiriqi:"2019-05-30",
          zhuangxiuyajinriqi:"2019-06-30"
        },{
          quyu: "B区",
          name: "",
          fanghao: "2-203",
          yezhu:"张虎",
          yezhutel:"13333333333",
          zuhu:"",
          zuhutel:"",
          fangzufei:"6000",
          isfangzufei:"6000",
          wuyefei:"4000",
          iswuyefei:"",
          zhuangxiuyajin:"3500",
          iszhuangxiuyajin:"",
          fangzuriqi:"2019-06-30",
          wuyefeiriqi:"2019-05-30",
          zhuangxiuyajinriqi:"2019-06-30"
        },{
          quyu: "C区",
          name: "",
          fanghao: "2-203",
          yezhu:"张三",
          yezhutel:"13333333333",
          zuhu:"李四",
          zuhutel:"13444444444",
          fangzufei:"6000",
          isfangzufei:"否",
          wuyefei:"4000",
          iswuyefei:"是",
          zhuangxiuyajin:"3500",
          iszhuangxiuyajin:"",
          fangzuriqi:"2019-06-30",
          wuyefeiriqi:"2019-05-30",
          zhuangxiuyajinriqi:"2019-06-30"
        },{
          quyu: "D区",
          name: "",
          fanghao: "2-203",
          yezhu:"王笑",
          yezhutel:"13565698565",
          zuhu:"",
          zuhutel:"",
          fangzufei:"6000",
          isfangzufei:"6000",
          wuyefei:"4000",
          iswuyefei:"",
          zhuangxiuyajin:"3500",
          iszhuangxiuyajin:"",
          fangzuriqi:"2019-06-30",
          wuyefeiriqi:"2019-05-30",
          zhuangxiuyajinriqi:"2019-06-30"
        },{
          quyu: "G区",
          name: "",
          fanghao: "2-203",
          yezhu:"马小瑶",
          yezhutel:"13569856325",
          zuhu:"",
          zuhutel:"",
          fangzufei:"6000",
          isfangzufei:"",
          wuyefei:"4000",
          iswuyefei:"4000",
          zhuangxiuyajin:"3500",
          iszhuangxiuyajin:"",
          fangzuriqi:"2019-06-30",
          wuyefeiriqi:"2019-05-30",
          zhuangxiuyajinriqi:"2019-06-30"
        },{
          quyu: "F区",
          name: "",
          fanghao: "2-203",
          yezhu:"将大大",
          yezhutel:"13856854585",
          zuhu:"",
          zuhutel:"",
          fangzufei:"6000",
          isfangzufei:"",
          wuyefei:"4000",
          iswuyefei:"",
          zhuangxiuyajin:"3500",
          iszhuangxiuyajin:"3500",
          fangzuriqi:"2019-06-30",
          wuyefeiriqi:"2019-05-30",
          zhuangxiuyajinriqi:"2019-06-30"
        },{
          quyu: "A区",
          name: "",
          fanghao: "2-203",
          yezhu:"张三",
          yezhutel:"13333333333",
          zuhu:"李四",
          zuhutel:"13444444444",
          fangzufei:"6000",
          isfangzufei:"6000",
          wuyefei:"4000",
          iswuyefei:"",
          zhuangxiuyajin:"3500",
          iszhuangxiuyajin:"",
          fangzuriqi:"2019-06-30",
          wuyefeiriqi:"2019-05-30",
          zhuangxiuyajinriqi:"2019-06-30"
        },{
          quyu: "A区",
          name: "",
          fanghao: "2-203",
          yezhu:"张三",
          yezhutel:"13333333333",
          zuhu:"李四",
          zuhutel:"13444444444",
          fangzufei:"6000",
          isfangzufei:"",
          wuyefei:"4000",
          iswuyefei:"4000",
          zhuangxiuyajin:"3500",
          iszhuangxiuyajin:"",
          fangzuriqi:"2019-06-30",
          wuyefeiriqi:"2019-05-30",
          zhuangxiuyajinriqi:"2019-06-30"
        }
      ],
      tableKey:0
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
    tixingclick(){},
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
            