<template>
  <div id="TaskDetailConfig" class="app-container calendar-list-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>检查类型</span>
          </div>
          <div>
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card>
          <!-- <div slot="header" class="clearfix">
            <span>检查明细</span>
            <el-button type="primary" style="float:right;" size="small" @click="handleCreate">新增</el-button>
          </div> -->
          <div>
            <el-button type="primary" style="float:right;margin-bottom:20px;" size="small" @click="handleCreate" icon="el-icon-circle-plus">新增</el-button>
            <el-table
              :data="list"
              size="mini"
              :header-cell-class-name="tableRowClassName"
              element-loading-text="给我一点时间"
              border
              fit
              highlight-current-row
              style="width: 100%"
              row-key="ID"
            >
              <el-table-column label="编码" prop="Code"></el-table-column>
              <el-table-column label="名称" prop="Name"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="handelUpdate(scope.row)">修改</el-button>
                  <el-button type="danger" size="small" @click="handelDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="editVisible"
      class="selecttrees"
      :title="textMap[dialogStatus]"
      width="1000px"
      :close-on-click-modal="false"
    >
      <el-form ref="dataForm" :model="temp" :rules="rules" label-width="120px" style="width: 80%;">
        <el-form-item label="父级">
          <el-select v-model="temp.ParentID" size="small" style="width:100%" clearable>
            <el-option v-for="(item,key) in data" :key="key" :label="item.Name" :value="item.ID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编码" prop="Code">
          <el-input v-model="temp.Code" size="small"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="Name">
          <el-input v-model="temp.Name" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="text-align:center">
            <el-button type="primary" @click="submit">保存</el-button>
            <el-button @click="editVisible=false">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
import {
  GetTaskDetailConfig,
  CreateTaskDetailConfig,
  UpdateTaskDetailConfig,
  DeleteTaskDetailConfig
} from "@/app_src/api/JCSZ/TaskDetailConfig";
export default {
  name: "TaskDetailConfig",
  data() {
    return {
      data: [],
      list: [],
      editVisible: false,
      defaultProps: {
        children: "children",
        label: "Name"
      },
      textMap: {
        update: "修改任务明细",
        create: "添加任务明细"
      },
      dialogStatus: "",
      temp: {
        ID: "",
        ParentID: "",
        Code: "",
        Name: ""
      },
      rules: {
        ParentID: [
          {
            required: true,
            message: "请输入计划年度",
            trigger: "change"
          }
        ],
        Code: [
          {
            required: true,
            message: "请输入计划年度",
            trigger: "change"
          }
        ],
        Name: [
          {
            required: true,
            message: "请输入计划年度",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    getList() {
      GetTaskDetailConfig().then(response => {
        if (response.data.code === 2000) {
          this.data = response.data.items;
        } else {
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
    handleNodeClick(data) {
      if (data.children.length > 0) {
        this.list = [];
        this.list = data.children;
      }
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.editVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
    },
    handelUpdate(row) {
      this.resetTemp();
      this.dialogStatus = "update";
      this.editVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
      this.temp = Object.assign({}, row);
    },
    handelDelete(row) {
      this.$confirm("确认删除本条数据吗!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let temp = {
            ID: row.ID
          };
          DeleteTaskDetailConfig(temp).then(res => {
            if (res.data.code === 2000) {
              this.$notify({
                position: "bottom-right",
                title: "成功",
                message: res.data.message,
                type: "success",
                duration: 2000
              });
              this.list=[];
              this.getList();
            } else {
              this.$notify({
                position: "bottom-right",
                title: "失败",
                message: res.data.message,
                type: "error",
                duration: 2000
              });
            }
          });
        })
        .catch(() => {});
    },
    submit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (this.dialogStatus === "create") {
            CreateTaskDetailConfig(this.temp).then(response => {
              if (response.data.code === 2000) {
                this.$notify({
                  position: "bottom-right",
                  title: "成功",
                  message: response.data.message,
                  type: "success",
                  duration: 3000
                });
                this.getList();
                this.list=[];
                this.editVisible = false;
              } else {
                this.$notify({
                  position: "bottom-right",
                  title: "失败",
                  message: response.data.message,
                  type: "error",
                  duration: 3000
                });
              }
            });
          } else {
            let tempData = Object.assign({}, this.temp);
            UpdateTaskDetailConfig(tempData).then(res => {
              if (res.data.code === 2000) {
                this.$notify({
                  position: "bottom-right",
                  title: "成功",
                  message: res.data.message,
                  type: "success",
                  duration: 3000
                });
                this.getList();
                this.list=[];
                this.editVisible = false;
              } else {
                this.$notify({
                  position: "bottom-right",
                  title: "失败",
                  message: res.data.message,
                  type: "error",
                  duration: 3000
                });
              }
            });
          }
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
    resetTemp() {
      this.tem = {
        ID: "",
        ParentID: "",
        Code: "",
        Name: ""
      };
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style>
</style>