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

      <el-date-picker
        class="filter-item"
        v-model="dateQuery"
        type="daterange"
        range-separator="至"
        size="mini"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
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

      <el-table-column align="center" width="120px" label="房屋编号">
        <template slot-scope="scope">
          <span>{{scope.row.fanghao}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="房屋名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="业主姓名">
        <template slot-scope="scope">
          <span>{{scope.row.yezhu}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="业主电话">
        <template slot-scope="scope">
          <span>{{scope.row.yezhutel}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="缴费金额">
        <template slot-scope="scope">
          <span>{{scope.row.jiaonajine}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="是否发送通知单">
        <template slot-scope="scope">
          <span>{{scope.row.isfoutongzhi}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="催缴次数">
        <template slot-scope="scope">
          <span>{{scope.row.jfcs}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否缴费">
        <template slot-scope="scope">
          <span>{{scope.row.sfjf}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="费缴费日期">
        <template slot-scope="scope">
          <span>{{scope.row.jfrq}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="230" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">商户详情</el-button>
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
      style="text-align:center;"
    ></el-pagination>
    <el-dialog
      :visible.sync="editVisible"
      class="selecttrees"
      title="商户详情"
      width="70%"
    >
      <el-form ref="dataForm" :model="temp"  label-width="120px" style="width: 99%;">
        <el-card>
          <div slot="header">
            <span>商户信息</span>
          </div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="房屋编号">
                  <el-input v-model="temp.fanghao" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房屋名称">
                  <el-input size="small" v-model="temp.name" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="隶属分公司">
                  <el-select style="width:100%" size="small" v-model="temp.LSFGS" disabled>
                    <el-option :value="0" label="分公司1"></el-option>
                    <el-option :value="1" label="分公司2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="房屋面积">
                  <el-input size="small" v-model="temp.JZMJ" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="坐落位置">
                  <el-input size="small" v-model="temp.ZLWZ" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业基准日期">
                  <el-date-picker
                    style="width:100%"
                    format="yyyy-MM-dd"
                    size="small"
                    v-model="temp.jfrq"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="商户名称">
                  <el-input size="small" v-model="temp.SHMC"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业费标准">
                  <el-input size="small" v-model="temp.jiaonajine">
                    <template slot="append">元/月</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业缴纳方式">
                  <el-select style="width:100%" size="small" v-model="temp.JNFS">
                    <el-option :value="0" label="半年"></el-option>
                    <el-option :value="1" label="一年"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="经营内容" prop="JYNR">
                  <el-input v-model="temp.JYNR" type="textarea" :rows="3"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card style="margin-top:20px;">
          <div slot="header">
            <span>业主信息</span>
          </div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="业主姓名">
                  <el-input size="small" v-model="temp.yezhu"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业主类型">
                  <el-select style="width:100%" size="small" v-model="temp.YZLX">
                    <el-option :value="0" label="个人"></el-option>
                    <el-option :value="1" label="公司"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业主姓名">
                  <el-input size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号">
                  <el-input size="small" v-model="temp.YZSFZH"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码">
                  <el-input size="small" v-model="temp.yezhutel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="固定电话">
                  <el-input size="small" v-model="temp.YZGDDH"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="电子邮箱">
                  <el-input size="small" v-model="temp.YZDZYX"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用类型">
                  <el-select style="width:100%" size="small" v-model="temp.SYLEX">
                    <el-option :value="0" label="自用"></el-option>
                    <el-option :value="1" label="出租"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card style="margin-top:20px;" v-if="temp.SYLEX==1">
          <div slot="header">
            <span>租户信息</span>
          </div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="租户姓名">
                  <el-input size="small" v-model="temp.ZHXM"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="租户类型">
                  <el-select style="width:100%" size="small" v-model="temp.ZHLX">
                    <el-option :value="0" label="个人"></el-option>
                    <el-option :value="1" label="公司"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="租户性别">
                  <el-input size="small" v-model="temp.ZHXM"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号">
                  <el-input size="small" v-model="temp.ZHSFZH"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码">
                  <el-input size="small" v-model="temp.ZHSJHM"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="固定电话">
                  <el-input size="small" v-model="temp.ZHGDHM"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="电子邮箱">
                  <el-input size="small" v-model="temp.ZHDZYX"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-form>
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="editVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
            
<script>
import waves from "@/frame_src/directive/waves"; // 水波纹指令
export default {
  name: "JFJLCX",
  directives: {
    waves
  },
  data() {
    return {
      listLoading: false,
      downloadLoading: false,
      listQuery: {
        QuYu: "",
        Name: ""
      },
      dateQuery: "",
      editVisible:false,
      temp:{},
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
      anquan: "",
      value: "",
      list: [
        {
          jflx: "房租费",
          fanghao: "A-101",
          name: "商铺101",
          yezhu: "张三",
          yezhutel: "12309099991",
          jiaonajine: "210000",
          isfoutongzhi: "是",
          jfcs: "3",
          sfjf: "是",
          jfrq: "2019-06-30"
        },
        {
          jflx: "房租费",
          fanghao: "A-101",
          name: "商铺101",
          yezhu: "张三",
          yezhutel: "12309099991",
          jiaonajine: "210000",
          isfoutongzhi: "是",
          jfcs: "3",
          sfjf: "是",
          jfrq: "2019-06-30"
        },
        {
          jflx: "房租费",
          fanghao: "A-101",
          name: "商铺101",
          yezhu: "张三",
          yezhutel: "12309099991",
          jiaonajine: "210000",
          isfoutongzhi: "是",
          jfcs: "3",
          sfjf: "是",
          jfrq: "2019-06-30"
        },
        {
          jflx: "物业费",
          fanghao: "A-101",
          name: "商铺D101",
          yezhu: "王五",
          yezhutel: "12309099991",
          jiaonajine: "1700",
          isfoutongzhi: "是",
          jfcs: "3",
          sfjf: "是",
          jfrq: "2019-04-30"
        },
        {
          jflx: "房租费",
          fanghao: "A-101",
          name: "商铺101",
          yezhu: "张三",
          yezhutel: "12309099991",
          jiaonajine: "210000",
          isfoutongzhi: "是",
          jfcs: "3",
          sfjf: "是",
          jfrq: "2019-06-30"
        },
        {
          jflx: "房租费",
          fanghao: "A-101",
          name: "商铺101",
          yezhu: "张三",
          yezhutel: "12309099991",
          jiaonajine: "210000",
          isfoutongzhi: "是",
          jfcs: "3",
          sfjf: "是",
          jfrq: "2019-06-30"
        },
        {
          jflx: "物业费",
          fanghao: "E-101",
          name: "商铺E101",
          yezhu: "赵六",
          yezhutel: "12304099991",
          jiaonajine: "1100",
          isfoutongzhi: "是",
          jfcs: "3",
          sfjf: "是",
          jfrq: "2019-06-22"
        },
        {
          jflx: "房租费",
          fanghao: "A-101",
          name: "商铺101",
          yezhu: "张三",
          yezhutel: "12309099991",
          jiaonajine: "210000",
          isfoutongzhi: "是",
          jfcs: "3",
          sfjf: "是",
          jfrq: "2019-06-30"
        },
        {
          jflx: "物业费",
          fanghao: "C-101",
          name: "商铺C101",
          yezhu: "赵六",
          yezhutel: "14309099991",
          jiaonajine: "1800",
          isfoutongzhi: "是",
          jfcs: "3",
          sfjf: "否",
          jfrq: "2019-06-30"
        },
        {
          jflx: "物业费",
          fanghao: "D-101",
          name: "商铺D101",
          yezhu: "李四",
          yezhutel: "12309099991",
          jiaonajine: "2100",
          isfoutongzhi: "是",
          jfcs: "3",
          sfjf: "是",
          jfrq: "2019-05-30"
        }
      ],
      tableKey: 0
    };
  },
  methods: {
    handleUpdate(data){
      this.editVisible=true;
      this.temp=data;
    },
    handleFilter() {},
    handleDetail() {
      this.DetailVisible = true;
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleDownload() {},
    tixingclick() {},
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
            