
<template>
  <div id="CZSHDA" class="app-container calendar-list-container">
    <div class="topSearh" id="topsearch">
      <el-row>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <el-input placeholder="租户姓名" style="width:95%;" size="mini" clearable></el-input>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
          <!-- <el-input placeholder="业主类型" style="width:95%;" size="mini" clearable></el-input> -->
          <el-select
            v-model="listQuery.SYLX"
            size="mini"
            style="width:95%;"
            placeholder="审核状态"
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

        <el-col :xs="14" :sm="14" :md="14" :lg="6" :xl="4">
          <el-button size="mini" class="filter-item" type="primary" v-waves icon="el-icon-search">搜索</el-button>
          <el-button
            size="mini"
            class="filter-item"
            style="margin-left: 10px;"
            @click="handleCreate"
            type="primary"
            icon="el-icon-edit"
          >新增</el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-download" size="mini">导出</el-button>
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
            <el-table-column align="right" width="150" prop="YZXM" label="租户姓名">
              <template slot-scope="scope">
                <span>{{scope.row.YZXM}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" width="100" prop="YZLX" label="租户类型">
              <template slot-scope="scope">
                <span>{{scope.row.YZLX}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="YZSJ" label="租户手机">
              <template slot-scope="scope">
                <span>{{scope.row.YZSJ}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" width="100" prop="YZGH" label="租户固话">
              <template slot-scope="scope">
                <span>{{scope.row.YZGH}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" width="100" prop="SHZT" label="审核状态">
              <template slot-scope="scope">
                <span>{{scope.row.SHZT}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="180" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  v-if="scope.row.SHZT=='待审核'"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
                <el-button
                  type="success"
                  size="mini"
                  v-if="scope.row.SHZT=='已审核'"
                  @click="handleXZ(scope.row)"
                >续租</el-button>
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
  </div>
</template>



<script>
import waves from "@/frame_src/directive/waves"; // 水波纹指令
import { getToken } from "@/frame_src/utils/auth";

export default {
  name: "CZSHDA",
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      
      usedOptions: [
        {
          value: "0",
          name: "待审核"
        },
        {
          value: "1",
          name: "已审核"
        }
      ],
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
          FWBH: "A-101",
          FWMC: "五金店",
          LSFGS: "丰收道130号",
          YZXM: "张三",
          YZLX: "个人",
          YZSJ: "23123445676",
          YZGH: "23431111",
          SHZT: "已审核"
        },
        {
          FWBH: "A-102",
          FWMC: "五金店",
          LSFGS: "丰收道130号",
          YZXM: "张三",
          YZLX: "个人",
          YZSJ: "23123445676",
          YZGH: "23431111",
          SHZT: "已审核"
        },
        {
          FWBH: "A-103",
          FWMC: "五金店",
          LSFGS: "丰收道130号",
          YZXM: "张三",
          YZLX: "个人",
          YZSJ: "23123445676",
          YZGH: "23431111",
          SHZT: "已审核"
        },
        {
          FWBH: "A-104",
          FWMC: "五金店",
          LSFGS: "丰收道130号",
          YZXM: "张三",
          YZLX: "个人",
          YZSJ: "23123445676",
          YZGH: "23431111",
          SHZT: "待审核"
        },
        {
          FWBH: "A-105",
          FWMC: "五金店",
          LSFGS: "丰收道130号",
          YZXM: "张三",
          YZLX: "个人",
          YZSJ: "23123445676",
          YZGH: "23431111",
          SHZT: "已审核"
        },
        {
          FWBH: "A-106",
          FWMC: "五金店",
          LSFGS: "丰收道130号",
          YZXM: "张三",
          YZLX: "个人",
          YZSJ: "23123445676",
          YZGH: "23431111",
          SHZT: "待审核"
        },
        {
          FWBH: "A-107",
          FWMC: "五金店",
          LSFGS: "丰收道130号",
          YZXM: "张三",
          YZLX: "个人",
          YZSJ: "23123445676",
          YZGH: "23431111",
          SHZT: "已审核"
        }
      ],
      total:0,
      listLoading: false,
      listQuery: {
        limit: 10,
        page: 1,
        SYLX: ""
      }
    };
  },
  methods: {
    
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
      this.$router.push({ path: "/SHDAGL/CZDAEDIT" });
    },
    handleUpdate(row) {
      // this.temp = Object.assign({}, row); // copy obj
      // this.editVisible = true;
      // this.dialogStatus = "update";
      // this.$nextTick(() => {
      //   this.$refs["dataForm"].clearValidate();
      // });
      this.$router.push({ path: "/SHDAGL/CZDAEDIT", query: { param: row } });
    },
    handleXZ(row) {
      this.$router.push({ path: "/SHDAGL/CZDAXZ", query: { param: row } });
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
}
</style>

