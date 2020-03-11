
<template>
  <el-form ref="dataForm" :model="temp" :rules="rules" label-width="120px" style="width: 99%;" id="CZDAEDIT">
    <el-card style="margin-top:20px;">
      <div slot="header">
        <span>商户信息</span>
      </div>
      <div>
        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="房屋编号">
              <el-input v-model="temp.FWBH" disabled style="width:69%;"></el-input>
              <el-button
                size="small"
                type="primary"
                @click="GetHouseInfo"
                style="width:28%;margin-left:1%;"
              >选择房屋</el-button>
            </el-form-item> 
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="房屋名称">
              <el-input size="small" v-model="temp.FWMC" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="隶属分公司">
              <el-select
            v-model="temp.LSFGS"
            size="small"
            style="width:100%;"
            placeholder="隶属分公司"
            disabled
          >
            <el-option
              v-for="(item,key) in compOptions"
              :key="key"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="房屋面积">
              <el-input size="small" v-model="temp.JZMJ" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="坐落位置">
              <el-input size="small" v-model="temp.ZLWZ" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="物业基准日期">
              <el-date-picker
                style="width:100%"
                format="yyyy-MM-dd"
                size="small"
                v-model="temp.JZR"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="商户名称">
              <el-input size="small" v-model="temp.SHOP_NAME"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="物业费缴纳方式">
              <el-select style="width:100%" size="small" v-model="temp.JNFS">
                <el-option value="0" label="半年"></el-option>
                <el-option value="1" label="一年"></el-option>
                <el-option :value="2" label="全部"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="物业费标准">
              <el-input size="small" v-model="temp.WYFBZ">
                <template slot="append">元/月</template>
              </el-input>
            </el-form-item>
          </el-col>
          
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="经营内容" prop="JYNR">
              <el-input v-model="temp.JYNR" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card style="margin-top:20px;">
      <div slot="header">
        <span>租户信息</span>
      </div>
      <div>
        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="租户姓名">
              <el-input size="small" v-model="temp.ZHXM"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="租户类型">
              <el-select style="width:100%" size="small" v-model="temp.ZHLX">
                <el-option value="0" label="个人"></el-option>
                <el-option value="1" label="公司"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="租户性别">
              <el-select style="width:100%" size="small" v-model="temp.ZHXB">
                <el-option value="0" label="男"></el-option>
                <el-option value="1" label="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="身份证号">
              <el-input size="small" v-model="temp.ZHSFZH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="手机号码">
              <el-input size="small" v-model="temp.ZHSJHM"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="固定电话">
              <el-input size="small" v-model="temp.ZHGDDH"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="电子邮箱">
              <el-input size="small" v-model="temp.ZHDZYX"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card style="margin-top:20px;">
      <div slot="header">
        <span>租赁信息</span>
      </div>
      <div>
        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="租赁起始日期">
              <el-date-picker
                style="width:100%"
                format="yyyy-MM-dd"
                size="small"
                v-model="temp.ZLQSRQ"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="租赁终止日期">
              <el-date-picker
                style="width:100%"
                format="yyyy-MM-dd"
                size="small"
                v-model="temp.ZLZZRQ"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="租赁总额">
              <el-input size="small" v-model="temp.ZLZE"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="租赁押金">
              <el-input size="small" v-model="temp.ZLYJ"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="租赁月数">
              <el-input size="small" v-model="temp.ZLYS"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="缴费方式">
              <el-select style="width:100%" size="small" v-model="temp.JFFS">
                <el-option value="0" label="月度"></el-option>
                <el-option value="1" label="季度"></el-option>
                <el-option value="2" label="半年度"></el-option>
                <el-option value="3" label="年度"></el-option>
                <el-option value="3" label="全额"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <div style="text-align:center;margin-top:20px;margin-bottom:20px;">
      <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
      <el-button v-else type="primary" @click="updateData">保存</el-button>
      <el-button @click="closetab">取消</el-button>
      <!-- <el-button type="success">提交</el-button> -->
    </div>
    <el-dialog width="50%" title="房屋信息" :visible.sync="innerVisible" append-to-body>
      <el-table
        :key="tableKey"
        :data="list2"
        size="mini"
        @row-click="showRow"
        :header-cell-class-name="tableRowClassName"
        v-loading="listLoading"
        element-loading-text="给我一点时间"
        border
        fit
        highlight-current-row
        style="width: 100%;text-align:left;"
      >
        <el-table-column align="center" label="选择" width="50px">
          <template slot-scope="scope">
            <el-radio class="radio" v-model="radio" :label="scope.$index">&nbsp;</el-radio>
            <!-- <el-radio :label="scope.row.flagIndex" v-model="scope.row.flagValue" @change.native="getTemplateRow(scope.$index,scope.row)"></el-radio> -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="房屋编号">
          <template slot-scope="scope">
            <span>{{scope.row.FWBH}}</span>
          </template>
        </el-table-column>

        <el-table-column label="房屋名称" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.FWMC}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" prop="JZMJ" label="建筑面积">
          <template slot-scope="scope">
            <span>{{scope.row.JZMJ}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" prop="LSFGS" label="隶属分公司">
          <template slot-scope="scope">
            <span>{{scope.row.LSFGS}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" prop="ZLWZ" label="坐落位置">
          <template slot-scope="scope">
            <span>{{scope.row.ZLWZ}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" prop="FZFJE" label="结构类型">
          <template slot-scope="scope">
            <span>{{scope.row.JGLX }}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" prop="WYFJE" label="资产原值">
          <template slot-scope="scope">
            <span>{{scope.row.ZCYZ |NumFormat}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-form>
</template>



<script>
// import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
import { GetHouseInfo } from "@/app_src/api/SHDAGL/FWDA";
export default {
  name: "CZSHDA",
  directives: {
    waves
  },
  //   components: {
  //     Treeselect
  //   },
  data() {
    
    return {
      listQueryHouseInfo: {
        FWMC: "",
        LSFGS: "",
        FWSX: 0,
        limit: 10,
        page: 1,
        baseURL: process.env.BASE_API + "/UploadFiles/HouseImg//"
      },
      usedOptions: [
        {
          value: "0",
          name: "出租"
        },
        {
          value: "1",
          name: "出售"
        }
      ],
      compOptions: [
        {
          value: "0",
          name: "分公司一"
        },
        {
          value: "1",
          name: "分公司二"
        }
      ],

      innerVisible: false,
      radio: "",
      selected: {},

      tableKey: 0,
      selectOptions: [
        {
          value: 0,
          label: "出售"
        },
        {
          value: 1,
          label: "出租"
        }
      ],
      areaOptions: [
        {
          value: 0,
          label: "A区"
        },
        {
          value: 1,
          label: "B区"
        },
        {
          value: 2,
          label: "C区"
        },
        {
          value: 3,
          label: "D区"
        }
      ],
      list2: [ ],

      rules: {
        FWBH: [
          { required: true, message: "请输入房屋名称", trigger: "change" }
        ],
        JZR: [{ required: true, message: "物业基准日期", trigger: "change" }]
        // FZFJE: [
        //   { required: true, message: "请输入房租金额", trigger: "change" }
        // ],
        // WYFJE: [
        //   { required: true, message: "请输入物业费金额", trigger: "change" }
        // ]
      },
      total: 15,
      listLoading: false,
      listQuery: {
        limit: 10,
        page: 1,
        S_OrgCode: null,
        SYLX: "",
        TaxOffice: "",
        ImportModel: "",
        TaxNumber: "",
        OrgRegion: ""
      },
      temp: {
        FWBH: "",
        FWMC: "",
        LSFGS: "",
        JZMJ: "",
        ZLWZ: "",
        JZR: "",
        SHOP_NAME: "",
        WYFBZ: "",
        JNFS: "",
        JYNR: "",
        ZHXM: "",
        ZHLX: "",
        ZHXB: "",
        ZHSFZH: "",
        ZHSJHM: "",
        ZHGDDH: "",
        ZHDZYX: "",
        ZLQSRQ: "",
        ZLZZRQ: "",
        ZLZE: "",
        ZLYJ: "",
        ZLYS: "",
        JFFS: "",
        USE_TYPE:1,
        IS_SUBLET:0
      },
      textMap: {
        update: "修改房屋信息",
        create: "添加房屋信息"
      },
      editVisible: false,
      dialogStatus: "",

    };
  },
  methods: {
    GetHouseInfo(){
      this.innerVisible=true;
      GetHouseInfo(this.listQueryHouseInfo).then(res=>{
        if(res.data.code===2000){
          this.list2=res.data.items;
          this.total = res.data.totoal;
        }
      })
    },
    showRow(row) {
      //赋值给radio
      this.radio = this.list2.indexOf(row);
      this.selected = row;
      this.temp = row;
      this.innerVisible = false;
    },

    resetTemp() {
      this.temp = {
        FWBH: "",
        FWMC: "",
        LSFGS: "",
        FWMJ: "",
        ZLWZ: "",
        JZR: "",
        SHMC: "",
        WYFBZ: "",
        JNFS: "",
        JYNR: "",
        ZHXM: "",
        ZHLX: "",
        ZHXB: "",
        ZHSFZH: "",
        ZHSJHM: "",
        ZHGDDH: "",
        ZHDZYX: "",
        ZLQSRQ: "",
        ZLZZRQ: "",
        ZLZE: "",
        ZLYJ: "",
        ZLYS: "",
        JFFS: ""
      };
    },
    closetab() {
      //   window.opener = null;
      // window.open("", "_top").close();
      this.$store.dispatch("delVisitedViews", this.$route);
      this.$router.go(-1);
    },
    getList() {
      //   this.listLoading = true;
      //   getTaxOrgList(this.listQuery).then(response => {
      //     if (response.data.code === 2000) {
      //       this.list = response.data.items;
      this.total = 15;
      //       this.listLoading = false;
      //     } else {
      //       this.listLoading = false;
      //       this.$notify({
      //         position: "bottom-right",
      //         title: "失败",
      //         message: response.data.message,
      //         type: "error",
      //         duration: 2000
      //       });
      //     }
      //   });
    },


    handleDelete(row) {
      this.$confirm("确认删除信息吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //   const query = { S_ID: row.S_Id };
          //   deleteTaxOrg(query).then(response => {
          //     this.message = response.data.message;
          //     this.title = "失败";
          //     this.type = "error";
          //     if (response.data.code === 2000) {
          //       // const index = this.list.indexOf(row)
          //       // this.list.splice(index, 1)
          this.getList();
          this.title = "成功";
          this.type = "success";
          //     }
          this.$notify({
            position: "bottom-right",
            title: this.title,
            message: this.message,
            type: this.type,
            duration: 2000
          });
          //   });
        })
        .catch(() => {});
    },
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
          this.getList();
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
        this.closetab();
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
          this.getList();
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
        this.closetab();
      });
    },
   
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    }
  },
  created() {
    var param = this.$route.query.param;
    if(param!=null){
    console.log(param.YZXM);
    }
    else{
      this.resetTemp();
    }
  },

  computed: {
    getRoleLevel() {
      if (this.$store.state.user.roleLevel === "admin") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" >
#CZDAEDIT {
  input:disabled,textarea:disabled{
    opacity: 1;
    -webkit-text-fill-color: #000;
  }
}
</style>

