
<template>
  <el-form
    ref="dataForm"
    :model="temp"
    :rules="rules"
    label-width="120px"
    style="width: 99%;"
    id="CZDAEDIT"
  >
    <el-card style="margin-top:20px;">
      <div slot="header">
        <span>房屋信息</span>
      </div>
      <div>
        <el-row>

          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="房屋编号" prop="FWBH">
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
              <el-input v-model="temp.Name" disabled></el-input>
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
            <el-form-item label="租户姓名" prop="ZHXM">
              <el-input size="small" v-model="temp.ZHXM"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="租户类型" prop="ZHLX">
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
              <el-input size="small" v-model="temp.SFZH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="手机号码" prop="MOBILE_PHONE">
              <el-input size="small" v-model="temp.MOBILE_PHONE"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="固定电话">
              <el-input size="small" v-model="temp.TELEPHONE"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="电子邮箱">
              <el-input size="small" v-model="temp.E_MAIL"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="商户编号" >
              <el-input size="small" v-model="temp.SHOPBH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="商户名称" prop="SHOP_NAME">
              <el-input size="small" v-model="temp.SHOP_NAME"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="装修押金">
              <el-input size="small" v-model="temp.ZXYJ"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="缴费时间">
              <el-date-picker
                style="width:100%"
                size="mini"
                v-model="temp.ZXYJJFSJ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="退费时间">
              <el-date-picker
                style="width:100%"
                size="mini"
                v-model="temp.ZXYJTFSJ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="消防保证金">
              <el-input size="small" v-model="temp.XFBZJ"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="缴费时间">
              <el-date-picker
                style="width:100%"
                size="mini"
                v-model="temp.XFBZJJFSJ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="退费时间">
              <el-date-picker
                style="width:100%"
                size="mini"
                v-model="temp.XFBZJTFSJ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="违约保证金">
              <el-input size="small" v-model="temp.WYBZJ"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="缴费时间">
              <el-date-picker
                style="width:100%"
                size="mini"
                v-model="temp.WYBZJJFSJ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="退费时间">
              <el-date-picker
                style="width:100%"
                size="mini"
                v-model="temp.WYBZJTFSJ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="经营内容" >
              <el-input v-model="temp.JYNR" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card style="margin-top:20px;">
      <div slot="header">
        <span>物业信息</span>
      </div>
      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="物业费缴纳方式" prop="WYJFFS">
            <el-select style="width:100%" size="small" v-model="temp.WYJFFS">
              <el-option
                v-for="(item,key) in PAY_WAYOPTIONS"
                :key="key"
                :value="item.Code"
                :label="item.Name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="物业费标准" prop="WYDJ">
            <el-input size="small" v-model="temp.WYDJ">
              <template slot="append">元/平/月</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="物业基准日期" prop="WYJZSJ">
            <el-date-picker
              style="width:100%"
              size="mini"
              v-model="temp.WYJZSJ"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
         <el-col :span=8>
           <el-form-item label="物业费备注" >
            <el-input size="small" v-model="temp.REMARK">
            </el-input>
          </el-form-item>
         </el-col>
      </el-row>
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
                value-format="yyyy-MM-dd"
                size="small"
                v-model="temp.ZLKSSJ"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="租赁终止日期">
              <el-date-picker
                style="width:100%"
                value-format="yyyy-MM-dd"
                size="small"
                v-model="temp.ZLZZSJ"
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
              <el-input size="small" v-model.number="temp.ZLYS"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="缴费方式">
              <el-select style="width:100%" size="small" v-model="temp.ZJJFFS">
                <el-option
                  v-for="(item,key) in PAY_WAYOPTIONS"
                  :key="key"
                  :value="item.Code"
                  :label="item.Name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <div style="text-align:center;margin-top:20px;margin-bottom:20px;">
      <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
      <el-button v-else type="primary" @click="updateData">修改</el-button>
      <el-button @click="closetab">取消</el-button>
      <!-- <el-button type="success">提交</el-button> -->
    </div>
    <el-dialog
      width="80%"
      title="房屋信息"
      :visible.sync="innerVisible"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-row>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-input
            placeholder="房屋编号"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQueryHouseInfo.FWBH"
          ></el-input>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <el-input
            placeholder="房屋名称"
            style="width:95%;"
            size="mini"
            clearable
            v-model="listQueryHouseInfo.FWMC"
          ></el-input>
        </el-col>
        <el-col :xs="10" :sm="9" :md="8" :lg="7" :xl="6">
          <el-button
            size="mini"
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="GetHouseInfo"
          >搜索</el-button>
        </el-col>
      </el-row>
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
        <el-table-column align="right" prop="LSF" label="隶属分公司"></el-table-column>
        <el-table-column align="right" prop="ZLWZ" label="坐落位置">
          <template slot-scope="scope">
            <span>{{scope.row.ZLWZ}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" prop="JG" label="结构类型"></el-table-column>
        <el-table-column align="right" prop="WYFJE" label="资产原值">
          <template slot-scope="scope">
            <span>{{scope.row.ZCYZ |NumFormat}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQueryHouseInfo.page"
          :page-sizes="[10,20,30, 50]"
          :page-size="listQueryHouseInfo.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-dialog>
  </el-form>
</template>



<script>
// import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
import { GetHouseInfo } from "@/app_src/api/SHDAGL/FWDA";
import {
  CreateShopInfo,
  GetShopInfoDetail,
  UpdateShopInfo
} from "@/app_src/api/SHDAGL/SHOPDA";
import { GetOptions } from "@/app_src/api/commonApi";
export default {
  name: "CZSHDA",
  directives: {
    waves
  },
  //   components: {
  //     Treeselect
  //   },
  data() {
    const validateDecimal = (rule, value, callback) => {
      const reg = /^\d+\.?\d*$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error("请输入正确的数字！"));
      }
    };
    const validateIDNumber = (rule, value, callback) => {
      const reg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("身份证输入错误！"));
      }
    };
    const validateMonth = (rule, value, callback) => {
      if (value >= 1) {
        callback();
      } else {
        return callback(new Error("请输入正确的月份!"));
      }
    };
    return {
      listQueryHouseInfo: {
        FWBH: "",
        FWMC: "",
        LSFGS: "",
        FWSX: 0,
        limit: 10,
        page: 1,
        baseURL: process.env.BASE_API + "/UploadFiles/HouseImg//",
        ORG_CODE: this.$store.state.user.orgCode
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
      total: 0,
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
      list2: [],

      rules: {
        FWBH: [{ required: true, message: "房屋编号", trigger: "change" }],
        JZR: [{ required: true, message: "物业基准日期", trigger: "change" }],
        WYJFFS: [
          { required: true, message: "请选择缴费方式", trigger: "change" }
        ],
        WYJZSJ: [
          { required: true, message: "请填写物业基准时间", trigger: "change" }
        ],
        WYJZ: [
          { required: true, message: "请填写物业基准费用", trigger: "change" },
          {
            validator: validateDecimal,
            message: "请填写正确的数字",
            trigger: "change"
          }
        ],
        ZHXM: [
          { required: true, message: "请填写租户姓名", trigger: "change" }
        ],
        ZHXB: [
          { required: true, message: "请填写租户性别", trigger: "change" }
        ],
        MOBILE_PHONE: [
          { required: true, message: "请填写租户手机号", trigger: "change" }
        ],
        ZHLX: [
          { required: true, message: "请填写租户类型", trigger: "change" }
        ],
        WYJZ: [
          { required: true, message: "请填写物业基准费用", trigger: "change" },
          {
            validator: validateDecimal,
            message: "请填写正确的数字",
            trigger: "change"
          }
        ],
        WYDJ: [
          { required: true, message: "请填写物业基准费用", trigger: "change" },
          {
            validator: validateDecimal,
            message: "请填写正确的数字",
            trigger: "change"
          }
        ],
        SHOPBH: [
          { required: true, message: "请填写商铺编号", trigger: "change" }
        ],
        SFZH: [
          { required: true, message: "请填写身份证号", trigger: "change" },
          {
            validator: validateIDNumber,
            message: "请输入正确的身份证号!",
            trigger: "change"
          }
        ],
        SHOP_NAME: [
          { required: true, message: "请填写商铺名称", trigger: "change" }
        ],
        ZLKSSJ: [
          { required: true, message: "请填写租赁开始时间", trigger: "change" }
        ],
        ZLZZSJ: [
          { required: true, message: "请填写租赁结束时间", trigger: "change" }
        ],
        ZLZE: [
          { required: true, message: "请填写租赁总额", trigger: "change" },
          {
            validator: validateDecimal,
            message: "请填写正确的数字",
            trigger: "change"
          }
        ],
        ZLYJ: [
          { required: true, message: "请填写租赁押金", trigger: "change" },
          {
            validator: validateDecimal,
            message: "请填写正确的数字",
            trigger: "change"
          }
        ],
        ZLYS: [
          { required: true, message: "请填写租赁月数", trigger: "change" },
          { type: "number", message: "请填写数字", trigger: "change" },
          { validator: validateMonth, message: "请填写正确的月份范围" }
        ],
        ZJJFFS: [
          { required: true, message: "请填写租赁缴费方式", trigger: "change" }
        ],
        ZXYJ: [
          {
            validator: validateDecimal,
            message: "请填写正确的数字",
            trigger: "change"
          }
        ],
        XFBZJ: [
          {
            validator: validateDecimal,
            message: "请填写正确的数字",
            trigger: "change"
          }
        ]
      },
      total: 0,
      PAY_WAYOPTIONS: [],
      listLoading: false,
      temp: {
        //以下是房屋字段
        FWID: "",
        FWMC: "",
        FWBH: "",
        Name: "",
        JZMJ: "",
        ZLWZ: "",
        OLDID: "",
        //以下是物业信息
        FEE_ID: "",
        WYJFFS: "",
        WYJZSJ: "",
        WYJZ: "",
        WYDJ: "",
        REMARK:"",
        //以下是商户信息
        CZ_SHID: "",
        ZHXM: "",
        ZHLX: "",
        ZHXB: "",
        SFZH: "",
        MOBILE_PHONE: "",
        TELEPHONE: "",
        E_MAIL: "",
        SHOPBH: "",
        SHOP_NAME: "",
        JYNR: "",
        IS_SUBLET: 0,
        ZXYJ: "",
        ZXYJJFSJ: "",
        ZXYJTFSJ: "",
        XFBZJ: "",
        XFBZJJFSJ: "",
        XFBZJTFSJ: "",
        WYBZJ:"",
        WYBZJJFSJ:"",
        WYBZJTFSJ:"",
        //以下是租赁信息
        LEASE_ID: "",
        ZLKSSJ: "",
        ZLZZSJ: "",
        ZLZE: "",
        ZLYJ: "",
        ZLYS: "",
        ZJJFFS: "",
        //以下是基础信息
        userId: this.$store.state.user.userId,
        userType: 1 //出租用户
      },
      textMap: {
        update: "修改房屋信息",
        create: "添加房屋信息"
      },
      editVisible: false,
      dialogStatus: "create"
    };
  },
  methods: {
    GetHouseInfo() {
      this.innerVisible = true;
      //this.temp.OLDID = this.temp.FWID;
      GetHouseInfo(this.listQueryHouseInfo).then(res => {
        if (res.data.code === 2000) {
          this.list2 = res.data.items;
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.listQueryHouseInfo.limit = val;
      this.GetHouseInfo();
    },
    handleCurrentChange(val) {
      this.listQueryHouseInfo.page = val;
      this.GetHouseInfo();
    },
    GetOptions() {
      let temp = {
        ParentCode: "PAY_WAY"
      };
      GetOptions(temp).then(res => {
        if (res.data.code === 2000) {
          this.PAY_WAYOPTIONS = res.data.items;
        }
      });
    },
    showRow(row) {
      //赋值给radio
      this.radio = this.list2.indexOf(row);
      this.selected = row;
      this.temp.FWID = row.FWID;
      this.temp.FWBH = row.FWBH;
      this.temp.FWMC = row.FWMC;
      this.temp.Name = row.LS;
      this.temp.JZMJ = row.JZMJ;
      this.temp.ZLWZ = row.ZLWZ;
      //this.temp.OLDID = row.OLDID;
      this.innerVisible = false;
    },

    resetTemp() {
      this.temp = {
        FWID: "",
        FWMC: "",
        FWBH: "",
        Name: "",
        JZMJ: "",
        ZLWZ: "",
        OLDID: "",
        //以下是物业信息
        FEE_ID: "",
        WYJFFS: "",
        WYJZSJ: "",
        WYJZ: "",
        WYDJ: "",
        REMARK:"",
        //以下是商户信息
        CZ_SHID: "",
        ZHXM: "",
        ZHLX: "",
        ZHXB: "",
        SFZH: "",
        MOBILE_PHONE: "",
        TELEPHONE: "",
        E_MAIL: "",
        SHOPBH: "",
        SHOP_NAME: "",
        JYNR: "",
        IS_SUBLET: 0,
        ZXYJ: "",
        ZXYJJFSJ: "",
        ZXYJTFSJ: "",
        XFBZJ: "",
        XFBZJJFSJ: "",
        XFBZJTFSJ: "",
         WYBZJ:"",
        WYBZJJFSJ:"",
        WYBZJTFSJ:"",
        //以下是租赁信息
        LEASE_ID: "",
        ZLKSSJ: "",
        ZLZZSJ: "",
        ZLZE: "",
        ZLYJ: "",
        ZLYS: "",
        ZJJFFS: "",
        //以下是基础信息
        userId: this.$store.state.user.userId,
        userType: 1
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
          CreateShopInfo(this.temp).then(response => {
            var message = response.data.message;
            if (response.data.code === 2000) {
              //this.getList();
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: message,
                type: "success",
                duration: 3000
              });
              this.closetab();
              this.editVisible = false;
            } else {
              this.$notify({
                position: "bottom-right",
                title: "失败",
                message: message,
                type: type,
                duration: 3000
              });
            }
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp); // 这样就不会共用同一个对象
          tempData.userId = this.$store.state.user.userId;
          tempData.userType = 1;
          UpdateShopInfo(tempData).then(response => {
            if (response.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: response.data.message,
                type: "success",
                duration: 3000
              });
              this.closetab();
            } else {
              this.editVisible = false;
              this.$notify({
                position: "bottom-right",
                title: "失败",
                message: response.data.message,
                type: "error",
                duration: 3000
              });
            }
          });
        }
      });
    },

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    GetEditData() {
      if (
        this.$route.query.param != undefined &&
        this.$route.query.param != ""
      ) {
        this.dialogStatus = "update";
        let listQuery = {
          CZ_SHID: this.$route.query.param
        };
        GetShopInfoDetail(listQuery).then(res => {
          if (res.data.code === 2000) {
            this.temp = res.data.items[0];
            this.$nextTick(() => {
              this.$refs["dataForm"].clearValidate();
            });
          }
        });
      } else {
        this.dialogStatus = "create";
      }
    }
  },
  created() {
    this.GetEditData();
    this.GetOptions();
  },

  computed: {
    getRoleLevel() {
      if (this.$store.state.user.roleLevel === "admin") {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" >
#CZDAEDIT {
  input:disabled,
  textarea:disabled {
    opacity: 1;
    -webkit-text-fill-color: #000;
  }
}
</style>

