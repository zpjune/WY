<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select v-model="listQuery.SSQY" placeholder="请选择区域" size="mini" class="filter-item" clearable> 
        <el-option
          v-for="(item,key) in areaOptions"
          :key="key"
          :label="item.Name"
          :value="item.Code"
        ></el-option>
      </el-select>

      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        class="filter-item"
        placeholder="请输入负责人名称"
        v-model="listQuery.FZR"
        size="mini"
      ></el-input>

      <el-button
        class="filter-item"
        type="primary"
        v-waves
        icon="el-icon-search"
        size="mini"
        @click="getList()"
      >查询</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        @click="handleCreate"
        type="primary"
        icon="el-icon-edit"
        size="mini"
      >添加</el-button>
      
      <!-- <el-button
        class="filter-item"
        type="primary"
        :loading="downloadLoading"
        v-waves
        icon="el-icon-download"
        @click="handleDownload"
        size="mini"
      >导出</el-button> -->
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
      style="width: 100%"
      size="mini"
      id="table"
    >
      <el-table-column width="200px" align="center" label="区域名称">
        <template slot-scope="scope">
          <span>{{scope.row.Name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="负责人">
        <template slot-scope="scope">
          <span>{{scope.row.FZR}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话">
        <template slot-scope="scope">
          <span>{{scope.row.MOBILE}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150px" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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
      :total="total"
    ></el-pagination>
    <el-dialog
      :visible.sync="editVisible"
      class="selecttrees"
      :title="textMap[dialogStatus]"
      width="500px"
    >
      <el-card>
        <el-form
          ref="dataForm"
          :model="temp"
          :rules="rules"
          label-width="120px"
          style="width: 99%;"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="区域：" prop="Name">
                <el-select
                  v-model="temp.SSQY"
                  placeholder="请选择区域"
                  size="mini"
                  class="filter-item"
                >
                  <el-option
                    v-for="(item,key) in areaOptions"
                    :key="key"
                    :label="item.Name"
                    :value="item.Code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="负责人：" prop="FZR">
                <el-input v-model="temp.FZR"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="电话" prop="MOBILE">
                <el-input v-model="temp.MOBILE"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-else type="primary" @click="updateData">保存</el-button>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>
            
<script>
import {
  GetRegionDirector,
  DeleteRegionDirector,
  CreateRegionDirector,
  UpdateRegionDirector
} from "@/app_src/api/JCSZ/QYFZR";
import { GetOptions } from "@/app_src/api/commonApi";
import waves from "@/frame_src/directive/waves";
export default {
  name: "qyfzr",
  directives: {
    waves
  },
  data() {
    return {
      listLoading: false,
      listQuery: {
        SSQY: "",
        FZR: "",
        page: 1,
        limit: 10
      },
      areaOptions: [],
      rules: {},
      value: "",
      list: [],
      textMap: {
        update: "修改区域负责人",
        create: "添加区域负责人"
      },
      editVisible: false,
      dialogStatus: "",
      downloadLoading: false,
      tableKey: 0,
      temp: {
        SSQY: "",
        FZR: "",
        MOBILE: "",
        userId: this.$store.state.user.userId,
      },
      total: 0
    };
  },
  methods: {
    getList() {
      this.listLoading = true;
      GetRegionDirector(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items;
          this.total = response.data.total;
          this.listLoading = false;
        } else {
          this.listLoading = false;
          this.$notify({
            position: "bottom-right",
            title: "失败",
            message: response.data.message,
            type: "error",
            duration: 2000
          });
        }
      });
    },
    handleFilter() {},
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.editVisible = true;
      this.dialogStatus = "update";
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleCreate() {
      this.editVisible = true;
      this.dialogStatus = "create";
      this.resetTemp();
    },
    resetTemp() {
      this.temp = {
        SSQY: "",
        FZR: "",
        MOBILE: "",
        userId: this.$store.state.user.userId
      };
    },
    handleDelete(row) {
      this.$confirm("确定要删除此负责人信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let temp = {
            RD_ID: row.RD_ID
          };
          DeleteRegionDirector(temp).then(response => {
            this.message = response.data.message;
            this.title = "失败";
            this.type = "error";
            if (response.data.code === 2000) {
              // const index = this.list.indexOf(row)
              // this.list.splice(index, 1)
              this.getList();
              this.title = "成功";
              this.type = "success";
            }
            this.$notify({
              position: "bottom-right",
              title: this.title,
              message: this.message,
              type: this.type,
              duration: 2000
            });
          });
        })
        .catch(() => {});
    },
    updateData(row) {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.userId=this.$store.state.user.userId;
          UpdateRegionDirector(tempData).then(response => {
            var message = response.data.message;
            var title = "失败";
            var type = "error";
            if (response.data.code === 2000) {
              this.getList();
              title = "成功";
              type = "success";
            }
            this.editVisible = false;
            this.$notify({
              position: "bottom-right",
              title: title,
              message: message,
              type: type,
              duration: 3000
            });
          });
        }
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          CreateRegionDirector(this.temp).then(response => {
            var message = response.data.message;
            if (response.data.code === 2000) {
              this.editVisible = false;
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: response.data.message,
                type: "success",
                duration: 3000
              });
              this.getList();
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
    handleDownload() {},
    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    GetOptions() {
      let temp2 = {
        ParentCode: "SSQY"
      };
      GetOptions(temp2).then(res => {
        if (res.data.code === 2000) {
          this.areaOptions = res.data.items;
        }
      });
    }
  },
  mounted() {
    this.GetOptions();
    this.getList();
  }
};
</script>
            
<style>
</style>
            