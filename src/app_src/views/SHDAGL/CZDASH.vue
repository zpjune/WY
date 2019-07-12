
<template>
  <div id="CZSHDA" class="app-container calendar-list-container">
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
          <!-- <el-button
            size="mini"
            class="filter-item"
            style="margin-left: 10px;"
            @click="handleCreate"
            type="primary"
            icon="el-icon-edit"
          >新增</el-button> -->
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
            <el-table-column align="right" prop="FWMC" label="房屋名称" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.FWMC}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="LSFGS" label="隶属分公司" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.row.LSFGS}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" width="150" prop="YZXM" label="业主姓名">
              <template slot-scope="scope">
                <span>{{scope.row.YZXM}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" width="100" prop="YZLX" label="业主类型">
              <template slot-scope="scope">
                <span>{{scope.row.YZLX}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="YZSJ" label="业主手机">
              <template slot-scope="scope">
                <span>{{scope.row.YZSJ}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" width="100" prop="YZGH" label="业主固话">
              <template slot-scope="scope">
                <span>{{scope.row.YZGH}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" width="100" prop="SHZT" label="审核状态">
              <template slot-scope="scope">
                <span>{{scope.row.SHZT}}</span>
              </template>
            </el-table-column>
          
            <el-table-column align="center" width="300" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">查看详情</el-button>
                <el-button type="success" size="mini"  v-if="scope.row.SHZT=='待审核'"    @click="handleSuccess(scope.row)">审核通过</el-button>
                 <el-button type="warning"  v-if="scope.row.SHZT=='已审核'"   size="mini" @click="handleCancel(scope.row)">取消审核</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">终止租赁</el-button>
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
      :visible.sync="editVisible2"
      class="selecttrees"
      title="商户详情"
      width="1000px"
    >
      <el-card>
        <el-form
          ref="dataForm"
          :model="temp"
          :rules="rules"
          label-width="120px"
          style="width: 99%;"
        >
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
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="商户名称">
                  <el-input size="small" v-model="temp.SHMC" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业费标准">
                  <el-input size="small" v-model="temp.jiaonajine" disabled>
                    <template slot="append">元/月</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业缴纳方式">
                  <el-select style="width:100%" size="small" v-model="temp.JNFS" disabled>
                    <el-option :value="0" label="半年"></el-option>
                    <el-option :value="1" label="一年"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="经营内容" prop="JYNR">
                  <el-input v-model="temp.JYNR" type="textarea" :rows="3" disabled></el-input>
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
                  <el-input size="small" v-model="temp.YZXM" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业主类型">
                  <el-select style="width:100%" size="small" v-model="temp.YZLX" disabled>
                    <el-option :value="0" label="个人"></el-option>
                    <el-option :value="1" label="公司"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业主性别">
                  <el-input size="small" disabled v-model="temp.XB"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号">
                  <el-input size="small" v-model="temp.YZSFZH" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码">
                  <el-input size="small" v-model="temp.yezhutel" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="固定电话">
                  <el-input size="small" v-model="temp.YZGDDH" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="电子邮箱">
                  <el-input size="small" v-model="temp.YZDZYX" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用类型">
                  <el-select style="width:100%" size="small" v-model="temp.SYLEX" disabled>
                    <el-option :value="0" label="自用"></el-option>
                    <el-option :value="1" label="出租"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card style="margin-top:20px;" >
          <div slot="header">
            <span>租户信息</span>
          </div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="租户姓名">
                  <el-input size="small" v-model="temp.ZHXM" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="租户类型">
                  <el-select style="width:100%" size="small" v-model="temp.ZHLX" disabled>
                    <el-option :value="0" label="个人"></el-option>
                    <el-option :value="1" label="公司"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="租户性别">
                  <el-input size="small" v-model="temp.ZHXM" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号">
                  <el-input size="small" v-model="temp.ZHSFZH" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码">
                  <el-input size="small" v-model="temp.ZHSJHM" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="固定电话">
                  <el-input size="small" v-model="temp.ZHGDHM" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="电子邮箱">
                  <el-input size="small" v-model="temp.ZHDZYX" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        </el-form>
        <div style="text-align:center;margin-top:10px;">
          <el-button @click="editVisible2 = false">取消</el-button>

        </div>
      </el-card>
    </el-dialog>
      <el-dialog :visible.sync="editVisible" class="selecttrees" title="商户详情" width="70%">
      <el-form ref="dataForm" :model="temp" label-width="120px" style="width: 99%;">
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
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="商户名称">
                  <el-input size="small" v-model="temp.SHMC" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业费标准">
                  <el-input size="small" v-model="temp.jiaonajine" disabled>
                    <template slot="append">元/月</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物业缴纳方式">
                  <el-select style="width:100%" size="small" v-model="temp.JNFS" disabled>
                    <el-option :value="0" label="半年"></el-option>
                    <el-option :value="1" label="一年"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="经营内容" prop="JYNR">
                  <el-input v-model="temp.JYNR" type="textarea" :rows="3" disabled></el-input>
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
                  <el-input size="small" v-model="temp.YZXM" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业主类型">
                  <el-select style="width:100%" size="small" v-model="temp.YZLX" disabled>
                    <el-option :value="0" label="个人"></el-option>
                    <el-option :value="1" label="公司"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业主性别">
                  <el-input size="small" disabled v-model="temp.XB"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号">
                  <el-input size="small" v-model="temp.YZSFZH" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码">
                  <el-input size="small" v-model="temp.yezhutel" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="固定电话">
                  <el-input size="small" v-model="temp.YZGDDH" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="电子邮箱">
                  <el-input size="small" v-model="temp.YZDZYX" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用类型">
                  <el-select style="width:100%" size="small" v-model="temp.SYLEX" disabled>
                    <el-option :value="0" label="自用"></el-option>
                    <el-option :value="1" label="出租"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card style="margin-top:20px;" >
          <div slot="header">
            <span>租户信息</span>
          </div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="租户姓名">
                  <el-input size="small" v-model="temp.ZHXM" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="租户类型">
                  <el-select style="width:100%" size="small" v-model="temp.ZHLX" disabled>
                    <el-option :value="0" label="个人"></el-option>
                    <el-option :value="1" label="公司"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="租户性别">
                  <el-input size="small" v-model="temp.ZHXM" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号">
                  <el-input size="small" v-model="temp.ZHSFZH" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码">
                  <el-input size="small" v-model="temp.ZHSJHM" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="固定电话">
                  <el-input size="small" v-model="temp.ZHGDHM" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="电子邮箱">
                  <el-input size="small" v-model="temp.ZHDZYX" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-form>
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="editVisible = false">取消</el-button>
         <el-button type="success" @click="pass">审核通过</el-button>
      </div>
    </el-dialog>
  </div>
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
      editVisible2:false,
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
 temp: {
   id:1,

        FWMC: "房屋5",
        JZMJ: "127㎡",
        LSFGS: "云计算技术部",
        ZLWZ: "D区",
        FZFJE: 25000,
        WYFJE: 1350,
        FWSX: "出售",
        fanghao: "A-101",
        name: "五金百货",
        LSFGS: "分公司1",

        ZLWZ: "大港",
        jfrq: "2019-01-21",
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
        LSFGS: "普丰物业",
        LXGH: "26756553",
        YZXM:"张三",
YZLX:"个人",
XB:"男",
SFZH:"1290981877663212121",
LXDH:"121443323",
EMAIL:"123@qq.com",
HTJE:120000,
WYFJE:2300,
FWBH:"A-101"
      },
      
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
          id:1,
         FWBH:"A-101",
FWMC:"五金店",
LSFGS:"丰收道130号",
YZXM:"张三",
YZLX:"个人",
YZSJ:"23123445676",
YZGH:"23431111",
SHZT:"待审核"
        },
        {
                    id:2,
           FWBH:"A-102",
FWMC:"五金店",
LSFGS:"丰收道130号",
YZXM:"张三",
YZLX:"个人",
YZSJ:"23123445676",
YZGH:"23431111",
SHZT:"已审核"
        },
        {
                    id:3,
           FWBH:"A-103",
         FWMC:"五金店",
LSFGS:"丰收道130号",
YZXM:"张三",
YZLX:"个人",
YZSJ:"23123445676",
YZGH:"23431111",
SHZT:"已审核"
        },
        {
                    id:4,
           FWBH:"A-104",
       FWMC:"五金店",
LSFGS:"丰收道130号",
YZXM:"张三",
YZLX:"个人",
YZSJ:"23123445676",
YZGH:"23431111",
SHZT:"待审核"
        },
        {
                    id:5,
           FWBH:"A-105",
        FWMC:"五金店",
LSFGS:"丰收道130号",
YZXM:"张三",
YZLX:"个人",
YZSJ:"23123445676",
YZGH:"23431111",
SHZT:"已审核"
        },
        {
          id:6,
           FWBH:"A-106",
         FWMC:"五金店",
LSFGS:"丰收道130号",
YZXM:"张三",
YZLX:"个人",
YZSJ:"23123445676",
YZGH:"23431111",
SHZT:"待审核"
        },
        {
                    id:7,
           FWBH:"A-107",
        FWMC:"五金店",
LSFGS:"丰收道130号",
YZXM:"张三",
YZLX:"个人",
YZSJ:"23123445676",
YZGH:"23431111",
SHZT:"已审核"
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
     
      textMap: {
        update: "修改房屋信息",
        create: "添加房屋信息"
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
        JZMJ: "",
        LSFGS: "",
        ZLWZ: "",
        FZFJE: "",
        WYFJE: "",
        FWSX: ""
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
      // this.editVisible = true;
      // this.dialogStatus = "create";
      // if (this.$refs["dataForm"] !== undefined) {
      //   this.$refs["dataForm"].resetFields();
      // }
      this.$router.push({ path: "/SHDAGL/CZDAEDIT" });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.editVisible2 = true;
      this.dialogStatus = "update";
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
      // this.$router.push({ path: "/SHDAGL/CZDAEDIT" });
    },
     handleSuccess(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.editVisible = true;
      this.dialogStatus = "update";
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
      // this.$router.push({ path: "/SHDAGL/CZDAEDIT" });
    },
    handleDelete(row) {
      this.$confirm("确认终止租赁吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          row.SHZT="待审核"
          //   const query = { S_ID: row.S_Id };
          //   deleteTaxOrg(query).then(response => {
          //     this.message = response.data.message;
          //     this.title = "失败";
          //     this.type = "error";
          //     if (response.data.code === 2000) {
          //       // const index = this.list.indexOf(row)
          //       // this.list.splice(index, 1)
          //this.getList();
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
    handleCancel(row){this.$confirm("确认取消审核吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          row.SHZT="待审核"
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
        .catch(() => {});},
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
    pass(){
      var index=this.list.findIndex(t=>t.id==this.temp.id);
      this.list[index].SHZT="已审核";
      this.$notify({
          title: '成功！',
          message: '通过审核！',
          position:'bottom-right',
          type: 'success'
        });
        this.editVisible = false;
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
#CZSHDA {
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
</style>

