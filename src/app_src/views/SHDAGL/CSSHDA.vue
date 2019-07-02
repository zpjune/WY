
<template>
  <div id="CSSHDA" class="app-container calendar-list-container">
    <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-input placeholder="业主姓名" style="width:95%;" size="mini" clearable></el-input>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <!-- <el-input placeholder="业主类型" style="width:95%;" size="mini" clearable></el-input> -->
          <el-select
            v-model="listQuery.SYLX"
            size="mini"
            style="width:95%;"
            placeholder="房屋使用类型"
            clearable
            filterable
          >
            <el-option
              v-for="(item,key) in usedOptions"
              :key="key"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="5">
          <el-button size="mini" class="filter-item" type="primary" v-waves icon="el-icon-search">搜索</el-button>
          <el-button
            size="mini"
            class="filter-item"
            style="margin-left: 10px;"
            @click="handleCreate"
            type="primary"
            icon="el-icon-edit"
          >新增</el-button>
        </el-col>
      </el-row>
    </div>
    <el-card>
      <el-row>
        <el-col :span="24">
          <el-table
            :key="tableKey"
            :data="list"
            size="mini"
            :header-cell-class-name="tableRowClassName"
            v-loading="listLoading"
            element-loading-text="给我一点时间"
            border
            fit
            highlight-current-row
            style="width: 100%;text-align:left;"
          >
            <el-table-column align="center" prop="FWBH" label="房屋编号" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.FWBH}}</span>
              </template>
            </el-table-column>
            <el-table-column label="商铺名称" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.SPMC}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="隶属分公司" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.LSFGS}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="业主姓名" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.YZXM}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="LXDH" label="联系电话">
              <template slot-scope="scope">
                <span>{{scope.row.LXDH}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="LXDH" label="联系固话">
              <template slot-scope="scope">
                <span>{{scope.row.LXGH}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="230" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="listQuery.page"
              :page-sizes="[10,20,30, 50]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      :visible.sync="editVisible"
      class="selecttrees"
      :title="textMap[dialogStatus]"
      width="70%"
    >
      <el-form ref="dataForm" :model="temp" :rules="rules" label-width="120px" style="width: 99%;">
        <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="业主姓名" prop="YZXM">
                <el-input v-model="temp.YZXM"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="业主类型" prop="YZLX">
                <el-input v-model="temp.YZLX"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="性别" prop="XB">
                <el-input v-model="temp.XB"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号" prop="SFZH">
                <el-input v-model="temp.SFZH"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="LXDH">
                <el-input v-model="temp.LXDH"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="EMAIL">
                <el-input v-model="temp.EMAIL"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同金额" prop="HTJE">
                <el-input v-model="temp.HTJE"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物业费金额" prop="WYFJE">
                <el-input v-model="temp.WYFJE"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="房号" prop="FWSX">
                <el-cascader
                  style="width:100%;"
                  placeholder="搜索房号"
                  :options="options"
                  :props="{ multiple: true, checkStrictly: true  }"
                  filterable
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋使用类型" prop="SYLX">
                <el-select size="mini" style="width:100%;" v-model="temp.SYLX">
                  <el-option
                    v-for="(item,key) in selectOptions"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同签订时间" prop="HTQDSJ">
                <el-input v-model="temp.HTQDSJ"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效期" prop="YXQ">
                <el-input v-model="temp.YXQ"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="租户姓名" prop="ZHXM">
                <el-input v-model="temp.ZHXM"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租户身份证号" prop="ZHSFZ">
                <el-input v-model="temp.ZHSFZ"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="租户联系电话" prop="ZHDH">
                <el-input v-model="temp.ZHDH"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商铺名称" prop="SPMC">
                <el-input v-model="temp.SPMC"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="经营内容" prop="JYNR">
                <el-input v-model="temp.JYNR" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-col>
        </el-row>-->
        <el-card>
          <div slot="header">
            <span>商户信息</span>
          </div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="房屋编号">
                  <el-input v-model="temp.FWBH" disabled style="width:70%;"></el-input>
                  <el-button size="small" type="primary" @click="innerVisible=true">选择房屋</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房屋名称">
                  <el-input size="small" v-model="temp.FWMC" disabled></el-input>
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
                    v-model="temp.JZR"
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
                  <el-input size="small" v-model="temp.WYFBZ">
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
                  <el-input size="small" v-model="temp.YZXM"></el-input>
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
                  <el-input size="small" v-model="temp.YZSJHM"></el-input>
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
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
        <el-button v-else type="primary" @click="updateData">保存</el-button>
      </div>

      <el-dialog width="50%" title="房屋信息" :visible.sync="innerVisible" append-to-body>
        <el-table
            :key="tableKey"
            :data="list1"
            size="mini"
            :header-cell-class-name="tableRowClassName"
            v-loading="listLoading"
            element-loading-text="给我一点时间"
            border
            fit
            highlight-current-row
            style="width: 100%;text-align:left;"
          >
            <el-table-column align="center" prop="FWSX" label="房屋属性" width="80px">
              <template slot-scope="scope">
                <img src="@/app_src/img/free.png" alt class="tableicon" title="空闲" v-if="scope.row.FWSX=='空闲'">
                <img src="@/app_src/img/rent.png" alt class="tableicon" title="出租" v-else-if="scope.row.FWSX=='出租'">
                <img src="@/app_src/img/sale.png" alt class="tableicon" title="出售" v-else-if="scope.row.FWSX=='出售'">
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
            <el-table-column>
              <template slot-scope="scope">
                <el-button size="small" type="primary" @click="selectHouse(scope)">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-dialog>
    </el-dialog>
  </div>
</template>



<script>
// import { Treeselect, LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";
export default {
  name: "CSSHDA",
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
      list1: [
        {
          FWBH: "A-101",
          FWMC: "房屋1",
          JZMJ: "100㎡",
          LSFGS: "社区信息化部",
          ZLWZ: "港西新城",
          JGLX: "钢结构",
          ZCYZ: 10000,
          FWSX: "出售",
          SSQY: "A区"
        },
        {
          FWBH: "C-101",
          FWMC: "房屋2",
          JZMJ: "100㎡",
          LSFGS: "分公司1",
          ZLWZ: "港西新城",
          JGLX: "钢结构",
          ZCYZ: 18000,
          FWSX: "出售",
          SSQY: "C区"
        },
        {
          FWBH: "A-309",
          FWMC: "房屋3",
          JZMJ: "87㎡",
          LSFGS: "管控中心",
          ZLWZ: "港西新城",
          JGLX: "钢结构",
          ZCYZ: 17000,
          FWSX: "出售",
          SSQY: "A区"
        },
        {
          FWBH: "B-509",
          FWMC: "房屋4",
          JZMJ: "187㎡",
          LSFGS: "云计算技术部",
          ZLWZ: "港西新城",
          JGLX: "钢结构",
          ZCYZ: 19000,
          FWSX: "出售",
          SSQY: "B区"
        },
        {
          FWBH: "D-211",
          FWMC: "房屋5",
          JZMJ: "127㎡",
          LSFGS: "云计算技术部",
          ZLWZ: "港西新城",
          JGLX: "钢结构",
          ZCYZ: 24000,
          FWSX: "出售",
          SSQY: "D区"
        },
        {
          FWBH: "C-310",
          FWMC: "房屋6",
          JZMJ: "127㎡",
          LSFGS: "网络技术部",
          ZLWZ: "港西新城",
          JGLX: "钢结构",
          ZCYZ: 7000,
          FWSX: "出售",
          SSQY: "C区"
        },
        {
          FWBH: "B-223",
          FWMC: "房屋7",
          JZMJ: "97㎡",
          LSFGS: "网络技术部",
          ZLWZ: "港西新城",
          JGLX: "钢结构",
          ZCYZ: 12000,
          FWSX: "出售",
          SSQY: "B区"
        }
      ],
      options: [
        {
          value: "zhinan",
          label: "分公司1",
          children: [
            {
              value: "shejiyuanze",
              label: "A区域",
              children: [
                {
                  value: "yizhi",
                  label: "A-101"
                },
                {
                  value: "fankui",
                  label: "A-203"
                },
                {
                  value: "xiaolv",
                  label: "A-505"
                },
                {
                  value: "kekong",
                  label: "A-232"
                }
              ]
            },
            {
              value: "daohang",
              label: "B区域",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "B-508"
                },
                {
                  value: "dingbudaohang",
                  label: "B-105"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "分公司2",
          children: [
            {
              value: "basic",
              label: "C区域",
              children: [
                {
                  value: "layout",
                  label: "C-191"
                },
                {
                  value: "color",
                  label: "c-209"
                },
                {
                  value: "typography",
                  label: "c-502"
                },
                {
                  value: "icon",
                  label: "c-342"
                }
              ]
            },
            {
              value: "form",
              label: "D区域",
              children: [
                {
                  value: "radio",
                  label: "D-522"
                },
                {
                  value: "checkbox",
                  label: "D-244"
                },
                {
                  value: "input",
                  label: "D-707"
                }
              ]
            }
          ]
        }
      ],
      tableKey: 0,
      innerVisible: false,
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
          YZXM: "张三",
          XB: "男",
          YZLX: "个人",
          SFZH: "234567543433343434",
          LXDH: "127656534111",
          FWBH: "A-101",
          SYLX: "出租",
          SPMC: "五金日用百货",
          HTQDSJ: "2017-9-12",
          YXQ: "5",
          ZHXM: "唐三",
          ZHSFZ: "43441219889082212",
          ZHDH: "23454212222",
          JYNR: "五金日用品",
          LSFGS:"普丰物业",
          LXGH:"26756553"
        },
        {
          YZXM: "张三",
          XB: "男",
          YZLX: "个人",
          SFZH: "234567543433343434",
          LXDH: "127656534111",
          FWBH: "A-101",
          SYLX: "出租",
          SPMC: "五金日用百货",
          HTQDSJ: "2017-9-12",
          YXQ: "5",
          ZHXM: "唐三",
          ZHSFZ: "43441219889082212",
          ZHDH: "23454212222",
          JYNR: "五金日用品", LSFGS:"普丰物业",
          LXGH:"26756553"
        },
        {
          YZXM: "张三",
          XB: "男",
          YZLX: "个人",
          SFZH: "234567543433343434",
          LXDH: "127656534111",
          FWBH: "A-101",
          SYLX: "出租",
          SPMC: "五金日用百货",
          HTQDSJ: "2017-9-12",
          YXQ: "5",
          ZHXM: "唐三",
          ZHSFZ: "43441219889082212",
          ZHDH: "23454212222",
          JYNR: "五金日用品",
          LSFGS:"普丰物业",
          LXGH:"26756553"
        },
        {
          YZXM: "张三",
          XB: "男",
          YZLX: "个人",
          SFZH: "234567543433343434",
          LXDH: "127656534111",
          FWBH: "A-101",
          SYLX: "出租",
          SPMC: "五金日用百货",
          HTQDSJ: "2017-9-12",
          YXQ: "5",
          ZHXM: "唐三",
          ZHSFZ: "43441219889082212",
          ZHDH: "23454212222",
          JYNR: "五金日用品",
          LSFGS:"普丰物业",
          LXGH:"26756553"
        },
        {
          YZXM: "张三",
          XB: "男",
          YZLX: "个人",
          SFZH: "234567543433343434",
          LXDH: "127656534111",
          FWBH: "A-101",
          SYLX: "出租",
          SPMC: "五金日用百货",
          HTQDSJ: "2017-9-12",
          YXQ: "5",
          ZHXM: "唐三",
          ZHSFZ: "43441219889082212",
          ZHDH: "23454212222",
          JYNR: "五金日用品",
          LSFGS:"普丰物业",
          LXGH:"26756553"
        },
        {
          YZXM: "张三",
          XB: "男",
          YZLX: "个人",
          SFZH: "234567543433343434",
          LXDH: "127656534111",
          FWBH: "A-101",
          SYLX: "出租",
          SPMC: "五金日用百货",
          HTQDSJ: "2017-9-12",
          YXQ: "5",
          ZHXM: "唐三",
          ZHSFZ: "43441219889082212",
          ZHDH: "23454212222",
          JYNR: "五金日用品",
          LSFGS:"普丰物业",
          LXGH:"26756553"
        },
        {
          YZXM: "张三",
          XB: "男",
          YZLX: "个人",
          SFZH: "234567543433343434",
          LXDH: "127656534111",
          FWBH: "A-101",
          SYLX: "出租",
          SPMC: "五金日用百货",
          HTQDSJ: "2017-9-12",
          YXQ: "5",
          ZHXM: "唐三",
          ZHSFZ: "43441219889082212",
          ZHDH: "23454212222",
          JYNR: "五金日用品",
          LSFGS:"普丰物业",
          LXGH:"26756553"
        }
      ],
      rules: {
        FWMC: [
          { required: true, message: "请输入房屋名称", trigger: "change" }
        ],
        LSFGS: [
          { required: true, message: "请输入所属分公司", trigger: "change" }
        ],
        FZFJE: [
          { required: true, message: "请输入房租金额", trigger: "change" }
        ],
        WYFJE: [
          { required: true, message: "请输入物业费金额", trigger: "change" }
        ]
      },
      total: 15,
      listLoading: false,
      importmodeloptions: [
        {
          value: "样表一",
          label: "样表一"
        },
        {
          value: "样表二",
          label: "样表二"
        }
      ],
      taxofficeoptions: [], //税务机关
      orgregionoptions: [], //机关所在地
      taxcodeoptions: [], //税号
      responsibilityoptions: [], //责任中心
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
        JZMZ: "",
        ZLWZ: "",
        JZR: "",
        SHMC: "",
        WYFBZ: "",
        JNFS: "",
        JYNR: "",
        YZXM: "",
        YZLX: "",
        YZXB: "",
        YZSFZH: "",
        YZSJH: "",
        YZGD: "",
        YZDZYX: "",
        SYLX: "",
        ZHXM: "",
        ZHLX: "",
        ZHXB: "",
        ZHSFZH: "",
        ZHSJHM: "",
        ZHGD: "",
        ZHDZYX: ""
      },
      textMap: {
        update: "修改出售房屋信息",
        create: "添加出售房屋信息"
      },
      editVisible: false,
      dialogStatus: "",

      treeData: []
    };
  },
  methods: {
    deleteRow(index, rows) {
      //删除改行
      rows.splice(index, 1);
    },
    addRow(tableData, event) {
      tableData.push({ fildna: "", fildtp: "", remark: "" });
    },

    resetTemp() {
      this.temp = {
        FWBH: "",
        FWMC: "",
        LSFGS: "",
        JZMZ: "",
        ZLWZ: "",
        JZR: "",
        SHMC: "",
        WYFBZ: "",
        JNFS: "",
        JYNR: "",
        YZXM: "",
        YZLX: "",
        YZXB: "",
        YZSFZH: "",
        YZSJH: "",
        YZGD: "",
        YZDZYX: "",
        SYLX: "",
        ZHXM: "",
        ZHLX: "",
        ZHXB: "",
        ZHSFZH: "",
        ZHSJHM: "",
        ZHGD: "",
        ZHDZYX: ""
      };
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
      });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    selectHouse(data){
      this.temp=data.row;
      this.innerVisible=false;
    }
  },
  created() {
    this.listLoading = false;

    this.getList();
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
#CSSHDA {
  .topSearh {
    margin-bottom: 15px;
  }
  .page {
    text-align: center;
  }
  .buttom {
    float: right;
  }
  .vue-treeselect__control {
    height: 28px !important;
    width: 100%;
  }
  .vue-treeselect__placeholder,
  .vue-treeselect__single-value {
    line-height: 28px;
  }
}
.selecttrees {
  .vue-treeselect--searchable .vue-treeselect__input-container {
    height: 28px !important;
    width: 100%;
  }
  .el-dialog__body {
    padding: 0px 10px 10px !important;
  }
}
.tableicon {
  width: 25px;
  height: 25px;
}
</style>

