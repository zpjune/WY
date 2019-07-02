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
        icon="el-icon-search"
        @click="handleFilter"
        size="mini"
      >查询</el-button>
      <el-button
        class="filter-item"
        type="primary"
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
      <el-table-column align="center" width="400" label="操作" fixed="right">
      <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看详情</el-button>
          <el-button type="success" size="mini" @click="handleUpdate(scope.row)">确认通知单</el-button>
          <el-button type="danger" size="mini" @click="handlePush(scope.row)">催缴</el-button>
          <el-button type="warning" size="mini" @click="handleCreate(scope.row)">手动缴费确认</el-button>
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
         <el-dialog width="50%" title="缴费通知" :visible.sync="innerVisible" append-to-body>
      
<el-card class="box-card">
  <pre style="font-size:18px;padding:5px;">
  <span style="text-decoration:underline">尊敬的丰收道730号业主：</span>
  根据合同，该房屋已欠缴物业费，现请您务必在<span style="text-decoration:underline">2019年6月25日</span>前缴纳该房屋的物业费578.16元
  <span style="text-decoration:underline">（2019年1月1日至2019年6月30日）</span>请尽快到普丰物业公司（创新北里物业楼210室缴纳物业费）。
  缴费方式：刷借记卡、微信、支付宝。
  联系电话：63950600
  <label style="float:right">天津市普丰物业管理有限公司</label>
  <label  style="float:right">2019年5月27日</label>
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
export default {
  name: "JFJLCX",
  data() {
    return {
      listLoading: false,
      dialogStatus:"",
      listQuery: {
        QuYu: "",
        Name: ""
      },
      innerVisible:false,
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
      tableKey:0,
      temp: {
        yezhu:"",
        fanghao:"",
        jflx:"",
name:"",
jfrq:"",
jiaonajine:"",
YXQQ:"",
YXQZ:"",
REMARK:""
      },
      textMap: {
        update: "确认缴费",
        create: "手动缴费"
      },
      editVisible: false,
    };
  },
  methods: {
    handleFilter() {
       
    },
    resetTemp() {
      this.temp = {
        yezhu:"",
        fanghao:"",
        jflx:"",
name:"",
jfrq:"",
jiaonajine:"",
YXQQ:"",
YXQZ:"",
REMARK:""
      };
    },

    handleDetail(){
        this.DetailVisible=true;
    },
    handleDownload() {

    },
    handleDetail(data){
      this.innerVisible=true;
    },
 handleCreate() {
      this.resetTemp();
      this.editVisible = true;
      this.dialogStatus = "create";
      if (this.$refs["dataForm"] !== undefined) {
        this.$refs["dataForm"].resetFields();
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.editVisible = true;
      this.dialogStatus = "update";
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    tixingclick(){},
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
    handlePush()
    { var message = "催缴成功";
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
          });},
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

    },
    handleFilter() {
      this.listQuery.page = 1;

    },
  }
};
</script>
            
<style>
</style>
            