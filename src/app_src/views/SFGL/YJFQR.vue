<template>
  <div id="JFJLCX" class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select v-model="value" placeholder="缴费类型" size="mini" class="filter-item">
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
      <el-table-column width="150px" align="center" label="缴费类型">
        <template slot-scope="scope">
          <span>{{scope.row.jflx}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120px"  label="房屋编号">
        <template slot-scope="scope">
          <span>{{scope.row.fanghao}}</span>
        </template>
      </el-table-column>
            <el-table-column width="150px" align="center" label="房屋名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
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
     
      <el-table-column align="center"   label="缴费金额">
        <template slot-scope="scope">
          <span>{{scope.row.jiaonajine}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px"  label="是否发送通知单">
        <template slot-scope="scope">
          <span>{{scope.row.isfoutongzhi}}</span>
        </template>
      </el-table-column>
       <el-table-column align="center" width="120px"  label="催缴次数">
        <template slot-scope="scope">
          <span>{{scope.row.jfcs}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="是否缴费">
        <template slot-scope="scope">
          <span>{{scope.row.sfjf}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px"  label="费缴费日期">
        <template slot-scope="scope">
          <span>{{scope.row.jfrq}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="240" label="操作" fixed="right">
      <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">查看详情</el-button>
          <el-button type="success" size="mini" @click="handleUpdate(scope.row)">缴费完成确认</el-button>

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
          value: "物业费",
          label: "物业费"
        },
        {
          value: "房租费",
          label: "房租费"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      anquan :"",
      value: "",
      list: [
        {
          jflx:"房租费",
fanghao:"A-101",
name:"商铺101",
yezhu:"张三",
yezhutel:"12309099991",
jiaonajine:"210000",
isfoutongzhi:"是",
jfcs:"3",
sfjf:"是",
jfrq:"2019-06-30"
        },
        {
                   jflx:"房租费",
fanghao:"A-101",
name:"商铺101",
yezhu:"张三",
yezhutel:"12309099991",
jiaonajine:"210000",
isfoutongzhi:"是",
jfcs:"3",
sfjf:"是",
jfrq:"2019-06-30"
        },{
                   jflx:"房租费",
fanghao:"A-101",
name:"商铺101",
yezhu:"张三",
yezhutel:"12309099991",
jiaonajine:"210000",
isfoutongzhi:"是",
jfcs:"3",
sfjf:"是",
jfrq:"2019-06-30"
        },{
                  jflx:"物业费",
fanghao:"A-101",
name:"商铺D101",
yezhu:"王五",
yezhutel:"12309099991",
jiaonajine:"1700",
isfoutongzhi:"是",
jfcs:"3",
sfjf:"是",
jfrq:"2019-04-30"
        },{
                    jflx:"房租费",
fanghao:"A-101",
name:"商铺101",
yezhu:"张三",
yezhutel:"12309099991",
jiaonajine:"210000",
isfoutongzhi:"是",
jfcs:"3",
sfjf:"是",
jfrq:"2019-06-30"
        },{
                   jflx:"房租费",
fanghao:"A-101",
name:"商铺101",
yezhu:"张三",
yezhutel:"12309099991",
jiaonajine:"210000",
isfoutongzhi:"是",
jfcs:"3",
sfjf:"是",
jfrq:"2019-06-30"
        },{
                   jflx:"物业费",
fanghao:"E-101",
name:"商铺E101",
yezhu:"赵六",
yezhutel:"12304099991",
jiaonajine:"1100",
isfoutongzhi:"是",
jfcs:"3",
sfjf:"是",
jfrq:"2019-06-22"
        },{
                    jflx:"房租费",
fanghao:"A-101",
name:"商铺101",
yezhu:"张三",
yezhutel:"12309099991",
jiaonajine:"210000",
isfoutongzhi:"是",
jfcs:"3",
sfjf:"是",
jfrq:"2019-06-30"
        },{
                   jflx:"物业费",
fanghao:"C-101",
name:"商铺C101",
yezhu:"赵六",
yezhutel:"14309099991",
jiaonajine:"1800",
isfoutongzhi:"是",
jfcs:"3",
sfjf:"否",
jfrq:"2019-06-30"
        },{
                    jflx:"物业费",
fanghao:"D-101",
name:"商铺D101",
yezhu:"李四",
yezhutel:"12309099991",
jiaonajine:"2100",
isfoutongzhi:"是",
jfcs:"3",
sfjf:"是",
jfrq:"2019-05-30"
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
            