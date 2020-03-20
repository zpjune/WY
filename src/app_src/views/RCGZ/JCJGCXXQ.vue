
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
        <span>任务信息</span>
      </div>
      <div>
        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="任务名称">
              <el-input size="small" v-model="temp.RWMC"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="检查区域">
              <el-select style="width:100%" size="small" v-model="temp.JCQY">
                <el-option value="0" label="A区"></el-option>
                <el-option value="1" label="B区"></el-option>
                <el-option value="2" label="C区"></el-option>
                <el-option value="3" label="D区"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="检查类型">
              <el-select style="width:100%" size="small" v-model="temp.JCLX">
                <el-option value="0" label="消防"></el-option>
                <el-option value="1" label="安全"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="检查内容">
              <el-input size="small" v-model="temp.JCNR"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card style="margin-top:20px;">
      <div slot="header">
        <span>检查信息</span>
      </div>

      <div>
        <el-tabs type="border-card">
          <el-tab-pane label="检查情况">
            <el-row>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item label="房屋编号">
                  <el-input size="small" v-model="temp.FWBH"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item label="业主名称">
                  <el-input size="small" v-model="temp.YZMC"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item label="联系电话">
                  <el-input size="small" v-model="temp.LXDH"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item label="检查结果">
                  <el-select style="width:100%" size="small" v-model="temp.JCJG">
                    <el-option value="0" label="合格"></el-option>
                    <el-option value="1" label="不合格"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item label="检查人">
                  <el-input size="small" v-model="temp.JCR"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item label="检查时间">
                  <el-date-picker
                    style="width:100%"
                    format="yyyy-MM-dd"
                    size="small"
                    v-model="temp.JCSJ"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="检查情况">
                  <el-input size="small" v-model="temp.JCNR"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="检查图片" prop="PMT">
                  <el-upload action="#" list-type="picture-card" :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="复查情况">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
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
                  <el-table-column width="150px" align="center" label="复查结果">
                    <template slot-scope="scope">
                      <span>{{scope.row.FCJG}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" width="120px" label="复查人">
                    <template slot-scope="scope">
                      <span>{{scope.row.FCR}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column width="150px" align="center" label="复查时间">
                    <template slot-scope="scope">
                      <span>{{scope.row.FCSJ}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" width="120px" label="复查内容">
                    <template slot-scope="scope">
                      <span>{{scope.row.FCNR}}</span>
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
              </el-col>
            </el-row>

            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="复查 图片" prop="PMT">
                  <el-upload action="#" list-type="picture-card" :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>

        <el-row></el-row>
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
      list: [
        {
          FCJG: "不合格",
          FCR: "张三",
          FCSJ: "2019-06-25",
          FCNR: "消防通道堵塞"
        },
        {
          FCJG: "合格",
          FCR: "张三",
          FCSJ: "2019-07-05",
          FCNR: "消防通道堵塞"
        }
      ],
      list2: [
        {
          FWBH: "A-101",
          FWMC: "房屋1",
          JZMJ: "100㎡",
          LSFGS: "社区信息化部",
          ZLWZ: "港西新城",
          JGLX: "钢结构",
          ZCYZ: 10000,
          FWSX: "空闲",
          SSQY: "A区",
          flagValue: 0
        },
        {
          FWBH: "C-101",
          FWMC: "房屋2",
          JZMJ: "100㎡",
          LSFGS: "分公司1",
          ZLWZ: "港西新城",
          JGLX: "钢结构",
          ZCYZ: 18000,
          FWSX: "空闲",
          SSQY: "C区",
          flagValue: 0
        },
        {
          FWBH: "A-309",
          FWMC: "房屋3",
          JZMJ: "87㎡",
          LSFGS: "管控中心",
          ZLWZ: "港西新城",
          JGLX: "钢结构",
          ZCYZ: 17000,
          FWSX: "空闲",
          SSQY: "A区",
          flagValue: 0
        },
        {
          FWBH: "B-509",
          FWMC: "房屋4",
          JZMJ: "187㎡",
          LSFGS: "云计算技术部",
          ZLWZ: "港西新城",
          JGLX: "钢结构",
          ZCYZ: 19000,
          FWSX: "空闲",
          SSQY: "B区",
          flagValue: 0
        },
        {
          FWBH: "D-211",
          FWMC: "房屋5",
          JZMJ: "127㎡",
          LSFGS: "云计算技术部",
          ZLWZ: "港西新城",
          JGLX: "钢结构",
          ZCYZ: 24000,
          FWSX: "空闲",
          SSQY: "D区",
          flagValue: 0
        },
        {
          FWBH: "C-310",
          FWMC: "房屋6",
          JZMJ: "127㎡",
          LSFGS: "网络技术部",
          ZLWZ: "港西新城",
          JGLX: "钢结构",
          ZCYZ: 7000,
          FWSX: "空闲",
          SSQY: "C区",
          flagValue: 0
        },
        {
          FWBH: "B-223",
          FWMC: "房屋7",
          JZMJ: "97㎡",
          LSFGS: "网络技术部",
          ZLWZ: "港西新城",
          JGLX: "钢结构",
          ZCYZ: 12000,
          FWSX: "空闲",
          SSQY: "B区",
          flagValue: 0
        }
      ],

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
        FWBH: "D-211",
        FWMC: "房屋5",
        LSFGS: "普丰公司",
        JZMJ: "127㎡",
        ZLWZ: "",
        JZR: "五金日用品",
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
      },
      textMap: {
        update: "修改房屋信息",
        create: "添加房屋信息"
      },
      editVisible: false,
      dialogStatus: ""
    };
  },
  methods: {
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
    if (param != null) {
      console.log(param.YZXM);
    } else {
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
  input:disabled,
  textarea:disabled {
    opacity: 1;
    -webkit-text-fill-color: #000;
  }
}
</style>

